import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { AdminPanel } from './components/AdminPanel';
import { InstagramSection } from './components/InstagramSection';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Product, StoreSettings, Category } from './types';
import { INITIAL_PRODUCTS, DEFAULT_STORE_SETTINGS } from './data/initialProducts';
import { Sparkles, SlidersHorizontal, Heart, X, MessageCircle } from 'lucide-react';

export default function App() {
  // Products State (Loaded from localStorage or initial)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('alora_products_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('alora_settings_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading settings from local storage', e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alora_wishlist_v1');
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

  // Sync products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('alora_products_v1', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Sync settings
  useEffect(() => {
    try {
      localStorage.setItem('alora_settings_v1', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('alora_wishlist_v1', JSON.stringify(wishlist));
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

  const categoriesList = [
    'All',
    'Swarovski Jewellery',
    'Necklaces & Chokers',
    'Earrings & Jhumkas',
    'Bracelets & Bangles',
    'Rings',
    'Designer Clothing',
    'Bags & Accessories',
    'Gifting & Combos'
  ];

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141416] flex flex-col font-sans">
      
      {/* Navigation */}
      <Navbar
        settings={settings}
        wishlistCount={wishlist.length}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
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
      <section id="catalog-section" className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-8 flex-1">
        
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EADFCF] pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8860B] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Boutique Catalog</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              {selectedCategory === 'All' ? 'Signature Collection' : selectedCategory}
            </h2>
            <p className="text-xs text-gray-500">
              Showing {sortedProducts.length} handcrafted pieces • Tap WhatsApp to order directly
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500 font-medium">Sort by:</span>
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

        {/* Category Pills (Quick Switcher) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#141416] text-[#FAF7F2]'
                  : 'bg-white border border-[#EADFCF] text-gray-700 hover:border-[#D4AF37] hover:text-[#141416]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              We couldn't find any products matching your filters. Try switching category or resetting search.
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

      {/* Brand Values / Features */}
      <Features />

      {/* Instagram Community Section */}
      <InstagramSection settings={settings} />

      {/* Footer */}
      <Footer
        settings={settings}
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

      {/* Ayushi's Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        settings={settings}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        onResetCatalog={handleResetCatalog}
        onImportCatalog={handleImportCatalog}
      />

      {/* Wishlist Drawer */}
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="bg-[#FFFDF9] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#EADFCF]">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4 mb-4">
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

              {/* Items List */}
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
                          href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I%20wishlisted%20*${encodeURIComponent(item.name)}*%20(${settings.currencySymbol}${item.price}).%20Can%20I%20order?`}
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

            {/* Bottom Actions */}
            {wishlistedProducts.length > 0 && (
              <div className="pt-4 border-t border-[#EADFCF]">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20Here%20are%20the%20items%20in%20my%20Alora%20wishlist:%20${encodeURIComponent(wishlistedProducts.map(p => p.name).join(', '))}`}
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
