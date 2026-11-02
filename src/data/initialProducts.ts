import { Product, StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Alora by Ayushi',
  tagline: 'Curated Branded Fashion, Luxury Jewellery & Accessories',
  instagramHandle: 'alora_by_ayushi_',
  instagramUrl: 'https://www.instagram.com/alora_by_ayushi_?psln=bXE3cWExaHF2MHls',
  whatsappNumber: '919667779443', // Ayushi's Official WhatsApp & Contact
  announcementText: '✨ Express Pan-India Delivery • Custom Orders on WhatsApp: +91 9667779443 ✨',
  adminPin: 'alora123',
  currencySymbol: '₹'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'alr-001',
    name: 'Austrian Starlight Solitaire Pendant Set',
    category: 'Swarovski Jewellery',
    price: 1899,
    originalPrice: 2899,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Authentic precision-cut crystal set in 18k rose-gold plating with anti-tarnish coating. Comes in signature velvet casing.',
    material: 'Austrian Crystal, 18k Rose Gold Micron Plating',
    inStock: true,
    tag: 'Bestseller',
    rating: 5.0,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-002',
    name: 'Branded Champagne Mulberry Silk Evening Dress',
    category: 'Designer Clothing',
    price: 3499,
    originalPrice: 4999,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Designer silhouette tailored in rich mulberry satin silk with draped cowl neckline. Perfect for cocktail parties and weddings.',
    material: 'Premium Satin Silk, Breathable Inner Lining',
    inStock: true,
    tag: 'Trending',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-003',
    name: 'Emerald Aurora Luxury Tennis Bracelet',
    category: 'Bracelets & Bangles',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1611591475152-4783113960d9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Dazzling baguette-cut emerald and clear crystals with double security clasp. Water-resistant and hypoallergenic.',
    material: 'AAA+ Emerald Crystals, Rhodium Finish',
    inStock: true,
    tag: 'Bestseller',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-004',
    name: 'Quilted Pearl Micro-Crossbody Luxury Bag',
    category: 'Bags & Accessories',
    price: 2199,
    originalPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Structured vegan leather handbag featuring golden metallic chain, pearl embellishments, and multi-compartment interior.',
    material: 'Boutique Vegan Leather, Gold-Tone Hardware',
    inStock: true,
    tag: 'New Launch',
    rating: 4.9,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-005',
    name: 'Celestial Diamond-Cut Drop Chandelier Earrings',
    category: 'Earrings & Jhumkas',
    price: 1450,
    originalPrice: 2199,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Graceful cascading crystal chandelier earrings that catch light beautifully. Feather-light for comfortable all-night wear.',
    material: 'Micro-pave Zirconia, Hypoallergenic Alloy',
    inStock: true,
    tag: 'Trending',
    rating: 5.0,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-006',
    name: 'Branded Floral Organza Midi Dress',
    category: 'Designer Clothing',
    price: 2899,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ethereal floral organza midi dress with puffed sheer sleeves and cinched waistline. A dreamy daytime brunch outfit.',
    material: 'Korean Organza Silk, Soft Cotton Voile Lining',
    inStock: true,
    tag: 'New Launch',
    rating: 4.8,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-007',
    name: 'Rose Gold Royal Duchess Statement Choker',
    category: 'Necklaces & Chokers',
    price: 3200,
    originalPrice: 4800,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Intricately handcrafted choker with multifaceted stones. Designed to pair with western evening gowns or Indian lehengas.',
    material: 'Rose Gold Polish, Hand-set Navette Stones',
    inStock: true,
    tag: 'Limited Edition',
    rating: 5.0,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'alr-008',
    name: 'Cushion-Cut Eternity Sparkle Ring',
    category: 'Rings',
    price: 999,
    originalPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Endless band of brilliant cushion-cut crystals reflecting brilliance from every angle. Comfort-fit band.',
    material: '925 Silver Plating, AAA+ Zirconia',
    inStock: true,
    tag: 'Bestseller',
    rating: 4.7,
    featured: false,
    createdAt: new Date().toISOString()
  }
];
