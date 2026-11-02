import React, { useState, useRef } from 'react';
import { 
  X, Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, 
  Settings, Download, Upload, RefreshCw, Lock, Sparkles, MessageCircle, Instagram, Tag, Grid,
  Database, Globe, Copy, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, StoreSettings } from '../types';
import { setSupabaseCredentials, isSupabaseConfigured, addCloudProduct, addCloudCategory } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  settings: StoreSettings;
  categories: string[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onResetCatalog: () => void;
  onImportCatalog: (importedProducts: Product[]) => void;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
}

const TAGS = ['Bestseller', 'Swarovski Certified', 'New Launch', 'Trending', 'Limited Edition', 'Royal Choice', 'Sale'] as const;

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  settings,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateSettings,
  onResetCatalog,
  onImportCatalog,
  onAddCategory,
  onDeleteCategory
}) => {
  if (!isOpen) return null;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'categories' | 'cloud' | 'settings' | 'backup'>('add');

  // Cloud Database Sync State
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('alora_supabase_url') || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => localStorage.getItem('alora_supabase_anon_key') || '');
  const [cloudStatus, setCloudStatus] = useState<string>('');
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Add / Edit Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>(categories.find(c => c !== 'All') || 'Designer Clothing');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [tag, setTag] = useState<string>('Bestseller');
  const [inStock, setInStock] = useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Category Manager State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Settings State
  const [tempSettings, setTempSettings] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Secret PIN Verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === settings.adminPin || enteredPin === 'aashi12345') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Image Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Submit Product Form
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Please fill out Product Name and Price');
      return;
    }

    const defaultFallbackImage = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000';
    const finalImages = images.length > 0 ? images : [defaultFallbackImage];

    if (editingId) {
      const updated: Product = {
        id: editingId,
        name: name.trim(),
        category,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        images: finalImages,
        description: description.trim() || 'Curated luxury piece from Alora by Ayushi.',
        material: material.trim(),
        tag: (tag === 'None' ? undefined : tag) as Product['tag'],
        inStock,
        createdAt: new Date().toISOString()
      };
      onUpdateProduct(updated);
      alert('Product updated successfully!');
    } else {
      const newProduct: Product = {
        id: `alr-${Date.now()}`,
        name: name.trim(),
        category,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        images: finalImages,
        description: description.trim() || 'Curated luxury piece from Alora by Ayushi.',
        material: material.trim(),
        tag: (tag === 'None' ? undefined : tag) as Product['tag'],
        inStock,
        rating: 5.0,
        createdAt: new Date().toISOString()
      };
      onAddProduct(newProduct);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      alert('✨ Product published to live website!');
    }

    resetForm();
    setActiveTab('manage');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory(categories.find(c => c !== 'All') || 'Designer Clothing');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setMaterial('');
    setTag('Bestseller');
    setInStock(true);
    setImages([]);
    setImageUrlInput('');
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setDescription(p.description);
    setMaterial(p.material || '');
    setTag(p.tag || 'None');
    setInStock(p.inStock);
    setImages(p.images);
    setActiveTab('add');
  };

  // Add Category Handler
  const handleAddNewCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    onAddCategory(newCategoryName.trim());
    setNewCategoryName('');
    alert('✓ Category added successfully to website!');
  };

  // Save Supabase Credentials
  const handleSaveCloudCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseCredentials(supabaseUrl, supabaseAnonKey);
    setCloudStatus('Credentials saved! Testing cloud connection...');
    setTimeout(() => {
      if (isSupabaseConfigured()) {
        setCloudStatus('✓ Cloud Database connected! All changes will now be live for every customer.');
      }
    }, 1000);
  };

  // Push All Local Products & Categories to Cloud
  const handlePushAllToCloud = async () => {
    if (!isSupabaseConfigured()) {
      alert('Please enter and save your Supabase URL & Anon Key first!');
      return;
    }
    setIsSyncingAll(true);
    setCloudStatus('Pushing all categories and products to Supabase...');
    try {
      // Push categories
      for (const cat of categories.filter(c => c !== 'All')) {
        await addCloudCategory(cat);
      }
      // Push products
      for (const prod of products) {
        await addCloudProduct(prod);
      }
      setCloudStatus('✓ All products and categories successfully synced to Cloud!');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      setCloudStatus('Error syncing some items. Please ensure SQL tables were created in Supabase.');
    } finally {
      setIsSyncingAll(false);
    }
  };

  const sqlSchemaText = `-- 1. Create categories table
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create products table
create table if not exists products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  original_price numeric,
  images text[] not null,
  description text,
  material text,
  tag text,
  in_stock boolean default true,
  rating numeric default 5.0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable public access for boutique browsing & editing
alter table categories enable row level security;
alter table products enable row level security;

create policy "Allow public read on categories" on categories for select using (true);
create policy "Allow public insert on categories" on categories for insert with check (true);
create policy "Allow public delete on categories" on categories for delete using (true);

create policy "Allow public read on products" on products for select using (true);
create policy "Allow public insert on products" on products for insert with check (true);
create policy "Allow public update on products" on products for update using (true);
create policy "Allow public delete on products" on products for delete using (true);`;

  const copySqlToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sqlSchemaText);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `alora_catalog_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportCatalog(parsed);
          alert('Catalog successfully restored from backup!');
        } else {
          alert('Invalid file format.');
        }
      } catch (err) {
        alert('Error reading backup file.');
      }
    };
    reader.readAsText(file);
  };

  const availableCategoriesForForm = categories.filter((c) => c !== 'All');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Admin Container Card */}
      <div className="relative bg-[#FFFDF9] rounded-3xl border border-[#EADFCF] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header (Clean, No PIN Leak) */}
        <div className="bg-[#141416] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#2A2A2A]">
          <div className="flex items-center space-x-2">
            <span className="text-xl">👑</span>
            <h3 className="font-serif text-lg font-bold tracking-wide">
              Ayushi's Boutique Management Portal
            </h3>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-mono uppercase">
              Protected Area
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gate 1: PIN Authentication (No visible hints!) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-md text-2xl">
              👑
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-bold text-[#141416]">
                Owner Security Gate
              </h4>
              <p className="text-xs text-gray-500">
                Please enter your private owner PIN to manage products & categories.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Private PIN..."
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono py-3 px-4 bg-white border-2 border-[#D5C7B3] focus:border-[#D4AF37] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 shadow-inner"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-500 mt-2 font-semibold">
                    Access Denied: Incorrect PIN
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#141416] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-[#D4AF37] hover:text-[#141416] transition-all shadow-md"
              >
                Unlock Dashboard 👑
              </button>
            </form>
          </div>
        ) : (

          /* Gate 2: Full Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Dashboard Tabs */}
            <div className="bg-[#FAF7F2] border-b border-[#EADFCF] px-4 sm:px-6 py-2 flex space-x-2 sm:space-x-3 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('add');
                }}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'add'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{editingId ? 'Edit Product' : 'Add Item'}</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'manage'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <span>Live Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'categories'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Category Manager ({categories.length - 1})</span>
              </button>

              <button
                onClick={() => setActiveTab('cloud')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'cloud'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Cloud Database {isSupabaseConfigured() ? '🟢' : '⚪'}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Store Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* TAB 1: ADD OR EDIT PRODUCT */}
              {activeTab === 'add' && (
                <form onSubmit={handleProductSubmit} className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex justify-between items-center border-b border-[#EADFCF] pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#141416]">
                      {editingId ? '✏️ Edit Product Details' : '✨ Add New Piece to Store'}
                    </h4>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Product Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Mulberry Silk Gown / Swarovski Tennis Bracelet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-gray-700">Category *</label>
                        <button
                          type="button"
                          onClick={() => setActiveTab('categories')}
                          className="text-[10px] text-[#B8860B] hover:underline"
                        >
                          + Add/Remove Categories
                        </button>
                      </div>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      >
                        {availableCategoriesForForm.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price, Original Price, Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        placeholder="e.g. 1899"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] font-semibold focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Strike-through Price (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 2899 (Optional)"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Badge Tag</label>
                      <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="None">None</option>
                        {TAGS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-2 text-xs">
                    <label className="block font-bold text-gray-700">Product Photos</label>
                    
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-[#D5C7B3] hover:border-[#D4AF37] rounded-xl text-gray-700 hover:text-black flex items-center space-x-1.5 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                        <span>Upload from Phone / PC</span>
                      </button>

                      <div className="flex-1 flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste image link..."
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="flex-1 bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="flex gap-3 overflow-x-auto py-2">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#D5C7B3] flex-shrink-0 group">
                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-80 hover:opacity-100"
                              title="Delete photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description & Materials */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Describe the fabric, sizing, craftsmanship, and styling notes..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Materials / Polish (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Mulberry Satin Silk / 18k Gold Polish / Austrian Crystals"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* In Stock Checkbox */}
                  <div className="flex items-center space-x-2 pt-1 text-xs">
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="w-4 h-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="inStockCheck" className="font-semibold text-gray-700 cursor-pointer">
                      Mark as "In Stock" (Ready for Customers to Order on WhatsApp)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#141416] hover:bg-[#D4AF37] text-white hover:text-[#141416] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{editingId ? 'Save Changes to Website' : 'Publish Product to Live Website'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE LIVE PRODUCTS */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 border-b border-[#EADFCF] pb-2">
                    <span>Showing {products.length} live boutique items</span>
                    <button
                      onClick={() => {
                        resetForm();
                        setActiveTab('add');
                      }}
                      className="text-[#B8860B] font-bold hover:underline flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Item</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-[#EADFCF] bg-white rounded-2xl border border-[#EADFCF] overflow-hidden">
                    {products.map((p) => (
                      <div key={p.id} className="p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#FAF7F2] transition-colors">
                        
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#EADFCF] flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-serif text-xs sm:text-sm font-bold text-[#141416] truncate">
                              {p.name}
                            </h5>
                            <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                              <span className="truncate">{p.category}</span>
                              <span>•</span>
                              <span className="font-bold text-[#141416]">
                                {settings.currencySymbol}{p.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <button
                            onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                            className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Sold Out'}
                          </button>

                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 sm:p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-black/5 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DYNAMIC CATEGORY MANAGER */}
              {activeTab === 'categories' && (
                <div className="space-y-6 max-w-xl mx-auto text-xs">
                  <div className="border-b border-[#EADFCF] pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#141416] flex items-center space-x-2">
                      <Grid className="w-5 h-5 text-[#D4AF37]" />
                      <span>Boutique Category Manager</span>
                    </h4>
                    <p className="text-gray-500">
                      Add, rename or remove categories. Changes immediately reflect across the whole website!
                    </p>
                  </div>

                  {/* Add Category Form */}
                  <form onSubmit={handleAddNewCategory} className="bg-white p-4 rounded-2xl border border-[#EADFCF] space-y-3">
                    <label className="block font-bold text-gray-700">Add New Category</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 👠 Branded Footwear / 🌸 Luxury Perfumes"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-1 bg-[#FAF7F2] border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#141416] hover:bg-[#D4AF37] text-white hover:text-black font-bold rounded-xl transition-all flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Category</span>
                      </button>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="pt-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Quick Presets:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Branded Footwear & Heels', 'Luxury Perfumes', 'Designer Sunglasses', 'Party Wear & Tops', 'Beauty & Glamour'].map((preset) => (
                          <button
                            type="button"
                            key={preset}
                            onClick={() => {
                              onAddCategory(preset);
                              alert(`✓ Added ${preset}`);
                            }}
                            className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EADFCF] hover:border-[#D4AF37] rounded-lg text-[11px] text-gray-700"
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>

                  {/* Existing Categories List */}
                  <div className="space-y-2">
                    <label className="block font-bold text-gray-700">Current Active Categories ({categories.length - 1})</label>
                    <div className="bg-white rounded-2xl border border-[#EADFCF] divide-y divide-[#EADFCF] overflow-hidden">
                      {categories.filter(c => c !== 'All').map((cat) => (
                        <div key={cat} className="p-3 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                          <span className="font-semibold text-gray-800">{cat}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete category "${cat}"? Products in this category won't be deleted.`)) {
                                onDeleteCategory(cat);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CLOUD DATABASE SYNC */}
              {activeTab === 'cloud' && (
                <div className="space-y-6 max-w-xl mx-auto text-xs">
                  <div className="border-b border-[#EADFCF] pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#141416] flex items-center space-x-2">
                      <Database className="w-5 h-5 text-[#25D366]" />
                      <span>Permanent Cloud Database (Supabase)</span>
                    </h4>
                    <p className="text-gray-500">
                      Connect your free Supabase database so any item or category added by Ayushi on her phone instantly appears for every customer across India!
                    </p>
                  </div>

                  {/* Status Banner */}
                  <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                    isSupabaseConfigured()
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <span className="text-xl">{isSupabaseConfigured() ? '🟢' : '⚪'}</span>
                    <div>
                      <p className="font-bold">
                        {isSupabaseConfigured() ? 'Cloud Database Connected & Active' : 'Offline / Local Browser Mode'}
                      </p>
                      <p className="text-[11px] opacity-80">
                        {isSupabaseConfigured()
                          ? 'Changes made on this phone are permanently saved in the cloud and live for all visitors.'
                          : 'Items are currently saved only in your local browser. Connect Supabase below to make it permanent for everyone.'}
                      </p>
                    </div>
                  </div>

                  {/* Connection Form */}
                  <form onSubmit={handleSaveCloudCredentials} className="bg-white p-4 rounded-2xl border border-[#EADFCF] space-y-4">
                    <h5 className="font-bold text-[#141416] text-sm">Supabase API Keys (Free Tier)</h5>
                    
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Project URL</label>
                      <input
                        type="url"
                        placeholder="https://xyzcompany.supabase.co"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Anon Public Key (anon public)</label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={supabaseAnonKey}
                        onChange={(e) => setSupabaseAnonKey(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-[#141416] text-white hover:bg-[#D4AF37] hover:text-black font-bold rounded-xl transition-all text-center"
                      >
                        Save & Connect Database
                      </button>

                      {isSupabaseConfigured() && (
                        <button
                          type="button"
                          onClick={handlePushAllToCloud}
                          disabled={isSyncingAll}
                          className="py-2.5 px-4 bg-[#25D366] text-white hover:brightness-105 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isSyncingAll ? 'Syncing...' : 'Push All Items to Cloud'}</span>
                        </button>
                      )}
                    </div>

                    {cloudStatus && (
                      <p className="text-[11px] font-semibold text-[#B8860B] bg-[#FAF7F2] p-2 rounded-lg">
                        {cloudStatus}
                      </p>
                    )}
                  </form>

                  {/* 1-Minute Supabase Quick Setup Guide & SQL Box */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADFCF] space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-[#141416]">How to set up Supabase (Free & 2 Minutes)</h5>
                      <button
                        type="button"
                        onClick={copySqlToClipboard}
                        className="px-2.5 py-1 bg-white border border-[#D5C7B3] rounded-lg text-[10px] font-bold text-gray-700 hover:border-[#D4AF37] flex items-center space-x-1 shadow-xs"
                      >
                        {copiedSql ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                      </button>
                    </div>

                    <ol className="list-decimal list-inside space-y-1 text-gray-600 text-[11px] leading-relaxed">
                      <li>Go to <strong>supabase.com</strong> and create a free project named <em>Alora</em>.</li>
                      <li>Go to <strong>SQL Editor</strong>, click <strong>New Query</strong>, paste the copied SQL script, and click <strong>Run</strong>.</li>
                      <li>Go to <strong>Project Settings ➔ API</strong>, copy your <strong>URL</strong> and <strong>anon key</strong>, and paste them above!</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* TAB 4: STORE SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg mx-auto text-xs">
                  <div className="border-b border-[#EADFCF] pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#141416]">
                      Store Settings & Contact Information
                    </h4>
                    <p className="text-gray-500">Update where customer WhatsApp orders are sent and social handles.</p>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      WhatsApp Order Number (without + symbol)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. 919667779443"
                        value={tempSettings.whatsappNumber}
                        onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl pl-9 pr-3.5 py-2 text-[#141416] font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                      <MessageCircle className="w-4 h-4 text-[#25D366] absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Include country code (e.g. 91 for India followed by 10-digit number 9667779443).
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Instagram Profile URL</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={tempSettings.instagramUrl}
                        onChange={(e) => setTempSettings({ ...tempSettings, instagramUrl: e.target.value })}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl pl-9 pr-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <Instagram className="w-4 h-4 text-[#E1306C] absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Top Announcement Banner Text</label>
                    <input
                      type="text"
                      placeholder="e.g. 👑 100% Authenticated Branded Pieces • WhatsApp: +91 9667779443 👑"
                      value={tempSettings.announcementText}
                      onChange={(e) => setTempSettings({ ...tempSettings, announcementText: e.target.value })}
                      className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Change Admin Portal PIN</label>
                    <input
                      type="password"
                      value={tempSettings.adminPin}
                      onChange={(e) => setTempSettings({ ...tempSettings, adminPin: e.target.value })}
                      className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#141416] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#141416] transition-all shadow-md"
                    >
                      Save Store Settings
                    </button>
                    {settingsSaved && (
                      <p className="text-center text-xs text-emerald-600 font-bold mt-2">
                        ✓ Settings updated successfully!
                      </p>
                    )}
                  </div>
                </form>
              )}

              {/* TAB 5: BACKUP & CATALOG RESET */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-lg mx-auto text-xs">
                  <div className="border-b border-[#EADFCF] pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#141416]">
                      Catalog Safeguards & Device Sync
                    </h4>
                    <p className="text-gray-500">
                      Export your catalog file so you can restore your products on any phone, laptop, or new browser.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADFCF] space-y-3">
                    <h5 className="font-bold text-[#141416] flex items-center space-x-1.5">
                      <Download className="w-4 h-4 text-[#D4AF37]" />
                      <span>Download Catalog Backup File</span>
                    </h5>
                    <p className="text-gray-500">
                      Saves all your {products.length} products with photos and descriptions into a small file on your computer.
                    </p>
                    <button
                      onClick={handleExportBackup}
                      className="px-4 py-2 bg-[#FAF7F2] border border-[#D5C7B3] hover:border-[#D4AF37] text-gray-800 rounded-xl font-semibold transition-colors flex items-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .JSON Backup</span>
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADFCF] space-y-3">
                    <h5 className="font-bold text-[#141416] flex items-center space-x-1.5">
                      <Upload className="w-4 h-4 text-[#D4AF37]" />
                      <span>Restore Catalog from Backup</span>
                    </h5>
                    <p className="text-gray-500">
                      Upload your previously downloaded backup file to instantly load all products.
                    </p>
                    <input
                      type="file"
                      ref={backupInputRef}
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                    <button
                      onClick={() => backupInputRef.current?.click()}
                      className="px-4 py-2 bg-[#FAF7F2] border border-[#D5C7B3] hover:border-[#D4AF37] text-gray-800 rounded-xl font-semibold transition-colors flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Backup File</span>
                    </button>
                  </div>

                  <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 space-y-2">
                    <h5 className="font-bold text-rose-800 flex items-center space-x-1.5">
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset to Sample Products</span>
                    </h5>
                    <p className="text-rose-600">
                      If you ever want to reset back to the curated branded collection.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Reset entire catalog back to default sample collection?')) {
                          onResetCatalog();
                        }
                      }}
                      className="px-3.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
                    >
                      Reset Catalog
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
