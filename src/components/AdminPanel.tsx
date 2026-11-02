import React, { useState, useRef } from 'react';
import { 
  X, Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, 
  Settings, Download, Upload, RefreshCw, Lock, Sparkles, MessageCircle, Instagram 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, StoreSettings, Category } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  settings: StoreSettings;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onResetCatalog: () => void;
  onImportCatalog: (importedProducts: Product[]) => void;
}

const CATEGORIES: Category[] = [
  'Swarovski Jewellery',
  'Necklaces & Chokers',
  'Earrings & Jhumkas',
  'Bracelets & Bangles',
  'Rings',
  'Designer Clothing',
  'Bags & Accessories',
  'Gifting & Combos'
];

const TAGS = ['Bestseller', 'Swarovski Certified', 'New Launch', 'Trending', 'Limited Edition', 'Sale'] as const;

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  settings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateSettings,
  onResetCatalog,
  onImportCatalog
}) => {
  if (!isOpen) return null;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'settings' | 'backup'>('add');

  // Add / Edit Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Swarovski Jewellery');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [tag, setTag] = useState<string>('Bestseller');
  const [inStock, setInStock] = useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Settings State
  const [tempSettings, setTempSettings] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // PIN Verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === settings.adminPin || enteredPin === 'alora123') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Image Upload Handler (Converts device file to Base64 data URL)
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
      // Update existing product
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
      // Create new product
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
      alert('✨ Product added to live website!');
    }

    // Reset Form
    resetForm();
    setActiveTab('manage');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Swarovski Jewellery');
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
          alert('Invalid file format. Please upload a valid Alora backup JSON.');
        }
      } catch (err) {
        alert('Error reading backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Admin Container Card */}
      <div className="relative bg-[#FFFDF9] rounded-3xl border border-[#EADFCF] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#141416] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#2A2A2A]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold tracking-wide">
              Ayushi's Boutique Management Portal
            </h3>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-mono uppercase">
              No Coding Needed
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

        {/* Gate 1: PIN Authentication */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-[#D4AF37]" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#141416]">
                Owner Security Gate
              </h4>
              <p className="text-xs text-gray-500">
                Please enter your private owner PIN to manage products & orders. (Default: <strong className="text-black">alora123</strong>)
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter PIN..."
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 bg-white border border-[#D5C7B3] rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium">
                    Incorrect PIN. Try default: alora123
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#141416] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#141416] transition-all shadow-md"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (

          /* Gate 2: Full Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Dashboard Tabs */}
            <div className="bg-[#FAF7F2] border-b border-[#EADFCF] px-6 py-2 flex space-x-2 sm:space-x-4 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('add');
                }}
                className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'add'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{editingId ? 'Edit Product' : 'Add New Item'}</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'manage'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <span>Live Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-1.5 ${
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
                className={`py-2 px-3.5 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'backup'
                    ? 'bg-[#141416] text-[#FAF7F2] shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup & Reset</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: ADD OR EDIT PRODUCT */}
              {activeTab === 'add' && (
                <form onSubmit={handleProductSubmit} className="space-y-5 max-w-2xl mx-auto">
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
                        placeholder="e.g. Swarovski Crystal Butterfly Choker"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      >
                        {CATEGORIES.map((cat) => (
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
                    
                    {/* Device Upload Button */}
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

                      {/* Or image URL input */}
                      <div className="flex-1 flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste image link (Unsplash/Imgur)..."
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="flex-1 bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>

                    {/* Previews */}
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
                        placeholder="Describe the craftsmanship, style notes, and pairing tips..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Materials & Polish (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Certified Swarovski Crystals, Anti-tarnish 18k Rose Gold Plating"
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
                      <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors">
                        
                        {/* Thumbnail & Info */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#EADFCF] flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-serif text-sm font-bold text-[#141416] truncate">
                              {p.name}
                            </h5>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{p.category}</span>
                              <span>•</span>
                              <span className="font-bold text-[#141416]">
                                {settings.currencySymbol}{p.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Toggle & Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Sold Out'}
                          </button>

                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-black/5 rounded-lg transition-colors"
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
                            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

              {/* TAB 3: STORE SETTINGS */}
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
                        placeholder="e.g. 919876543210"
                        value={tempSettings.whatsappNumber}
                        onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                        className="w-full bg-white border border-[#D5C7B3] rounded-xl pl-9 pr-3.5 py-2 text-[#141416] font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                      <MessageCircle className="w-4 h-4 text-[#25D366] absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Include country code (e.g. 91 for India followed by 10-digit number).
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
                      placeholder="e.g. ✨ FREE Luxury Gift Box with all Swarovski orders ✨"
                      value={tempSettings.announcementText}
                      onChange={(e) => setTempSettings({ ...tempSettings, announcementText: e.target.value })}
                      className="w-full bg-white border border-[#D5C7B3] rounded-xl px-3.5 py-2 text-[#141416] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Change Admin Portal PIN</label>
                    <input
                      type="text"
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

              {/* TAB 4: BACKUP & CATALOG RESET */}
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
                      If you ever want to reset back to the curated Swarovski and clothing demo items.
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
