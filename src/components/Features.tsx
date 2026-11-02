import React from 'react';
import { Sparkles, ShieldCheck, Truck, Gift } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Certified Austrian Crystals',
      description: 'Precision-cut Swarovski elements with unmatched multi-faceted fire and eternal clarity.'
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Tarnish Polish',
      description: 'Advanced micron plating engineered for long-lasting brilliance and hypoallergenic comfort.'
    },
    {
      icon: Truck,
      title: 'Pan-India Express Shipping',
      description: 'Dispatched in shock-proof secure tamper packaging with live SMS/WhatsApp tracking.'
    },
    {
      icon: Gift,
      title: 'Bespoke Velvet Packaging',
      description: 'Every piece arrives in signature royal velvet casings, ready for unforgettable gifting.'
    }
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#FFFDF9] border-y border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#D5C7B3] flex items-center justify-center text-[#B8860B] shadow-sm">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#141416]">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
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
