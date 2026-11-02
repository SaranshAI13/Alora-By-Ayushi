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
    <div className="flex items-center space-x-2 sm:space-x-3 group select-none">
      {/* Illuminated Circular Sign Badge */}
      {showBadge && (
        <div className={`relative rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 ring-2 ring-[#D4AF37]/50 ring-offset-1 flex-shrink-0 ${
          size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14 sm:w-20 sm:h-20' : 'w-9 h-9 sm:w-12 sm:h-12'
        }`}>
          <img
            src="./alora-logo-circle.png"
            alt="Alora by Ayushi Official Logo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.endsWith('/alora-logo-circle.png')) {
                target.src = '/alora-logo-circle.png';
              }
            }}
          />
          {/* Subtle Golden Shimmer Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-amber-200/20 pointer-events-none rounded-full"></div>
        </div>
      )}

      {/* Typography Unit */}
      <div className="flex flex-col justify-center text-left min-w-0">
        <div className="flex items-center space-x-1">
          <span className={`font-serif font-extrabold tracking-[0.18em] sm:tracking-[0.22em] transition-colors ${
            isDark ? 'text-white' : 'text-[#141416] group-hover:text-[#AA771C]'
          } ${
            size === 'sm' ? 'text-base sm:text-lg' : size === 'lg' ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-2xl'
          }`}>
            ALORA
          </span>
          <span className="text-[#D4AF37] text-[10px] sm:text-xs animate-pulse">✦</span>
        </div>

        {/* Script subtitle flanked by delicate gold rules with diamonds */}
        <div className="flex items-center space-x-1 -mt-1 sm:-mt-1.5">
          <div className="h-[1px] w-2 sm:w-2.5 bg-[#D4AF37]/60"></div>
          <span className="font-cormorant italic text-[11px] sm:text-sm tracking-wider font-semibold text-[#B8860B] whitespace-nowrap">
            by Ayushi
          </span>
          <div className="h-[1px] w-2 sm:w-2.5 bg-[#D4AF37]/60"></div>
        </div>
      </div>
    </div>
  );
};
