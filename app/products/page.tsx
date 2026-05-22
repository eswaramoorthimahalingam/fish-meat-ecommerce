'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { products, categories } from '@/lib/products'
import { cn } from '@/lib/utils'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'சிறப்பானவை' },
  { value: 'price-asc', label: 'விலை: குறைவு முதல் அதிகம்' },
  { value: 'price-desc', label: 'விலை: அதிகம் முதல் குறைவு' },
  { value: 'rating', label: 'அதிக மதிப்பீடு' },
  { value: 'name', label: 'பெயர் அ-ஃ' },
]

const priceRanges = [
  { id: 'under-2000', label: '₹2,000 க்கு கீழ்', min: 0, max: 24 },
  { id: '2000-4000', label: '₹2,000 - ₹4,000', min: 24, max: 48 },
  { id: '4000-8000', label: '₹4,000 - ₹8,000', min: 48, max: 96 },
  { id: 'over-8000', label: '₹8,000 க்கு மேல்', min: 96, max: Infinity },
]

function ProductsPageInner() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Price filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          if (!range) return false
          return p.price >= range.min && p.price < range.max
        })
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        // Keep original order, but prioritize bestsellers/premium
        filtered.sort((a, b) => {
          const priority = { bestseller: 3, premium: 2, new: 1, sale: 1 }
          const aPriority = a.badge ? priority[a.badge] || 0 : 0
          const bPriority = b.badge ? priority[b.badge] || 0 : 0
          return bPriority - aPriority
        })
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedPriceRanges, sortBy])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((r) => r !== rangeId)
        : [...prev, rangeId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setSearchQuery('')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedPriceRanges.length > 0 || searchQuery

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("space-y-6", mobile && "pb-6")}>
      {/* Search */}
      <div>
        <label className="text-sm font-medium text-foreground">தேடு</label>
        <Input
          type="search"
          placeholder="பொருட்களை தேடுங்கள்..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-foreground">வகை</h3>
        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}${mobile ? '-mobile' : ''}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={`category-${category.id}${mobile ? '-mobile' : ''}`}
                className="ml-3 flex-1 cursor-pointer text-sm text-foreground"
              >
                {category.name}
              </label>
              <span className="text-xs text-muted-foreground">
                ({products.filter((p) => p.category === category.id).length})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-medium text-foreground">விலை</h3>
        <div className="mt-3 space-y-3">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <Checkbox
                id={`price-${range.id}${mobile ? '-mobile' : ''}`}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={() => togglePriceRange(range.id)}
              />
              <label
                htmlFor={`price-${range.id}${mobile ? '-mobile' : ''}`}
                className="ml-3 cursor-pointer text-sm text-foreground"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          அனைத்து வடிகட்டிகளையும் நீக்கு
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {categoryParam
                ? categories.find((c) => c.id === categoryParam)?.name || 'பொருட்கள்'
                : 'அனைத்து பொருட்கள்'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredProducts.length} பொருட்கள் கிடைக்கும்
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  வடிகட்டிகள்
                </h2>
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  வடிகட்டிகள்
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategories.length + selectedPriceRanges.length}
                    </Badge>
                  )}
                </Button>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="hidden lg:flex flex-wrap gap-2">
                    {selectedCategories.map((catId) => {
                      const cat = categories.find((c) => c.id === catId)
                      return cat ? (
                        <Badge
                          key={catId}
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => toggleCategory(catId)}
                        >
                          {cat.name}
                          <X className="h-3 w-3" />
                        </Badge>
                      ) : null
                    })}
                    {selectedPriceRanges.map((rangeId) => {
                      const range = priceRanges.find((r) => r.id === rangeId)
                      return range ? (
                        <Badge
                          key={rangeId}
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => togglePriceRange(rangeId)}
                        >
                          {range.label}
                          <X className="h-3 w-3" />
                        </Badge>
                      ) : null
                    })}
                  </div>
                )}

                {/* Sort */}
                <div className="relative ml-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-12 text-center">
                  <p className="text-lg font-medium text-foreground">பொருட்கள் இல்லை</p>
                  <p className="mt-2 text-muted-foreground">
                    உங்கள் வடிகட்டிகளை அல்லது தேடல் வினவலை சரிசெய்ய முயற்சிக்கவும்
                  </p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    வடிகட்டிகளை நீக்கு
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
          mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="fixed inset-0 bg-foreground/20"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-xl transition-transform duration-300',
            mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <h2 className="text-lg font-semibold">வடிகட்டிகள்</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">வடிகட்டிகளை மூடு</span>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar mobile />
            </div>
            <div className="border-t border-border p-4">
              <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                {filteredProducts.length} பொருட்களைக் காண்க
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsPageInner />
    </Suspense>
  )
}
