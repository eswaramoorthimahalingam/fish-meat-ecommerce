'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'கடை', href: '/products' },
  { name: 'மாட்டிறைச்சி', href: '/products?category=beef' },
  { name: 'கடல் உணவு', href: '/products?category=fish' },
  { name: 'கோழி இறைச்சி', href: '/products?category=poultry' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-lg font-bold">பி</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold text-foreground">பிரைம் கட்ஸ்</span>
              <span className="block text-xs text-muted-foreground tracking-widest uppercase">தரமான இறைச்சி & கடல் உணவு</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">பிரதான மெனுவை திற</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          {/* Search */}
          <div className={cn(
            "relative transition-all duration-300",
            searchOpen ? "w-48 sm:w-64" : "w-10"
          )}>
            {searchOpen ? (
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="பொருட்களை தேடுங்கள்..."
                  className="pr-10"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-10 w-10"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">தேடு</span>
              </Button>
            )}
          </div>

          {/* Account */}
          <Link href="/account">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <User className="h-5 w-5" />
              <span className="sr-only">கணக்கு</span>
            </Button>
          </Link>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems}
              </span>
            )}
            <span className="sr-only">கார்ட்</span>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-foreground/20" onClick={() => setMobileMenuOpen(false)} />
        <div className={cn(
          "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-xl font-bold">பிரைம் கட்ஸ்</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">மெனுவை மூடு</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/account"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  என் கணக்கு
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
