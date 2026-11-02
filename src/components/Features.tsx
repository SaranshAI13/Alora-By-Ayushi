import React from 'react';
import { Crown, ShieldCheck, Gift, Truck, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      emoji: '👑',
      icon: Crown,
      title: '100% Authenticated Branded',
      description: 'Every designer dress, luxury handbag, and jewellery piece is 100% verified, original & handpicked by Ayushi.'
    },
    {
      emoji: '💎',
      icon: ShieldCheck,
      title: 'Money Back Guaranteed',
      description: 'Shop with royal confidence. Transparent quality benchmarks with full money-back guarantee on authenticity.'
    },
    {
      emoji: '🎁',
      icon: Gift,
      title: 'Original & Custom Gift Packaging',
      description: 'Every order arrives in bespoke luxury royal casings, satin ribbons & personalized handwritten gift cards.'
    },
    {
      emoji: '🚀',
      icon: Truck,
      title: 'Pan-India Express Delivery',
      description: 'Priority courier dispatch with tamper-proof packaging and live WhatsApp order updates on +91 9667779443.'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#FFFDF9] border-y border-[#EADFCF] relative overflow-hidden">
      {/* Subtle royal background glow */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Royal Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#FAF7F2] border border-[#D5C7B3] px-3.5 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#B8860B]">
              The Alora Royal Promise 👑
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141416]">
            Excellence & Authentic Luxury in Every Detail
          </h2>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#FAF7F2]/80 hover:bg-white p-6 rounded-3xl border border-[#EADFCF] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl space-y-3 text-center sm:text-left group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#D5C7B3] group-hover:border-[#D4AF37] flex items-center justify-center text-2xl shadow-sm mx-auto sm:mx-0 group-hover:scale-110 transition-transform">
                  <span>{item.emoji}</span>
                </div>
                
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#141416] group-hover:text-[#AA771C] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
