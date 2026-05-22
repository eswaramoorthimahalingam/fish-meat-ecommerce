import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, Leaf, Award, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { categories, getFeaturedProducts } from '@/lib/products'

const features = [
  {
    icon: Truck,
    title: 'இலவச டெலிவரி',
    description: '₹8,300 க்கு மேல் ஆர்டர்களுக்கு இலவச ஷிப்பிங். வெப்பநிலை கட்டுப்படுத்தப்பட்ட பேக்கேஜிங்.',
  },
  {
    icon: Shield,
    title: 'தரம் உத்தரவாதம்',
    description: '100% திருப்தி உத்தரவாதம். மகிழ்ச்சியாக இல்லையா? முழு பணத்தை திரும்பப் பெறுங்கள்.',
  },
  {
    icon: Leaf,
    title: 'நிலையான மூலம்',
    description: 'கூட்டாளர் பண்ணைகள் நெறிமுறை மற்றும் நிலையான நடைமுறைகளை பின்பற்றுகின்றன.',
  },
  {
    icon: Award,
    title: 'நிபுணர் தேர்வு',
    description: 'எங்கள் மாஸ்டர் கசாப்புக்காரர்கள் மற்றும் மீன்வியாபாரிகளால் கைவினையாக தேர்ந்தெடுக்கப்பட்டது.',
  },
]

const testimonials = [
  {
    content: "பிரைம் கட்ஸிலிருந்து இறைச்சியின் தரம் முற்றிலும் அசாதாரணமானது. வாகியு ரிபை நான் வீட்டில் சமைத்த சிறந்த ஸ்டீக்.",
    author: 'சரவணன் மு.',
    role: 'வீட்டு சமையல்காரர்',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    content: "இறுதியாக, உணவகத் தரமான கடல் உணவு என் வீட்டுக்கு வழங்கப்படுகிறது. சால்மன் எப்போதும் புதிதாகவும் சரியாக பகுக்கப்பட்டும் இருக்கிறது.",
    author: 'பிரியா ரா.',
    role: 'உணவு பிளாகர்',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    content: "வசதி மற்றும் தரம் ஒப்பற்றது. நான் 6 மாதங்களாக ஆர்டர் செய்து வருகிறேன், ஒவ்வொரு டெலிவரியும் சரியானதாக இருந்தது.",
    author: 'மிஷேல் தி.',
    role: 'வேலை செய்யும் பெற்றோர்',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
  },
]

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1558030006-450675393462?w=1920&auto=format&fit=crop&q=80"
              alt="தரமான இறைச்சி தேர்வு"
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                1985 முதல் தரமான தரம்
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                சிறந்த துண்டுகள், <br className="hidden sm:block" />
                புதிதாக வழங்கப்படுகிறது
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-background/80">
                தரமான புரதங்களின் கலையை அனுபவியுங்கள். உலர்ந்த பழைய ஸ்டீக்குகள் முதல் 
                இயற்கையாக பிடிக்கப்பட்ட கடல் உணவு வரை, உணவகத் தரமான பொருட்களை 
                நேரடியாக உங்கள் சமையலறைக்கு கொண்டு வருகிறோம்.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/products">
                    இப்போது ஷாப்பிங்
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                  <Link href="/about">
                    எங்கள் கதை
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                வகை வாரியாக ஷாப்பிங்
              </h2>
              <p className="mt-4 text-muted-foreground">
                எங்கள் தேர்ந்தெடுக்கப்பட்ட தரமான புரதங்களின் தொகுப்பை ஆராயுங்கள்
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group relative flex flex-col items-center rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                >
                  <span className="text-4xl" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                  <h3 className="mt-3 font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground text-center">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  சிறப்பு தேர்வு
                </h2>
                <p className="mt-4 text-muted-foreground">
                  தரத்திற்காக கைவினையாக தேர்ந்தெடுக்கப்பட்ட எங்கள் மிகவும் பிரபலமான துண்டுகள்
                </p>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                அனைத்து பொருட்களையும் காண்க
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  featured={index === 0}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/products">
                  அனைத்து பொருட்களையும் காண்க
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <section className="border-y border-border bg-card py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-medium text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Split Hero */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Meat */}
              <Link href="/products?category=beef" className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80"
                    alt="தரமான மாட்டிறைச்சி துண்டுகள்"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-sm font-medium uppercase tracking-widest text-primary">
                    பிரீமியம் தொகுப்பு
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-background sm:text-3xl">
                    கைவினை இறைச்சிகள்
                  </h3>
                  <p className="mt-2 text-background/80">
                    வாகியு முதல் பாரம்பரிய இனங்கள் வரை
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    இறைச்சிகளை ஷாப்பிங் செய்
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>

              {/* Seafood */}
              <Link href="/products?category=fish" className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&auto=format&fit=crop&q=80"
                    alt="புதிய கடல் உணவு தேர்வு"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    கடலிலிருந்து புதிதாக
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-background sm:text-3xl">
                    காட்டு கடல் உணவு
                  </h3>
                  <p className="mt-2 text-background/80">
                    நிலையான மீன்பிடி, வளர்ப்பு அல்ல
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-accent group-hover:underline">
                    கடல் உணவை ஷாப்பிங் செய்
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்
              </h2>
              <p className="mt-4 text-muted-foreground">
                ஆயிரக்கணக்கான திருப்தியான வீட்டு சமையல்காரர்களுடன் சேரவும்
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <p className="text-foreground leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              உங்கள் சமையலறையை மேம்படுத்த தயாரா?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              எங்கள் உணவு ஆர்வலர்களின் சமூகத்தில் சேர்ந்து பருவகால 
              சிறப்புகள், சமையல் குறிப்புகள் மற்றும் உறுப்பினர்களுக்கு மட்டுமே தள்ளுபடிகளை பெறுங்கள்.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
                <Link href="/products">
                  ஷாப்பிங் தொடங்குங்கள்
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
