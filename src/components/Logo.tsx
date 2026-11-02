import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showBadge = true,
  theme = 'light' 
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center space-x-3 group">
      {/* Illuminated Circular Sign Badge */}
      {showBadge && (
        <div className={`relative rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 ring-2 ring-[#D4AF37]/40 ring-offset-1 ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-11 h-11 sm:w-12 sm:h-12'
        }`}>
          <img
            src="/alora-logo-circle.png"
            alt="Alora by Ayushi Official Logo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle Golden Shimmer Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-amber-200/20 pointer-events-none rounded-full"></div>
        </div>
      )}

      {/* Typography Unit */}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center space-x-1">
          <span className={`font-serif font-extrabold tracking-[0.22em] transition-colors ${
            isDark ? 'text-white' : 'text-[#141416] group-hover:text-[#AA771C]'
          } ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-2xl'
          }`}>
            ALORA
          </span>
          <span className="text-[#D4AF37] text-xs animate-pulse">✦</span>
        </div>

        {/* Script subtitle flanked by delicate gold rules with diamonds */}
        <div className="flex items-center space-x-1.5 -mt-1">
          <div className="h-[1px] w-2.5 bg-[#D4AF37]/60"></div>
          <span className="font-cormorant italic text-xs sm:text-sm tracking-wider font-semibold text-[#B8860B]">
            by Ayushi
          </span>
          <div className="h-[1px] w-2.5 bg-[#D4AF37]/60"></div>
        </div>
      </div>
    </div>
  );
};
