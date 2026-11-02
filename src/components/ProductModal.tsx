import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Heart, Check, ShieldCheck, Truck, RotateCcw, Share2 } from 'lucide-react';
import { Product, StoreSettings } from '../types';

interface ProductModalProps {
  product: Product | null;
  settings: StoreSettings;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  settings,
  isWishlisted,
  onClose,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const whatsappOrderMessage = encodeURIComponent(
    `Hi Ayushi! ✨ I want to order this piece from Alora:\n\n*Product:* ${product.name}\n*Price:* ${settings.currencySymbol}${product.price.toLocaleString('en-IN')}\n*Category:* ${product.category}\n\nPlease confirm availability and payment details.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappOrderMessage}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative bg-[#FFFDF9] rounded-3xl border border-[#EADFCF] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Gallery Section */}
        <div className="md:w-1/2 p-6 bg-[#FAF7F2] flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EADFCF] shadow-inner">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {product.tag && (
              <span className="absolute top-3 left-3 bg-[#141416] text-[#E5C492] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails (if multiple images) */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            
            {/* Category & Status */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="uppercase tracking-widest font-semibold text-[#B8860B]">{product.category}</span>
              <span className={`font-semibold px-2.5 py-0.5 rounded-full text-[10px] ${
                product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {product.inStock ? 'In Stock (Ready to Dispatch)' : 'Sold Out'}
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141416] leading-tight">
              {product.name}
            </h2>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADFCF]">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#141416]">
                {settings.currencySymbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {settings.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#141416] tracking-wider uppercase">Description</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material Specification */}
            {product.material && (
              <div className="p-3 bg-white rounded-xl border border-[#EADFCF] text-xs space-y-1">
                <span className="font-bold text-[#141416] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Materials & Craftsmanship:</span>
                </span>
                <p className="text-gray-600 pl-5">{product.material}</p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-600">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Certified Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>All India Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="space-y-3 pt-4 border-t border-[#EADFCF]">
            <div className="flex gap-3">
              <a
                href={product.inStock ? whatsappUrl : undefined}
                target={product.inStock ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!product.inStock) {
                    e.preventDefault();
                    alert('Item is sold out! Message Ayushi on Instagram for waitlist.');
                  }
                }}
                className={`flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all ${
                  product.inStock
                    ? 'bg-[#141416] text-[#FAF7F2] hover:bg-[#25D366] hover:text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>{product.inStock ? 'Order Directly on WhatsApp' : 'Currently Sold Out'}</span>
              </a>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-500'
                    : 'bg-white border-[#EADFCF] text-gray-700 hover:text-rose-500'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-2xl border border-[#EADFCF] bg-white text-gray-700 hover:text-[#D4AF37] transition-all"
                title="Share link"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-[11px] text-center text-gray-400">
              💬 Instant confirmation with Ayushi directly on WhatsApp
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
