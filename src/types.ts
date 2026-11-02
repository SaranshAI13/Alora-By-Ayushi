export type Category = string;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  material?: string;
  inStock: boolean;
  tag?: 'Bestseller' | 'New Launch' | 'Swarovski Certified' | 'Trending' | 'Limited Edition' | 'Sale' | 'Royal Choice';
  rating?: number;
  featured?: boolean;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string; // "919667779443"
  announcementText: string;
  adminPin: string; // "aashi12345"
  currencySymbol: string;
  categories: string[];
}
