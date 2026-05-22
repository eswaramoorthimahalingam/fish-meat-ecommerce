'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/context/cart-context'
import { getProductById, getProductsByCategory, categories, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

const badgeStyles = {
  bestseller: 'bg-accent text-accent-foreground',
  new: 'bg-blue-500 text-white',
  sale: 'bg-destructive text-destructive-foreground',
  premium: 'bg-amber-500 text-white',
}

const badgeLabels = {
  bestseller: 'அதிகம் விற்பனை',
  new: 'புதிய வரவு',
  sale: 'விற்பனையில்',
  premium: 'பிரீமியம் தேர்வு',
}

const categoryLabels: Record<string, string> = {
  beef: 'மாட்டிறைச்சி',
  pork: 'பன்றி இறைச்சி',
  poultry: 'கோழி இறைச்சி',
  lamb: 'ஆட்டிறைச்சி',
  fish: 'மீன்',
  shellfish: 'கடல் உணவு',
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const categoryInfo = categories.find((c) => c.id === product.category)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  முகப்பு
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  பொருட்கள்
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {categoryInfo?.name}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li className="text-foreground font-medium truncate">{product.name}</li>
            </ol>
          </div>
        </nav>

        {/* Product Section */}
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.badge && (
                  <Badge className={cn(
                    "absolute left-4 top-4 text-sm",
                    badgeStyles[product.badge]
                  )}>
                    {badgeLabels[product.badge]}
                  </Badge>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {categoryLabels[product.category]} &middot; {product.origin}
                  </p>
                  <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} விமர்சனங்கள்)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-foreground">
                      ₹{(product.price * 83).toFixed(0)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{(product.originalPrice * 83).toFixed(0)}
                        </span>
                        <Badge variant="destructive">
                          ₹{((product.originalPrice - product.price) * 83).toFixed(0)} சேமிக்கவும்
                        </Badge>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">{product.weight}</p>

                  <p className="mt-6 text-foreground/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-md border border-input">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-r-none"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">எண்ணிக்கை குறை</span>
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-l-none"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">எண்ணிக்கை கூட்டு</span>
                      </Button>
                    </div>
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {product.inStock ? 'கார்ட்டில் சேர்' : 'கையிருப்பு இல்லை'}
                    </Button>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="mr-2 h-5 w-5" />
                      சேமி
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Share2 className="mr-2 h-5 w-5" />
                      பகிர்
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                  <div className="text-center">
                    <Truck className="mx-auto h-6 w-6 text-primary" />
                    <p className="mt-2 text-xs font-medium text-foreground">இலவச ஷிப்பிங்</p>
                    <p className="text-xs text-muted-foreground">₹8,300+ ஆர்டர்களுக்கு</p>
                  </div>
                  <div className="text-center">
                    <Shield className="mx-auto h-6 w-6 text-primary" />
                    <p className="mt-2 text-xs font-medium text-foreground">தரம் உத்தரவாதம்</p>
                    <p className="text-xs text-muted-foreground">100% திருப்தி</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="mx-auto h-6 w-6 text-primary" />
                    <p className="mt-2 text-xs font-medium text-foreground">எளிதான திரும்பல்</p>
                    <p className="text-xs text-muted-foreground">30 நாள் கொள்கை</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="border-t border-border bg-muted/30 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b border-border bg-transparent p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  பொருள் விவரங்கள்
                </TabsTrigger>
                <TabsTrigger
                  value="cooking"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  சமையல் குறிப்புகள்
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  ஷிப்பிங் தகவல்
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">விவரக்குறிப்புகள்</h3>
                    <dl className="space-y-2 text-sm">
                      {product.details.cut && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">வெட்டு</dt>
                          <dd className="font-medium text-foreground">{product.details.cut}</dd>
                        </div>
                      )}
                      {product.details.grade && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">தரம்</dt>
                          <dd className="font-medium text-foreground">{product.details.grade}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">எடை</dt>
                        <dd className="font-medium text-foreground">{product.weight}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">மூலம்</dt>
                        <dd className="font-medium text-foreground">{product.origin}</dd>
                      </div>
                      {product.details.freshness && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">புதுமை</dt>
                          <dd className="font-medium text-foreground">{product.details.freshness}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">தயாரிப்பு</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {product.details.preparation || 'சமைக்க தயார். சிறந்த முடிவுகளுக்கு, சமைப்பதற்கு 30 நிமிடங்களுக்கு முன்பு அறை வெப்பநிலைக்கு கொண்டு வாருங்கள்.'}
                    </p>
                    <h3 className="font-semibold text-foreground">சேமிப்பு</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      32-38°F (0-3°C) இல் குளிர்சாதனப்பெட்டியில் வைக்கவும். டெலிவரிக்கு 3-5 நாட்களுக்குள் பயன்படுத்தவும், அல்லது 6 மாதங்கள் வரை உறைய வைக்கவும்.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cooking" className="mt-6">
                <div className="prose prose-sm max-w-none text-foreground/80">
                  <h3 className="text-foreground">பரிந்துரைக்கப்பட்ட சமையல் முறைகள்</h3>
                  <ul>
                    <li><strong>கிரில்லிங்:</strong> உட்புறத்தை சாறாக வைத்திருக்கும் போது கருகிய வெளிப்புறத்தை அடைவதற்கு சரியானது.</li>
                    <li><strong>பான்-சியரிங்:</strong> சீரான, கேரமலைஸ் செய்யப்பட்ட மேலோட்டத்திற்கு காஸ்ட் அயர்ன் ஸ்கில்லெட் பயன்படுத்தவும்.</li>
                    <li><strong>சூஸ் வைட்:</strong> துல்லியமான வெப்பநிலை கட்டுப்பாடு மற்றும் சரியான வேகவைப்புக்கு.</li>
                    <li><strong>ரோஸ்டிங்:</strong> பெரிய துண்டுகளுக்கு ஏற்றது, மென்மையான, சுவையான முடிவுகளுக்கு மெதுவாக சுடவும்.</li>
                  </ul>
                  <h3 className="text-foreground">உள் வெப்பநிலை வழிகாட்டி</h3>
                  <ul>
                    <li>அரிதான: 125°F (52°C)</li>
                    <li>மீடியம்-அரிதான: 135°F (57°C)</li>
                    <li>மீடியம்: 145°F (63°C)</li>
                    <li>மீடியம்-நன்கு: 150°F (66°C)</li>
                    <li>நன்கு வெந்தது: 160°F+ (71°C+)</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4 text-sm text-foreground/80">
                  <div>
                    <h3 className="font-semibold text-foreground">வெப்பநிலை கட்டுப்படுத்தப்பட்ட ஷிப்பிங்</h3>
                    <p className="mt-2 leading-relaxed">
                      அனைத்து ஆர்டர்களும் போக்குவரத்தின் போது சரியான வெப்பநிலையை பராமரிக்க உலர் ஐஸ் அல்லது ஜெல் பேக்குகளுடன் இன்சுலேட்டட் பேக்கேஜிங்கில் அனுப்பப்படுகின்றன.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">டெலிவரி நேரங்கள்</h3>
                    <p className="mt-2 leading-relaxed">
                      திங்கள்-வியாழன் 12 PM IST க்கு முன் வைக்கப்படும் ஆர்டர்கள் அதே நாள் அனுப்பப்படும். நிலையான டெலிவரி 2-4 வேலை நாட்கள். எக்ஸ்பிரஸ் அடுத்த நாள் ஷிப்பிங் கிடைக்கும்.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">இலவச ஷிப்பிங்</h3>
                    <p className="mt-2 leading-relaxed">
                      ₹8,300 க்கு மேல் உள்ள அனைத்து ஆர்டர்களுக்கும் இலவச நிலையான ஷிப்பிங் அனுபவியுங்கள். ₹8,300 க்கு கீழ் உள்ள ஆர்டர்களுக்கு ₹999 சீரான கட்டணம்.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    உங்களுக்கு பிடிக்கலாம்
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    எங்கள் {categoryInfo?.name.toLowerCase()} தொகுப்பிலிருந்து மேலும்
                  </p>
                </div>
                <Link
                  href={`/products?category=${product.category}`}
                  className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
                >
                  அனைத்தையும் காண்க
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
