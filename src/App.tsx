import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { AdminPanel } from './components/AdminPanel';
import { InstagramSection } from './components/InstagramSection';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Product, StoreSettings } from './types';
import { INITIAL_PRODUCTS, DEFAULT_STORE_SETTINGS, DEFAULT_CATEGORIES } from './data/initialProducts';
import { Sparkles, SlidersHorizontal, Heart, X, MessageCircle, Phone, Grid, ShoppingBag } from 'lucide-react';

export default function App() {
  // Categories State (Dynamic with LocalStorage persistence)
  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alora_categories_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading categories', e);
    }
    return DEFAULT_CATEGORIES;
  });

  // Products State (Loaded from localStorage or initial)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('alora_products_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Settings State (Loaded from localStorage or initial with updated PIN 'aashi12345')
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('alora_settings_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STORE_SETTINGS, ...parsed, adminPin: parsed.adminPin || 'aashi12345' };
      }
    } catch (e) {
      console.error('Error loading settings from local storage', e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alora_wishlist_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist', e);
    }
    return [];
  });

  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Modals State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // Sync categories
  useEffect(() => {
    try {
      localStorage.setItem('alora_categories_v3', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  // Sync products
  useEffect(() => {
    try {
      localStorage.setItem('alora_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  // Sync settings
  useEffect(() => {
    try {
      localStorage.setItem('alora_settings_v3', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [settings]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('alora_wishlist_v3', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Wishlist Toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => 
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Category Management Handlers
  const handleAddCategory = (newCat: string) => {
    if (!categories.includes(newCat)) {
      setCategories((prev) => [...prev, newCat]);
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (catToDelete === 'All') return;
    setCategories((prev) => prev.filter((c) => c !== catToDelete));
    if (selectedCategory === catToDelete) {
      setSelectedCategory('All');
    }
  };

  // Product CRUD
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
  };

  const handleImportCatalog = (imported: Product[]) => {
    setProducts(imported);
  };

  // Filtered Products Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorted Products Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Quick WhatsApp message URL
  const whatsappConsultUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Hi Ayushi! 👑 I'm visiting Alora online and would love to place a custom order or inquire about your collection."
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141416] flex flex-col font-sans pb-16 sm:pb-0">
      
      {/* Navigation with Unified Category Bar */}
      <Navbar
        settings={settings}
        wishlistCount={wishlist.length}
        categories={categories}
        selectedCategory={selectedCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
      />

      {/* Hero Showcase Banner */}
      <Hero
        settings={settings}
        onExplore={(category) => {
          if (category) setSelectedCategory(category);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="max-w-7xl w-full mx-auto px-3 sm:px-8 py-8 sm:py-14 space-y-6 flex-1">
        
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#EADFCF] pb-4">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#141416]">
              {selectedCategory === 'All' ? 'Curated Branded & Jewellery Collection' : selectedCategory}
            </h2>
            <p className="text-xs text-gray-500">
              Showing {sortedProducts.length} royal pieces • Direct WhatsApp Orders: +91 9667779443
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between md:justify-end space-x-2 text-xs pt-1 md:pt-0">
            <div className="flex items-center space-x-1 text-gray-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#D5C7B3] rounded-xl px-3 py-1.5 text-xs text-[#141416] font-semibold focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 2-COLUMN ON MOBILE, 3 ON TABLET, 4 ON DESKTOP */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 bg-white rounded-3xl border border-[#EADFCF] p-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#141416]">No items found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any products in this category. You can add items in the Admin Portal!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#141416] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#141416] transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

      </section>

      {/* Brand Values / Features (100% Authenticated Branded, Money Back Guaranteed, etc.) */}
      <Features />

      {/* Instagram Community Section */}
      <InstagramSection settings={settings} />

      {/* Footer */}
      <Footer
        settings={settings}
        categories={categories}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        settings={settings}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={toggleWishlist}
      />

      {/* Ayushi's Admin Panel Modal with Dynamic Category Manager */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        settings={settings}
        categories={categories}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        onResetCatalog={handleResetCatalog}
        onImportCatalog={handleImportCatalog}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* STICKY BOTTOM MOBILE QUICK CONTACT BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EADFCF] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase font-bold text-[#B8860B] tracking-wider">Ayushi's Direct Helpline</p>
          <a href="tel:+919667779443" className="text-xs font-bold text-[#141416] font-mono flex items-center space-x-1">
            <Phone className="w-3 h-3 text-[#B8860B]" />
            <span>+91 9667779443</span>
          </a>
        </div>

        <a
          href={whatsappConsultUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md flex-shrink-0 hover:brightness-105"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Wishlist Drawer */}
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="bg-[#FFFDF9] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#EADFCF]">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <h3 className="font-serif text-lg font-bold text-[#141416]">
                    Your Wishlist ({wishlistedProducts.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsWishlistDrawerOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[65vh] pr-1">
                {wishlistedProducts.length > 0 ? (
                  wishlistedProducts.map((item) => (
                    <div key={item.id} className="p-3 bg-white rounded-2xl border border-[#EADFCF] flex items-center justify-between gap-3 shadow-sm">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#EADFCF]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#141416] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-[#141416]">
                          {settings.currencySymbol}{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <a
                          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                            `Hi Ayushi! 👑 I wishlisted *${item.name}* (${settings.currencySymbol}${item.price}). Can I order this piece?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#25D366] text-white rounded-lg shadow-sm hover:brightness-110"
                          title="Order on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 rounded-lg"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs">
                    Your wishlist is empty. Tap the heart on any piece to save it!
                  </div>
                )}
              </div>
            </div>

            {wishlistedProducts.length > 0 && (
              <div className="pt-4 border-t border-[#EADFCF]">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Ayushi! 👑 Here are the items in my Alora wishlist: ${wishlistedProducts.map(p => p.name).join(', ')}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#141416] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#25D366] hover:text-white transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order All via WhatsApp</span>
                </a>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
