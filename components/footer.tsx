import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  shop: [
    { name: 'அனைத்து பொருட்கள்', href: '/products' },
    { name: 'மாட்டிறைச்சி', href: '/products?category=beef' },
    { name: 'பன்றி இறைச்சி', href: '/products?category=pork' },
    { name: 'கோழி இறைச்சி', href: '/products?category=poultry' },
    { name: 'கடல் உணவு', href: '/products?category=fish' },
  ],
  company: [
    { name: 'எங்களை பற்றி', href: '/about' },
    { name: 'எங்கள் கதை', href: '/story' },
    { name: 'நிலைத்தன்மை', href: '/sustainability' },
    { name: 'வேலைவாய்ப்புகள்', href: '/careers' },
  ],
  support: [
    { name: 'எங்களை தொடர்புகொள்ளுங்கள்', href: '/contact' },
    { name: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', href: '/faq' },
    { name: 'ஷிப்பிங் தகவல்', href: '/shipping' },
    { name: 'திரும்ப அனுப்புதல்', href: '/returns' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-lg font-bold">பி</span>
              </div>
              <span className="font-serif text-xl font-bold">பிரைம் கட்ஸ்</span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              தரமான இறைச்சி மற்றும் கடல் உணவு, உங்கள் வீட்டுக்கு புதிதாக வழங்கப்படுகிறது. 
              நிலையான பண்ணைகள் மற்றும் பொறுப்பான மீன்பிடி தொழில்களுடன் 
              இணைந்து உங்களுக்கு சிறந்த தரமான புரதங்களை வழங்குகிறோம்.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <span className="sr-only">பேஸ்புக்</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <span className="sr-only">இன்ஸ்டாகிராம்</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <span className="sr-only">ட்விட்டர்</span>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">கடை</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">நிறுவனம்</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">உதவி</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-background/70 hover:text-background transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">புதுப்பிப்புகளை பெறுங்கள்</h3>
            <p className="mt-4 text-sm text-background/70">
              பிரத்யேக சலுகைகள், புதிய வரவுகள் மற்றும் சமையல் குறிப்புகளுக்கு பதிவு செய்யுங்கள்.
            </p>
            <form className="mt-4 flex flex-col gap-2">
              <Input
                type="email"
                placeholder="உங்கள் மின்னஞ்சலை உள்ளிடவும்"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                பதிவு செய்
              </Button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@primecuts.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>சென்னை, தமிழ்நாடு</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} பிரைம் கட்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
            </p>
            <div className="flex gap-6 text-sm text-background/50">
              <Link href="/privacy" className="hover:text-background transition-colors">
                தனியுரிமை கொள்கை
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                சேவை விதிமுறைகள்
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
