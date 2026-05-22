export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: 'beef' | 'pork' | 'poultry' | 'lamb' | 'fish' | 'shellfish'
  image: string
  weight: string
  origin: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: 'bestseller' | 'new' | 'sale' | 'premium'
  details: {
    cut?: string
    grade?: string
    freshness?: string
    preparation?: string
  }
}

export const categories = [
  { id: 'beef', name: 'மாட்டிறைச்சி', icon: '🥩', description: 'தரமான துண்டுகள் & ஸ்டீக்குகள்' },
  { id: 'pork', name: 'பன்றி இறைச்சி', icon: '🐷', description: 'புதிய பன்றி தேர்வுகள்' },
  { id: 'poultry', name: 'கோழி இறைச்சி', icon: '🍗', description: 'கோழி, வாத்து & மேலும்' },
  { id: 'lamb', name: 'ஆட்டிறைச்சி', icon: '🐑', description: 'மென்மையான ஆட்டு துண்டுகள்' },
  { id: 'fish', name: 'மீன்', icon: '🐟', description: 'இயற்கையாக பிடிக்கப்பட்ட மீன்' },
  { id: 'shellfish', name: 'கடல் உணவு', icon: '🦐', description: 'கடலிலிருந்து புதிதாக' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'வாகியு ரிபை ஸ்டீக்',
    description: 'அசாதாரண மார்பிள்ளிங் கொண்ட உன்னத ஜப்பானிய A5 வாகியு மாட்டிறைச்சி. மாட்டிறைச்சி தரத்தின் உச்சம், ஒப்பற்ற மென்மை மற்றும் வளமான, வெண்ணெய் சுவை.',
    price: 149.99,
    category: 'beef',
    image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&auto=format&fit=crop&q=80',
    weight: '340 கிராம்',
    origin: 'ஜப்பான்',
    rating: 4.9,
    reviews: 128,
    inStock: true,
    badge: 'premium',
    details: {
      cut: 'ரிபை',
      grade: 'A5 வாகியு',
      freshness: 'புதிய, உறைவிக்கப்படவில்லை',
      preparation: 'மாஸ்டர் கசாப்புக்காரர்களால் கைவினையாக வெட்டப்பட்டது',
    },
  },
  {
    id: '2',
    name: 'பிரைம் மாட்டிறைச்சி டெண்டர்லாயின்',
    description: 'USDA பிரைம் டெண்டர்லாயின், மாட்டிறைச்சியின் மிகவும் மென்மையான துண்டு. சிறப்பு சந்தர்ப்பங்கள் மற்றும் நேர்த்தியான இரவு உணவுகளுக்கு சரியானது.',
    price: 89.99,
    originalPrice: 109.99,
    category: 'beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&auto=format&fit=crop&q=80',
    weight: '450 கிராம்',
    origin: 'அமெரிக்கா',
    rating: 4.8,
    reviews: 256,
    inStock: true,
    badge: 'sale',
    details: {
      cut: 'டெண்டர்லாயின்',
      grade: 'USDA பிரைம்',
      freshness: 'புதிய, 21 நாட்கள் உலர்ந்த பழையது',
      preparation: 'நடுப்பகுதி வெட்டு, ஒழுங்குபடுத்தப்பட்டது',
    },
  },
  {
    id: '3',
    name: 'டாமஹாக் ரிபை',
    description: 'நீண்ட எலும்புடன் கூடிய ஈர்க்கக்கூடிய எலும்பு-இன் ரிபை. எந்த மேசைக்கும் ஒரு காட்சி, சுவையில் நிறைந்தது மற்றும் கிரில்லிங்கிற்கு சரியானது.',
    price: 79.99,
    category: 'beef',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=80',
    weight: '900 கிராம்',
    origin: 'அமெரிக்கா',
    rating: 4.9,
    reviews: 189,
    inStock: true,
    badge: 'bestseller',
    details: {
      cut: 'டாமஹாக் ரிபை',
      grade: 'USDA சாய்ஸ்',
      freshness: 'புதிய, 28 நாட்கள் ஈரமான பழையது',
      preparation: 'எலும்பு 6 அங்குலம் வெட்டப்பட்டது',
    },
  },
  {
    id: '4',
    name: 'பெர்க்ஷயர் பன்றி சாப்ஸ்',
    description: 'அடர் நிறம், சிறந்த மார்பிள்ளிங், மற்றும் வளமான, சாறு நிறைந்த சுவைக்கு பெயர் பெற்ற பாரம்பரிய இன பன்றி.',
    price: 34.99,
    category: 'pork',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80',
    weight: '680 கிராம் (4 சாப்ஸ்)',
    origin: 'அமெரிக்கா',
    rating: 4.7,
    reviews: 94,
    inStock: true,
    badge: 'premium',
    details: {
      cut: 'நடுப்பகுதி வெட்டு சாப்ஸ்',
      grade: 'பாரம்பரிய பெர்க்ஷயர்',
      freshness: 'புதிய, உறைவிக்கப்படவில்லை',
      preparation: 'எலும்புடன், 3 சென்டிமீட்டர் தடிமன்',
    },
  },
  {
    id: '5',
    name: 'இபெரிகோ பன்றி வயிறு',
    description: 'ஓக்கு பருப்பு உண்ணும் பன்றிகளிலிருந்து ஸ்பானிஷ் இபெரிகோ பன்றி வயிறு. நம்பமுடியாத வளமான சுவை மற்றும் சரியான கொழுப்பு-இறைச்சி விகிதம்.',
    price: 54.99,
    category: 'pork',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80',
    weight: '900 கிராம்',
    origin: 'ஸ்பெயின்',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    badge: 'new',
    details: {
      cut: 'வயிறு',
      grade: 'இபெரிகோ டி பெல்லோட்டா',
      freshness: 'புதிய',
      preparation: 'தோலுடன், சுடத் தயார்',
    },
  },
  {
    id: '6',
    name: 'இயற்கை முழு கோழி',
    description: 'அசாதாரண சுவை மற்றும் அமைப்புடன் மேய்ச்சலில் வளர்க்கப்பட்ட கோழி. நெறிமுறையாக வளர்க்கப்பட்டது, நுண்ணுயிர் எதிர்ப்பிகள் அல்லது ஹார்மோன்கள் இல்லை.',
    price: 24.99,
    category: 'poultry',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&auto=format&fit=crop&q=80',
    weight: '1.8-2.3 கிலோ',
    origin: 'இந்தியா',
    rating: 4.6,
    reviews: 312,
    inStock: true,
    details: {
      grade: 'இயற்கை, இலவச மேய்ச்சல்',
      freshness: 'புதிய, உறைவிக்கப்படவில்லை',
      preparation: 'முழு, சுடத் தயார்',
    },
  },
  {
    id: '7',
    name: 'வாத்து மார்பு மேக்ரெட்',
    description: 'பான்-சியரிங்கிற்கு சரியான பிரீமியம் மூலார்ட் வாத்து மார்பு. வளமான, காட்டு சுவை மற்றும் சுவையான கொழுப்பு அடுக்கு.',
    price: 39.99,
    category: 'poultry',
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&auto=format&fit=crop&q=80',
    weight: '400-450 கிராம்',
    origin: 'பிரான்ஸ்',
    rating: 4.8,
    reviews: 76,
    inStock: true,
    badge: 'premium',
    details: {
      cut: 'மேக்ரெட் மார்பு',
      grade: 'கிரேட் A மூலார்ட்',
      freshness: 'புதிய',
      preparation: 'தோலுடன், கீறி சியர் செய்யவும்',
    },
  },
  {
    id: '8',
    name: 'ஆட்டிறைச்சி ராக்',
    description: 'நேர்த்தியான வழங்கலுக்கு வெட்டப்பட்ட அமெரிக்க ஆட்டிறைச்சி ராக். மிதமான, மென்மையான, சுடுவதற்கு சரியான.',
    price: 64.99,
    category: 'lamb',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80',
    weight: '680 கிராம் (8 எலும்புகள்)',
    origin: 'அமெரிக்கா',
    rating: 4.9,
    reviews: 143,
    inStock: true,
    badge: 'bestseller',
    details: {
      cut: 'ராக்',
      grade: 'USDA சாய்ஸ்',
      freshness: 'புதிய',
      preparation: 'வெட்டப்பட்டது, தொப்பியுடன்',
    },
  },
  {
    id: '9',
    name: 'காட்டு அலாஸ்கா சால்மன்',
    description: 'அலாஸ்காவின் தூய்மையான நீரிலிருந்து இயற்கையாக பிடிக்கப்பட்ட கிங் சால்மன். ஒமேகா-3 நிறைந்தது, வெண்ணெய், நுட்பமான சுவை.',
    price: 44.99,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&auto=format&fit=crop&q=80',
    weight: '450 கிராம் ஃபில்லெட்',
    origin: 'அலாஸ்கா, அமெரிக்கா',
    rating: 4.9,
    reviews: 287,
    inStock: true,
    badge: 'bestseller',
    details: {
      cut: 'நடுப்பகுதி வெட்டு ஃபில்லெட்',
      grade: 'காட்டு கிங் சால்மன்',
      freshness: 'புதிய, சாஷிமி தரம்',
      preparation: 'தோலுடன், முள் நீக்கப்பட்டது',
    },
  },
  {
    id: '10',
    name: 'புளூஃபின் டியூனா லாயின்',
    description: 'சாஷிமி தர புளூஃபின் டியூனா, பச்சை தயாரிப்புகள் அல்லது விரைவான சியருக்கு சரியானது. சுஷி மீனின் ராஜா.',
    price: 89.99,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&auto=format&fit=crop&q=80',
    weight: '230 கிராம்',
    origin: 'மத்தியதரைக்கடல்',
    rating: 4.8,
    reviews: 98,
    inStock: true,
    badge: 'premium',
    details: {
      cut: 'லாயின்',
      grade: 'சாஷிமி தரம்',
      freshness: 'கடலில் சூப்பர்-உறைவிக்கப்பட்டது',
      preparation: 'பிளாக் வெட்டு, துண்டிக்க தயார்',
    },
  },
  {
    id: '11',
    name: 'சிலியன் கடல் பாஸ்',
    description: 'பெரிய, ஈரமான தகடுகளுடன் வெண்ணெய், வளமான கடல் பாஸ். உங்கள் வாயில் உருகும் உணவகத்தின் விருப்பம்.',
    price: 54.99,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=800&auto=format&fit=crop&q=80',
    weight: '230 கிராம் ஃபில்லெட்',
    origin: 'சிலி',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    details: {
      cut: 'பகுதி ஃபில்லெட்',
      grade: 'MSC சான்றளிக்கப்பட்டது',
      freshness: 'புதிய',
      preparation: 'தோலற்ற, எலும்பற்ற',
    },
  },
  {
    id: '12',
    name: 'மைன் லாப்ஸ்டர் வால்கள்',
    description: 'இனிப்பான, மென்மையான மைன் லாப்ஸ்டர் வால்கள். சிறப்பு சந்தர்ப்பங்கள் அல்லது வீட்டில் நேர்த்தியான இரவு உணவுக்கு சரியானது.',
    price: 79.99,
    category: 'shellfish',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80',
    weight: '2 வால்கள் (230-280 கிராம் ஒவ்வொன்றும்)',
    origin: 'மைன், அமெரிக்கா',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    badge: 'bestseller',
    details: {
      grade: 'கடினமான ஓடு',
      freshness: 'துறைமுகத்தில் உடனடி உறைவிப்பு',
      preparation: 'எளிதாக சமைக்க பிளந்த ஓடு',
    },
  },
  {
    id: '13',
    name: 'ஜம்போ கடல் ஸ்காலப்ஸ்',
    description: 'சியரிங்கிற்கு தங்க தரமான உலர்-பேக் டைவர் ஸ்காலப்ஸ். இனிப்பான, உப்பு கலந்த, நம்பமுடியாத மென்மையான.',
    price: 49.99,
    category: 'shellfish',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&auto=format&fit=crop&q=80',
    weight: '450 கிராம் (10-12 எண்ணிக்கை)',
    origin: 'ஜார்ஜஸ் பேங்க், அமெரிக்கா',
    rating: 4.8,
    reviews: 134,
    inStock: true,
    badge: 'premium',
    details: {
      grade: 'U-10 டைவர்',
      freshness: 'உலர்-பேக், சிகிச்சையளிக்கப்படவில்லை',
      preparation: 'பக்க தசை நீக்கப்பட்டது',
    },
  },
  {
    id: '14',
    name: 'சிப்பி வகை பேக்',
    description: 'கிழக்கு மற்றும் மேற்கு கடற்கரை சிப்பிகளின் தேர்ந்தெடுக்கப்பட்ட தொகுப்பு. கடலின் நிலப்பரப்பை அனுபவியுங்கள்.',
    price: 59.99,
    category: 'shellfish',
    image: 'https://images.unsplash.com/photo-1606731219412-1a8b5fbd5f8c?w=800&auto=format&fit=crop&q=80',
    weight: '2 டஜன்',
    origin: 'கலப்பு மூலங்கள்',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    badge: 'new',
    details: {
      grade: 'தேர்ந்தெடுக்கப்பட்ட தரம்',
      freshness: 'உயிருடன், அதே நாள் அனுப்பப்பட்டது',
      preparation: 'கத்தி உட்பட',
    },
  },
  {
    id: '15',
    name: 'ஆட்டு தோள் சுடு',
    description: 'மெதுவாக சுடுவதற்கு சரியான எலும்புடன் கூடிய ஆட்டு தோள். நம்பமுடியாத ஆழமான சுவையுடன் எலும்பிலிருந்து விழும்.',
    price: 42.99,
    originalPrice: 54.99,
    category: 'lamb',
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&auto=format&fit=crop&q=80',
    weight: '1.8-2.3 கிலோ',
    origin: 'நியூசிலாந்து',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    badge: 'sale',
    details: {
      cut: 'தோள்',
      grade: 'புல் உண்ணும்',
      freshness: 'புதிய',
      preparation: 'எலும்புடன், கட்டப்பட்டது',
    },
  },
  {
    id: '16',
    name: 'பிராஞ்சினோ முழு மீன்',
    description: 'முழுவதுமாக சுடுவதற்கு சரியான மத்தியதரைக்கடல் கடல் பாஸ். நுட்பமான, இனிப்பான சதை மற்றும் சுத்தமான முடிவு.',
    price: 32.99,
    category: 'fish',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&auto=format&fit=crop&q=80',
    weight: '680-900 கிராம்',
    origin: 'மத்தியதரைக்கடல்',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    details: {
      grade: 'பிரீமியம்',
      freshness: 'புதிய, உறைவிக்கப்படவில்லை',
      preparation: 'குடல் நீக்கப்பட்டது, செதில் நீக்கப்பட்டது, சமைக்க தயார்',
    },
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge === 'bestseller' || p.badge === 'premium').slice(0, 6)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.badge === 'new')
}

export function getSaleProducts(): Product[] {
  return products.filter(p => p.badge === 'sale')
}
