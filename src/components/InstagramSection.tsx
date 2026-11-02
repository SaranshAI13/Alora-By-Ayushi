import React from 'react';
import { Instagram, Sparkles, Heart, ExternalLink } from 'lucide-react';
import { StoreSettings } from '../types';

interface InstagramSectionProps {
  settings: StoreSettings;
}

const INSTAGRAM_MOCKS = [
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000',
    caption: 'Crystal light reflections that turn heads. Austrian Swarovski Solitaire drop ✨',
    likes: 428
  },
  {
    image: 'https://images.unsplash.com/photo-1611591475152-4783113960d9?q=80&w=1000',
    caption: 'Emerald luxury tennis bracelet. Styled for gala nights 💚',
    likes: 512
  },
  {
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000',
    caption: 'Pure silk evening aesthetics. Designed for modern royalty 🥂',
    likes: 689
  },
  {
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000',
    caption: 'Cascading diamond chandelier drops. Feather-light glamour 💎',
    likes: 384
  }
];

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B8860B] bg-white border border-[#D5C7B3] px-3.5 py-1.5 rounded-full shadow-sm">
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>As Seen On Instagram</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
            Join The Alora Community
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-600">
            Follow our daily reels, customer unboxings, and new jewelry drops on{' '}
            <strong className="text-black font-semibold">@{settings.instagramHandle}</strong>
          </p>
        </div>

        {/* 4-Column Instagram Aesthetic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_MOCKS.map((post, idx) => (
            <a
              key={idx}
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#EADFCF] bg-white"
            >
              <img
                src={post.image}
                alt="Alora Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <p className="text-[11px] line-clamp-2 text-gray-200 mb-2 leading-relaxed font-normal">
                    {post.caption}
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-semibold text-[#E8B4B8]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:brightness-110 transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @{settings.instagramHandle} On Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
