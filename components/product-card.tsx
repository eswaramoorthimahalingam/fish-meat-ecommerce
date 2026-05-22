'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

const badgeStyles = {
  bestseller: 'bg-accent text-accent-foreground',
  new: 'bg-blue-500 text-white',
  sale: 'bg-destructive text-destructive-foreground',
  premium: 'bg-amber-500 text-white',
}

const badgeLabels = {
  bestseller: 'அதிகம் விற்பனை',
  new: 'புதியது',
  sale: 'விற்பனை',
  premium: 'பிரீமியம்',
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 transition-all duration-300 hover:border-border hover:shadow-lg",
      featured && "md:col-span-2 md:row-span-2"
    )}>
      <Link href={`/products/${product.id}`} className="block">
        <div className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "aspect-square md:aspect-[4/3]" : "aspect-square"
        )}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          />
          {product.badge && (
            <Badge className={cn(
              "absolute left-3 top-3 font-medium",
              badgeStyles[product.badge]
            )}>
              {badgeLabels[product.badge]}
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="text-sm font-medium text-muted-foreground">கையிருப்பு இல்லை</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.category === 'beef' && 'மாட்டிறைச்சி'}
              {product.category === 'pork' && 'பன்றி இறைச்சி'}
              {product.category === 'poultry' && 'கோழி இறைச்சி'}
              {product.category === 'lamb' && 'ஆட்டிறைச்சி'}
              {product.category === 'fish' && 'மீன்'}
              {product.category === 'shellfish' && 'கடல் உணவு'}
              {' '}&middot; {product.origin}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className={cn(
                "mt-1 font-serif font-semibold text-foreground transition-colors hover:text-primary truncate",
                featured ? "text-xl" : "text-base"
              )}>
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{product.weight}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "font-semibold text-foreground",
              featured ? "text-xl" : "text-lg"
            )}>
              ₹{(product.price * 83).toFixed(0)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{(product.originalPrice * 83).toFixed(0)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              if (product.inStock) {
                addItem(product)
              }
            }}
            disabled={!product.inStock}
            className="h-9 gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">சேர்</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
