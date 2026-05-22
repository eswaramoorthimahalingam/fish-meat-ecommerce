import type { Metadata } from 'next'
import { Playfair_Display, Noto_Sans_Tamil } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif'
})

const notoSansTamil = Noto_Sans_Tamil({ 
  subsets: ['tamil'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'பிரைம் கட்ஸ் | தரமான இறைச்சி & கடல் உணவு',
  description: 'தரமான இறைச்சி மற்றும் புதிய கடல் உணவுகளின் சிறந்த தேர்வை கண்டறியுங்கள். பண்ணையிலிருந்து நேரடியாக, கைவினை துண்டுகள், நிலையான மீன்பிடி.',
  keywords: ['இறைச்சி', 'கடல் உணவு', 'கசாப்பு', 'மீன்', 'தரமான', 'இயற்கை', 'புதிய'],
}

export const viewport = {
  themeColor: '#8B4513',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ta" className={`${playfair.variable} ${notoSansTamil.variable}`}>
      <body className="font-sans antialiased bg-background">
        <CartProvider>
          {children}
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
