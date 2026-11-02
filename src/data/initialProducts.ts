import { Product, StoreSettings } from '../types';

export const DEFAULT_CATEGORIES: string[] = [
  'All',
  '👗 Designer & Branded Clothing',
  '💎 Swarovski & Royal Jewellery',
  '👜 Luxury Handbags & Clutches',
  '📿 Statement Chokers & Necklaces',
  '✨ Crystal Chandelier Earrings',
  '💫 Tennis Bracelets & Bangles',
  '💍 Rings & Solitaires',
  '🎁 Bespoke Gift Sets & Combos'
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Alora by Ayushi',
  tagline: 'Curated Branded Fashion, Luxury Jewellery & Royal Accessories',
  instagramHandle: 'alora_by_ayushi_',
  instagramUrl: 'https://www.instagram.com/alora_by_ayushi_?psln=bXE3cWExaHF2MHls',
  whatsappNumber: '919667779443', // Ayushi's Direct WhatsApp
  announcementText: '👑 100% Authenticated Branded Pieces • Custom Orders WhatsApp: +91 9667779443 👑',
  adminPin: 'aashi12345', // Updated PIN requested by user
  currencySymbol: '₹',
  categories: DEFAULT_CATEGORIES
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'alr-001',
    name: 'Branded Champagne Mulberry Silk Evening Dress',
    category: '👗 Designer & Branded Clothing',
    price: 3499,
    originalPrice: 4999,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Designer silhouette tailored in rich mulberry satin silk with draped cowl neckline. Perfect for royal cocktail evenings and weddings.',
    material: 'Pure Satin Silk, Breathable Inner Lining',
    inStock: true,
    tag: 'Bestseller',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-002',
    name: 'Austrian Starlight Solitaire Pendant & Earring Set',
    category: '💎 Swarovski & Royal Jewellery',
    price: 1899,
    originalPrice: 2899,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Authentic precision-cut crystal set in 18k rose-gold plating with anti-tarnish finish. Comes in bespoke royal velvet casing.',
    material: 'Austrian Crystal, 18k Rose Gold Micron Plating',
    inStock: true,
    tag: 'Swarovski Certified',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-003',
    name: 'Quilted Pearl Micro-Crossbody Luxury Handbag',
    category: '👜 Luxury Handbags & Clutches',
    price: 2199,
    originalPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Structured branded vegan leather bag featuring golden metallic chain, mother-of-pearl accents, and multiple compartments.',
    material: 'Premium Vegan Leather, Gold-Tone Hardware',
    inStock: true,
    tag: 'New Launch',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-004',
    name: 'Branded Floral Organza Runway Midi Dress',
    category: '👗 Designer & Branded Clothing',
    price: 2899,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ethereal floral organza dress with puffed sheer sleeves and cinched waist. A dreamy daytime couture piece.',
    material: 'Korean Organza Silk, Soft Cotton Voile Lining',
    inStock: true,
    tag: 'Trending',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-005',
    name: 'Emerald Aurora Royal Tennis Bracelet',
    category: '💫 Tennis Bracelets & Bangles',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1611591475152-4783113960d9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Baguette-cut emerald and clear crystals with double security clasp. Water-resistant, hypoallergenic finish.',
    material: 'AAA+ Emerald Crystals, Rhodium Finish',
    inStock: true,
    tag: 'Bestseller',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-006',
    name: 'Rose Gold Royal Duchess Statement Choker',
    category: '📿 Statement Chokers & Necklaces',
    price: 3200,
    originalPrice: 4800,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Intricately handcrafted royal choker with multifaceted stones. Designed to pair with evening gowns as well as bridal wear.',
    material: 'Rose Gold Polish, Hand-set Navette Stones',
    inStock: true,
    tag: 'Limited Edition',
    rating: 5.0,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-007',
    name: 'Celestial Diamond-Cut Chandelier Drops',
    category: '✨ Crystal Chandelier Earrings',
    price: 1450,
    originalPrice: 2199,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Cascading crystal chandelier earrings that catch light at every angle. Lightweight for all-day comfort.',
    material: 'Micro-pave Zirconia, Hypoallergenic Alloy',
    inStock: true,
    tag: 'Trending',
    rating: 5.0,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-008',
    name: 'Cushion-Cut Eternity Solitaire Sparkle Ring',
    category: '💍 Rings & Solitaires',
    price: 999,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Endless band of brilliant cushion-cut crystals reflecting eternal brilliance. Adjustable comfort fit.',
    material: '925 Silver Plating, AAA+ Zirconia',
    inStock: true,
    tag: 'Bestseller',
    rating: 4.7,
    featured: false,
    createdAt: new Date().toISOString()
  }
];
