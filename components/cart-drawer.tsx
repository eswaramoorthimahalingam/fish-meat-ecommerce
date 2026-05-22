'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-background shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-serif text-lg font-semibold">உங்கள் கார்ட்</h2>
              {totalItems > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">கார்ட் மூடு</span>
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 font-serif text-lg font-semibold">உங்கள் கார்ட் காலியாக உள்ளது</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  தொடங்க சில தரமான துண்டுகளை சேர்க்கவும்
                </p>
                <Button className="mt-6" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/products">
                    பொருட்களை பார்க்கவும்
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4 rounded-lg border border-border p-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {item.product.weight}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 -mr-2 -mt-1"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">நீக்கு</span>
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">எண்ணிக்கை குறை</span>
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">எண்ணிக்கை கூட்டு</span>
                          </Button>
                        </div>
                        <span className="font-semibold">
                          ₹{(item.product.price * item.quantity * 83).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">உட்கூட்டு</span>
                  <span>₹{(totalPrice * 83).toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ஷிப்பிங்</span>
                  <span className="text-accent">இலவசம்</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2 text-lg font-semibold">
                  <span>மொத்தம்</span>
                  <span>₹{(totalPrice * 83).toFixed(0)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  செக்அவுட்
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                ₹8,300 க்கு மேல் ஆர்டர்களுக்கு இலவச ஷிப்பிங்
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
