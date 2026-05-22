'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, X, Truck, Shield, CreditCard, Check, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { useCart } from '@/context/cart-context'

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<CheckoutStep>('cart')
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const shippingCost = totalPrice >= 100 ? 0 : shippingMethod === 'express' ? 19.99 : 12.99
  const discount = promoApplied ? totalPrice * 0.1 : 0
  const finalTotal = totalPrice + shippingCost - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
    }
  }

  const handlePlaceOrder = () => {
    setStep('confirmation')
    clearCart()
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />
        
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
              <Check className="h-10 w-10 text-accent" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
              ஆர்டர் உறுதிப்படுத்தப்பட்டது!
            </h1>
            <p className="mt-4 text-muted-foreground">
              உங்கள் ஆர்டருக்கு நன்றி. உங்கள் ஆர்டர் விவரங்களுடன் உறுதிப்படுத்தல் மின்னஞ்சல் அனுப்பியுள்ளோம்.
              உங்கள் தரமான பொருட்கள் 2-3 வேலை நாட்களில் வழங்கப்படும்.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              ஆர்டர் #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/products">ஷாப்பிங் தொடரவும்</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account/orders">ஆர்டர்களைக் காண்க</Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              {step === 'cart' && 'ஷாப்பிங் கார்ட்'}
              {step === 'shipping' && 'ஷிப்பிங் தகவல்'}
              {step === 'payment' && 'பணம் செலுத்துதல்'}
            </h1>
            
            {/* Progress Steps */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className={step === 'cart' ? 'font-medium text-primary' : 'text-muted-foreground'}>
                கார்ட்
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className={step === 'shipping' ? 'font-medium text-primary' : 'text-muted-foreground'}>
                ஷிப்பிங்
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className={step === 'payment' ? 'font-medium text-primary' : 'text-muted-foreground'}>
                பணம் செலுத்துதல்
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {items.length === 0 && step === 'cart' ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <h2 className="text-lg font-medium text-foreground">உங்கள் கார்ட் காலியாக உள்ளது</h2>
              <p className="mt-2 text-muted-foreground">
                தொடங்க சில தரமான துண்டுகளை சேர்க்கவும்
              </p>
              <Button className="mt-6" asChild>
                <Link href="/products">
                  பொருட்களை பார்க்கவும்
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 'cart' && (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 rounded-lg border border-border bg-card p-4"
                      >
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                href={`/products/${item.product.id}`}
                                className="font-medium text-foreground hover:text-primary transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.product.weight} &middot; {item.product.origin}
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
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">எண்ணிக்கை குறை</span>
                              </Button>
                              <span className="w-10 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">எண்ணிக்கை கூட்டு</span>
                              </Button>
                            </div>
                            <span className="font-semibold text-foreground">
                              ₹{(item.product.price * item.quantity * 83).toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      ஷாப்பிங் தொடரவும்
                    </Link>
                  </div>
                )}

                {step === 'shipping' && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-border bg-card p-6">
                      <h2 className="text-lg font-semibold text-foreground">டெலிவரி முகவரி</h2>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName">முதல் பெயர்</Label>
                          <Input id="firstName" className="mt-1" defaultValue="ராஜா" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">கடைசி பெயர்</Label>
                          <Input id="lastName" className="mt-1" defaultValue="குமார்" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address">தெரு முகவரி</Label>
                          <Input id="address" className="mt-1" defaultValue="123 முதல் தெரு" />
                        </div>
                        <div>
                          <Label htmlFor="city">நகரம்</Label>
                          <Input id="city" className="mt-1" defaultValue="சென்னை" />
                        </div>
                        <div>
                          <Label htmlFor="state">மாநிலம்</Label>
                          <Input id="state" className="mt-1" defaultValue="தமிழ்நாடு" />
                        </div>
                        <div>
                          <Label htmlFor="zip">பின் கோட்</Label>
                          <Input id="zip" className="mt-1" defaultValue="600001" />
                        </div>
                        <div>
                          <Label htmlFor="phone">தொலைபேசி</Label>
                          <Input id="phone" type="tel" className="mt-1" defaultValue="+91 98765 43210" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-6">
                      <h2 className="text-lg font-semibold text-foreground">ஷிப்பிங் முறை</h2>
                      <RadioGroup
                        value={shippingMethod}
                        onValueChange={setShippingMethod}
                        className="mt-4 space-y-3"
                      >
                        <label
                          htmlFor="standard"
                          className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <div>
                              <p className="font-medium text-foreground">நிலையான ஷிப்பிங்</p>
                              <p className="text-sm text-muted-foreground">2-4 வேலை நாட்கள்</p>
                            </div>
                          </div>
                          <span className="font-medium">
                            {totalPrice >= 100 ? 'இலவசம்' : '₹999'}
                          </span>
                        </label>
                        <label
                          htmlFor="express"
                          className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="express" id="express" />
                            <div>
                              <p className="font-medium text-foreground">எக்ஸ்பிரஸ் ஷிப்பிங்</p>
                              <p className="text-sm text-muted-foreground">அடுத்த வேலை நாள்</p>
                            </div>
                          </div>
                          <span className="font-medium">₹1,599</span>
                        </label>
                      </RadioGroup>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setStep('cart')}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      கார்ட்டுக்கு திரும்பு
                    </Button>
                  </div>
                )}

                {step === 'payment' && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-border bg-card p-6">
                      <h2 className="text-lg font-semibold text-foreground">பணம் செலுத்தும் முறை</h2>
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">கார்ட் எண்</Label>
                          <Input
                            id="cardNumber"
                            className="mt-1"
                            placeholder="1234 5678 9012 3456"
                            defaultValue="4242 4242 4242 4242"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="expiry">காலாவதி தேதி</Label>
                            <Input id="expiry" className="mt-1" placeholder="MM/YY" defaultValue="12/28" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" className="mt-1" placeholder="123" defaultValue="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">கார்டில் உள்ள பெயர்</Label>
                          <Input id="cardName" className="mt-1" defaultValue="ராஜா குமார்" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/50 p-4">
                      <Shield className="h-6 w-6 text-accent" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground">பாதுகாப்பான பணம் செலுத்துதல்</p>
                        <p className="text-muted-foreground">
                          உங்கள் பணம் செலுத்தும் தகவல் என்க்ரிப்ட் செய்யப்பட்டு பாதுகாப்பாக உள்ளது.
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setStep('shipping')}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      ஷிப்பிங்கிற்கு திரும்பு
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground">ஆர்டர் சுருக்கம்</h2>
                  
                  {step !== 'cart' && (
                    <div className="mt-4 max-h-48 space-y-2 overflow-y-auto border-b border-border pb-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-2 text-sm">
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-muted">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-foreground">{item.product.name}</p>
                            <p className="text-muted-foreground">எண்ணிக்கை: {item.quantity}</p>
                          </div>
                          <span className="font-medium">
                            ₹{(item.product.price * item.quantity * 83).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">உட்கூட்டு</span>
                      <span className="text-foreground">₹{(totalPrice * 83).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ஷிப்பிங்</span>
                      <span className={shippingCost === 0 ? 'text-accent' : 'text-foreground'}>
                        {shippingCost === 0 ? 'இலவசம்' : `₹${(shippingCost * 83).toFixed(0)}`}
                      </span>
                    </div>
                    {promoApplied && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">தள்ளுபடி (10%)</span>
                        <span className="text-accent">-₹{(discount * 83).toFixed(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">மொத்தம்</span>
                      <span className="text-xl font-bold text-foreground">
                        ₹{(finalTotal * 83).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {step === 'cart' && (
                    <>
                      <div className="mt-4">
                        <Label htmlFor="promo" className="sr-only">புரோமோ கோட்</Label>
                        <div className="flex gap-2">
                          <Input
                            id="promo"
                            placeholder="புரோமோ கோட்"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promoApplied}
                          />
                          <Button
                            variant="outline"
                            onClick={handleApplyPromo}
                            disabled={promoApplied || !promoCode}
                          >
                            பயன்படுத்து
                          </Button>
                        </div>
                        {promoApplied && (
                          <p className="mt-2 text-sm text-accent">புரோமோ கோட் பயன்படுத்தப்பட்டது!</p>
                        )}
                      </div>

                      <Button
                        className="mt-6 w-full"
                        size="lg"
                        onClick={() => setStep('shipping')}
                      >
                        செக்அவுட்டுக்கு தொடரவும்
                      </Button>
                    </>
                  )}

                  {step === 'shipping' && (
                    <Button
                      className="mt-6 w-full"
                      size="lg"
                      onClick={() => setStep('payment')}
                    >
                      பணம் செலுத்துதலுக்கு தொடரவும்
                    </Button>
                  )}

                  {step === 'payment' && (
                    <Button
                      className="mt-6 w-full"
                      size="lg"
                      onClick={handlePlaceOrder}
                    >
                      ஆர்டர் செய்
                    </Button>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span>இலவச ஷிப்பிங்</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span>பாதுகாப்பான</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
