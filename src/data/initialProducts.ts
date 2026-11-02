import { Product, StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Alora by Ayushi',
  tagline: 'Luxury Swarovski Jewellery & Curated Designer Fashion',
  instagramHandle: 'alora_by_ayushi_',
  instagramUrl: 'https://www.instagram.com/alora_by_ayushi_?psln=bXE3cWExaHF2MHls',
  whatsappNumber: '919876543210', // Easily editable in Admin panel
  announcementText: '✨ FREE Luxury Gift Box with all Swarovski orders • Express Delivery Pan-India ✨',
  adminPin: 'alora123',
  currencySymbol: '₹'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'alr-001',
    name: 'Swarovski Starlight Solitaire Pendant',
    category: 'Swarovski Jewellery',
    price: 1899,
    originalPrice: 2899,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Authentic precision-cut Austrian Swarovski crystal set in 18k rose-gold plating with anti-tarnish coating. Comes in signature velvet casing with authenticity card.',
    material: 'Austrian Crystal, 18k Rose Gold Micron Plating',
    inStock: true,
    tag: 'Bestseller',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-002',
    name: 'Emerald Aurora Swarovski Tennis Bracelet',
    category: 'Bracelets & Bangles',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1611591475152-4783113960d9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Dazzling baguette-cut emerald and clear Swarovski elements lined along a flexible luxury clasp. Water-resistant, hypoallergenic finish suitable for daily glamour.',
    material: 'AAA+ Emerald Swarovski Crystals, Rhodium Finish',
    inStock: true,
    tag: 'Swarovski Certified',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-003',
    name: 'Celestial Diamond-Cut Drop Earrings',
    category: 'Earrings & Jhumkas',
    price: 1450,
    originalPrice: 2199,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Graceful cascading crystal chandelier earrings that catch every beam of light. Light-weight design crafted for comfortable party wear without earlobe pull.',
    material: 'Micro-pave Swarovski Zirconia, Hypoallergenic Alloy',
    inStock: true,
    tag: 'Trending',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-004',
    name: 'Rose Gold Royal Duchess Statement Choker',
    category: 'Necklaces & Chokers',
    price: 3200,
    originalPrice: 4800,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Intricately handcrafted statement choker necklace with multifaceted crystal embellishments. Designed to pair impeccably with western evening gowns as well as Indian lehengas.',
    material: 'Rose Gold Polish, Hand-set Swarovski Navette Stones',
    inStock: true,
    tag: 'Limited Edition',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-005',
    name: 'Champagne Silk Evening Maxi Dress',
    category: 'Designer Clothing',
    price: 3899,
    originalPrice: 5499,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Pure satin-silk silhouette with cowl neckline, adjustable lace back, and high-leg slit. Hand-tailored for effortless cocktail and gala evenings.',
    material: 'Heavy Mulberry Satin Silk, Breathable Lining',
    inStock: true,
    tag: 'New Launch',
    rating: 4.8,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-006',
    name: 'Quilted Pearl Micro-Crossbody Bag',
    category: 'Bags & Accessories',
    price: 2199,
    originalPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Structured vegan leather handbag featuring golden metallic chain, mother-of-pearl accents, and multiple compartments for luxury essentials.',
    material: 'Premium Vegan Leather, Gold-Tone Hardware',
    inStock: true,
    tag: 'Bestseller',
    rating: 4.9,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-007',
    name: 'Infinity Cushion-Cut Eternity Ring',
    category: 'Rings',
    price: 999,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Endless band of brilliant cushion-cut crystals reflecting fire from every angle. Comfort-fit band available in adjustable sizes.',
    material: '925 Sterling Silver Plated with Swarovski Crystals',
    inStock: true,
    tag: 'Trending',
    rating: 4.7,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-008',
    name: 'Bridal Crystal & Pearl Luxury Gift Box Set',
    category: 'Gifting & Combos',
    price: 4999,
    originalPrice: 6999,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Curated 4-piece luxury ensemble containing pendant necklace, matching chandelier earrings, adjustable bracelet, and hair accessory in bespoke gift box.',
    material: 'Swarovski Zirconia, Freshwater Shell Pearls',
    inStock: true,
    tag: 'Bestseller',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  }
];
