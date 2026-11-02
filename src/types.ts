export type Category = 
  | 'All'
  | 'Swarovski Jewellery'
  | 'Necklaces & Chokers'
  | 'Earrings & Jhumkas'
  | 'Bracelets & Bangles'
  | 'Rings'
  | 'Designer Clothing'
  | 'Bags & Accessories'
  | 'Gifting & Combos';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  material?: string;
  inStock: boolean;
  tag?: 'Bestseller' | 'New Launch' | 'Swarovski Certified' | 'Trending' | 'Limited Edition' | 'Sale';
  rating?: number;
  featured?: boolean;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string; // e.g. "919876543210" without +
  announcementText: string;
  adminPin: string;
  currencySymbol: string;
}
