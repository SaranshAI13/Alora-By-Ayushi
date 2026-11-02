import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../types';

// Read from env or local storage config
const getCredentials = () => {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';
  const storedUrl = localStorage.getItem('alora_supabase_url') || '';
  const storedKey = localStorage.getItem('alora_supabase_anon_key') || '';

  return {
    url: storedUrl || envUrl,
    key: storedKey || envKey
  };
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getCredentials();
  if (!url || !key) return null;

  if (!clientInstance) {
    try {
      clientInstance = createClient(url, key);
    } catch (e) {
      console.error('Failed to initialize Supabase client', e);
      return null;
    }
  }
  return clientInstance;
};

export const setSupabaseCredentials = (url: string, key: string) => {
  localStorage.setItem('alora_supabase_url', url.trim());
  localStorage.setItem('alora_supabase_anon_key', key.trim());
  clientInstance = null; // reset instance so next call reinitializes
};

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getCredentials();
  return Boolean(url && key);
};

// ==================== CLOUD DATABASE OPERATIONS ====================

// Fetch All Products from Cloud
export const fetchCloudProducts = async (): Promise<Product[] | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return null;
    }

    if (!data) return [];

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      images: item.images || [],
      description: item.description || '',
      material: item.material || '',
      tag: item.tag || undefined,
      inStock: Boolean(item.in_stock),
      rating: item.rating ? Number(item.rating) : 5.0,
      featured: Boolean(item.featured),
      createdAt: item.created_at
    }));
  } catch (err) {
    console.error('Unexpected error fetching from Supabase:', err);
    return null;
  }
};

// Add Product to Cloud
export const addCloudProduct = async (product: Product): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('products').insert([
      {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice || null,
        images: product.images,
        description: product.description,
        material: product.material || null,
        tag: product.tag || null,
        in_stock: product.inStock,
        rating: product.rating || 5.0,
        featured: Boolean(product.featured),
        created_at: product.createdAt || new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Error inserting product into Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to add product to Supabase:', err);
    return false;
  }
};

// Update Product in Cloud
export const updateCloudProduct = async (product: Product): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice || null,
        images: product.images,
        description: product.description,
        material: product.material || null,
        tag: product.tag || null,
        in_stock: product.inStock,
        rating: product.rating || 5.0,
        featured: Boolean(product.featured)
      })
      .eq('id', product.id);

    if (error) {
      console.error('Error updating product in Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update product in Supabase:', err);
    return false;
  }
};

// Delete Product from Cloud
export const deleteCloudProduct = async (productId: string): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      console.error('Error deleting product from Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete product from Supabase:', err);
    return false;
  }
};

// Fetch Categories from Cloud
export const fetchCloudCategories = async (): Promise<string[] | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      return null;
    }

    if (!data) return [];
    const list = data.map((c: any) => c.name);
    return ['All', ...list.filter((name: string) => name !== 'All')];
  } catch (err) {
    console.error('Failed to fetch categories from Supabase:', err);
    return null;
  }
};

// Add Category to Cloud
export const addCloudCategory = async (categoryName: string): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('categories').insert([{ name: categoryName }]);
    if (error) {
      console.error('Error adding category to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to add category to Supabase:', err);
    return false;
  }
};

// Delete Category from Cloud
export const deleteCloudCategory = async (categoryName: string): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('categories').delete().eq('name', categoryName);
    if (error) {
      console.error('Error deleting category from Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete category from Supabase:', err);
    return false;
  }
};
