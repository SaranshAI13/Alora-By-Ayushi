import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gift, MessageCircle } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroProps {
  settings: StoreSettings;
  onExplore: (category?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE1] to-[#FAF7F2] border-b border-[#EADFCF]">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#E8B4B8]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#D5C7B3] px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#B8860B]">
                Curated Luxury By Ayushi
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#141416] tracking-tight leading-[1.15]">
              Timeless Radiance, <br className="hidden sm:inline" />
              <span className="font-cormorant italic font-normal text-[#AA771C]">
                Swarovski Crystals
              </span>{' '}
              & Haute Couture
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Indulge in certified Austrian Swarovski jewelry, designer dresses, and boutique statement accessories. 
              Handcrafted for contemporary women who deserve to sparkle unconditionally.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onExplore('Swarovski Jewellery')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#141416] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-[#141416] transition-all shadow-md flex items-center justify-center space-x-2 group"
              >
                <span>Shop Swarovski</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I%20want%20to%20explore%20your%20latest%20Swarovski%20and%20fashion%20collection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/90 border border-[#D5C7B3] text-[#141416] text-xs font-semibold uppercase tracking-widest rounded-full hover:border-[#25D366] hover:text-[#25D366] transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Custom Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Micro Value Props */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#EADFCF]/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-1">
                <span className="font-serif text-lg font-bold text-[#141416]">100%</span>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Certified Swarovski Elements</p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-lg font-bold text-[#141416]">Pan-India</span>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Express Delivery with Tracking</p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-lg font-bold text-[#141416]">Bespoke</span>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">Luxury Velvet Gift Box Included</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Editorial Magazine Showcase) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Outer Glow Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
                  alt="Alora Swarovski Pendant"
                  className="w-full h-[460px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge on Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#EADFCF] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">
                      Signature Drop
                    </span>
                    <h2 className="font-serif text-sm font-bold text-[#141416]">
                      Austrian Starlight Solitaire
                    </h2>
                    <span className="text-xs font-semibold text-[#141416]">
                      ₹1,899 <span className="text-gray-400 line-through text-[11px]">₹2,899</span>
                    </span>
                  </div>
                  <button
                    onClick={() => onExplore('Swarovski Jewellery')}
                    className="p-2.5 bg-[#141416] text-white rounded-full hover:bg-[#D4AF37] hover:text-[#141416] transition-colors"
                    aria-label="View Product"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Instagram Accent Pill */}
              <div className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-3 border border-[#EADFCF] hidden sm:flex items-center space-x-2 animate-float">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  ✨
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500">Instagram Shop</p>
                  <p className="text-xs font-bold text-[#141416]">@alora_by_ayushi_</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
