import React from 'react';
import { Heart, MessageCircle, Eye, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { Product, StoreSettings } from '../types';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  isWishlisted,
  onToggleWishlist,
  onQuickView
}) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // WhatsApp order link
  const whatsappOrderMessage = encodeURIComponent(
    `Hi Ayushi! ✨ I would like to order this item from Alora:\n\n*Product:* ${product.name}\n*Price:* ${settings.currencySymbol}${product.price.toLocaleString('en-IN')}\n*Category:* ${product.category}\n\nIs this in stock for delivery?`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappOrderMessage}`;

  return (
    <div className="group relative bg-[#FFFDF9] rounded-2xl border border-[#EADFCF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
              product.tag === 'Bestseller' ? 'bg-[#141416] text-[#E5C492]' :
              product.tag === 'Swarovski Certified' ? 'bg-[#D4AF37] text-white' :
              product.tag === 'New Launch' ? 'bg-[#E8B4B8] text-[#141416]' :
              product.tag === 'Trending' ? 'bg-amber-100 text-amber-900' :
              'bg-gray-900 text-white'
            }`}>
              {product.tag === 'Swarovski Certified' && <Sparkles className="w-2.5 h-2.5 mr-0.5" />}
              <span>{product.tag}</span>
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 z-10 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 scale-110' 
              : 'bg-white/80 text-gray-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 bg-white/95 text-[#141416] text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#D4AF37] hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-[#141416] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            {product.inStock ? (
              <span className="flex items-center text-emerald-600 text-[10px] font-semibold">
                <CheckCircle2 className="w-3 h-3 mr-0.5" /> In Stock
              </span>
            ) : (
              <span className="flex items-center text-rose-500 text-[10px] font-semibold">
                <XCircle className="w-3 h-3 mr-0.5" /> Sold Out
              </span>
            )}
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-sm sm:text-base font-bold text-[#141416] group-hover:text-[#AA771C] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-[#EADFCF]/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-base sm:text-lg font-bold text-[#141416]">
                {settings.currencySymbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {settings.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* 1-Click WhatsApp Order Button */}
          <a
            href={product.inStock ? whatsappUrl : undefined}
            target={product.inStock ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!product.inStock) {
                e.preventDefault();
                alert('This item is currently sold out. You can message Ayushi on Instagram for backorders!');
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
              product.inStock
                ? 'bg-[#141416] text-[#FAF7F2] hover:bg-[#25D366] hover:text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
            <span>Order</span>
          </a>
        </div>

      </div>

    </div>
  );
};
