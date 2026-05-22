'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { cn } from '@/lib/utils'

// Mock user data
const mockUser = {
  name: 'ராஜா குமார்',
  email: 'raja.kumar@example.com',
  phone: '+91 98765 43210',
  memberSince: 'ஜனவரி 2024',
}

const mockOrders = [
  {
    id: 'PC-ABC123',
    date: 'மே 15, 2026',
    status: 'வழங்கப்பட்டது',
    total: 15768,
    items: 3,
  },
  {
    id: 'PC-DEF456',
    date: 'மே 8, 2026',
    status: 'வழங்கப்பட்டது',
    total: 10373,
    items: 2,
  },
  {
    id: 'PC-GHI789',
    date: 'ஏப்ரல் 28, 2026',
    status: 'வழங்கப்பட்டது',
    total: 24896,
    items: 4,
  },
]

const mockAddresses = [
  {
    id: '1',
    name: 'வீடு',
    address: '123 முதல் தெரு',
    city: 'சென்னை',
    state: 'தமிழ்நாடு',
    zip: '600001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'அலுவலகம்',
    address: '456 வணிக சாலை, தளம் 200',
    city: 'சென்னை',
    state: 'தமிழ்நாடு',
    zip: '600002',
    isDefault: false,
  },
]

const sidebarItems = [
  { id: 'profile', label: 'சுயவிவரம்', icon: User },
  { id: 'orders', label: 'ஆர்டர்கள்', icon: Package },
  { id: 'addresses', label: 'முகவரிகள்', icon: MapPin },
  { id: 'payment', label: 'பணம் செலுத்தும் முறைகள்', icon: CreditCard },
  { id: 'wishlist', label: 'விருப்பப்பட்டியல்', icon: Heart },
  { id: 'settings', label: 'அமைப்புகள்', icon: Settings },
]

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />

        <main className="flex-1 flex items-center justify-center py-12">
          <div className="mx-auto w-full max-w-md px-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <span className="font-serif text-2xl font-bold text-primary-foreground">பி</span>
              </div>
              <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
                {isSignUp ? 'கணக்கை உருவாக்கவும்' : 'வரவேற்கிறோம்'}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {isSignUp
                  ? 'பிரத்யேக சலுகைகளுக்கு பிரைம் கட்ஸில் சேரவும்'
                  : 'உங்கள் கணக்கை அணுக உள்நுழையவும்'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">முழு பெயர்</Label>
                  <Input id="name" type="text" className="mt-1" placeholder="ராஜா குமார்" />
                </div>
              )}
              <div>
                <Label htmlFor="email">மின்னஞ்சல்</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">கடவுச்சொல்</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="உங்கள் கடவுச்சொல்லை உள்ளிடவும்"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? 'மறை' : 'காட்டு'} கடவுச்சொல்</span>
                  </button>
                </div>
              </div>
              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword">கடவுச்சொல்லை உறுதிப்படுத்தவும்</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="mt-1"
                    placeholder="உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்"
                  />
                </div>
              )}
              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-input" />
                    <span className="text-sm text-muted-foreground">என்னை நினைவில் வை</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    கடவுச்சொல் மறந்துவிட்டதா?
                  </Link>
                </div>
              )}
              <Button type="submit" className="w-full" size="lg">
                {isSignUp ? 'கணக்கை உருவாக்கு' : 'உள்நுழை'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'ஏற்கனவே கணக்கு உள்ளதா?' : 'கணக்கு இல்லையா?'}{' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'உள்நுழை' : 'பதிவு செய்'}
                </button>
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              தொடர்வதன் மூலம், எங்கள்{' '}
              <Link href="/terms" className="text-primary hover:underline">சேவை விதிமுறைகள்</Link>
              {' '}மற்றும்{' '}
              <Link href="/privacy" className="text-primary hover:underline">தனியுரிமை கொள்கை</Link>
              க்கு ஒப்புக்கொள்கிறீர்கள்.
            </p>
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
              என் கணக்கு
            </h1>
            <p className="mt-2 text-muted-foreground">
              வரவேற்கிறோம், {mockUser.name}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  வெளியேறு
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground">தனிப்பட்ட தகவல்</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="profileName">முழு பெயர்</Label>
                        <Input id="profileName" className="mt-1" defaultValue={mockUser.name} />
                      </div>
                      <div>
                        <Label htmlFor="profileEmail">மின்னஞ்சல்</Label>
                        <Input id="profileEmail" type="email" className="mt-1" defaultValue={mockUser.email} />
                      </div>
                      <div>
                        <Label htmlFor="profilePhone">தொலைபேசி</Label>
                        <Input id="profilePhone" type="tel" className="mt-1" defaultValue={mockUser.phone} />
                      </div>
                      <div>
                        <Label>உறுப்பினர் ஆன தேதி</Label>
                        <p className="mt-2 text-foreground">{mockUser.memberSince}</p>
                      </div>
                    </div>
                    <Button className="mt-6">மாற்றங்களை சேமி</Button>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground">கடவுச்சொல் மாற்றவும்</h2>
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">தற்போதைய கடவுச்சொல்</Label>
                        <Input id="currentPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">புதிய கடவுச்சொல்</Label>
                        <Input id="newPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirmNewPassword">புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்</Label>
                        <Input id="confirmNewPassword" type="password" className="mt-1" />
                      </div>
                    </div>
                    <Button className="mt-6">கடவுச்சொல் புதுப்பி</Button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">ஆர்டர் வரலாறு</h2>
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.date} &middot; {order.items} பொருட்கள்
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{order.total}</p>
                        <span className="inline-flex items-center rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                          {order.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">ஆர்டர் விவரங்களைக் காண்க</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">சேமிக்கப்பட்ட முகவரிகள்</h2>
                    <Button size="sm">புதிய முகவரி சேர்</Button>
                  </div>
                  {mockAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{address.name}</p>
                            {address.isDefault && (
                              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                இயல்புநிலை
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{address.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.zip}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">திருத்து</Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            நீக்கு
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">பணம் செலுத்தும் முறைகள்</h2>
                    <Button size="sm">புதிய கார்ட் சேர்</Button>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                          <CreditCard className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">விசா 4242 இல் முடிகிறது</p>
                          <p className="text-sm text-muted-foreground">காலாவதி 12/28</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          இயல்புநிலை
                        </span>
                        <Button variant="ghost" size="sm">திருத்து</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="text-center py-12">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">உங்கள் விருப்பப்பட்டியல் காலியாக உள்ளது</h2>
                  <p className="mt-2 text-muted-foreground">
                    உங்கள் பிடித்த பொருட்களை பிறகு சேமியுங்கள்
                  </p>
                  <Button className="mt-6" asChild>
                    <Link href="/products">பொருட்களை பார்க்கவும்</Link>
                  </Button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground">மின்னஞ்சல் விருப்பங்கள்</h2>
                    <div className="mt-4 space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">ஆர்டர் புதுப்பிப்புகள்</p>
                          <p className="text-sm text-muted-foreground">
                            உங்கள் ஆர்டர்கள் பற்றிய அறிவிப்புகளை பெறுங்கள்
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-input" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">விளம்பரங்கள்</p>
                          <p className="text-sm text-muted-foreground">
                            பிரத்யேக சலுகைகள் மற்றும் ஆஃபர்களை பெறுங்கள்
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-input" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">செய்திமடல்</p>
                          <p className="text-sm text-muted-foreground">
                            வாராந்திர சமையல் குறிப்புகள் மற்றும் செய்முறைகள்
                          </p>
                        </div>
                        <input type="checkbox" className="h-5 w-5 rounded border-input" />
                      </label>
                    </div>
                    <Button className="mt-6">விருப்பங்களை சேமி</Button>
                  </div>

                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                    <h2 className="text-lg font-semibold text-destructive">ஆபத்து மண்டலம்</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      உங்கள் கணக்கை நீக்கினால், திரும்ப வர வழி இல்லை. தயவுசெய்து உறுதியாக இருங்கள்.
                    </p>
                    <Button variant="destructive" className="mt-4">
                      கணக்கை நீக்கு
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
