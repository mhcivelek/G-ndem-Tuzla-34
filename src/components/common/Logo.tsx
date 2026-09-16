import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubline = false 
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.35 : 1;
  const height = size === 'sm' ? 36 : size === 'lg' ? 64 : 46;

  return (
    <div className={`flex items-center gap-2 select-none ${className}`} title="Gündem Tuzla 34 Haber Portalı">
      {/* Precision SVG Brandmark corresponding to the official logo */}
      <svg
        height={height}
        viewBox="0 0 380 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto max-w-full drop-shadow-sm transition-transform hover:scale-[1.02]"
        aria-label="Gündem Tuzla 34 Logo"
      >
        <defs>
          <linearGradient id="gt34-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3b66" />
            <stop offset="50%" stopColor="#002855" />
            <stop offset="100%" stopColor="#001845" />
          </linearGradient>

          <linearGradient id="gt34-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e63946" />
            <stop offset="50%" stopColor="#d90429" />
            <stop offset="100%" stopColor="#9b0018" />
          </linearGradient>

          <linearGradient id="gt34-metal-red" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>

          <filter id="gt34-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- LEFT CIRCULAR EMBLEM: WAVES & LIGHTHOUSE & SEAGULLS --- */}
        <g transform="translate(4, 2)">
          {/* Circular outer wave swoosh */}
          <path
            d="M 50 10 A 38 38 0 1 0 88 48 C 88 38 82 28 72 20 C 64 26 56 32 46 36 C 36 40 28 44 24 50 C 20 56 22 66 28 72 C 34 78 44 80 54 78 C 66 76 76 68 82 58 C 86 70 76 84 60 88 C 40 92 20 84 12 68 C 4 52 8 32 20 18 C 30 8 42 4 50 10 Z"
            fill="url(#gt34-blue-grad)"
          />

          {/* Lighthouse base & rock */}
          <path
            d="M 28 66 C 34 64 42 63 50 63 C 58 63 66 64 70 66 L 68 70 C 60 68 40 68 30 70 Z"
            fill="#001845"
          />

          {/* Sea waves under lighthouse */}
          <path
            d="M 26 73 Q 36 69 46 73 T 66 73 T 82 73"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 22 79 Q 34 75 46 79 T 72 79 T 86 79"
            stroke="#0d3b66"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lighthouse tower silhouette */}
          <path
            d="M 44 63 L 46 34 L 54 34 L 56 63 Z"
            fill="#001845"
          />
          {/* Light room & gallery top */}
          <rect x="44.5" y="28" width="11" height="6" rx="1" fill="#001845" />
          <polygon points="43,28 57,28 50,18" fill="#001845" />
          <circle cx="50" cy="17" r="1.5" fill="#001845" />

          {/* Light beam from lantern */}
          <polygon points="52,30 82,18 84,24 52,32" fill="#ffdd00" opacity="0.45" />

          {/* White stripes on lighthouse */}
          <rect x="46" y="38" width="8" height="4" fill="#ffffff" />
          <rect x="45.5" y="47" width="9" height="4" fill="#ffffff" />

          {/* Flying seagulls */}
          <path
            d="M 62 26 Q 66 22 70 26 Q 74 22 78 26"
            stroke="#001845"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 72 34 Q 75 31 78 34 Q 81 31 84 34"
            stroke="#001845"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 64 42 Q 67 39 70 42 Q 73 39 76 42"
            stroke="#001845"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- TYPOGRAPHY: "Gündem" (Navy Blue Bold) --- */}
        <text
          x="100"
          y="48"
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="46"
          letterSpacing="-1.5px"
          fill="url(#gt34-blue-grad)"
          className="dark:brightness-125"
        >
          Gündem
        </text>

        {/* --- RED ANGLED BANNER FOR "Tuzla 34" --- */}
        <g transform="translate(100, 52)">
          {/* Slanted red background banner */}
          <path
            d="M 12 0 L 260 0 C 267 0 273 5 272 12 L 268 34 C 267 40 261 44 254 44 L 0 44 L 12 0 Z"
            fill="url(#gt34-red-grad)"
            filter="url(#gt34-shadow)"
          />
          {/* Metallic highlight overlay */}
          <path
            d="M 12 0 L 260 0 C 267 0 273 5 272 12 L 271 18 L 6 18 L 12 0 Z"
            fill="url(#gt34-metal-red)"
            opacity="0.5"
          />

          {/* Text: "Tuzla" */}
          <text
            x="24"
            y="33"
            fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-0.5px"
            fill="#ffffff"
          >
            Tuzla
          </text>

          {/* Text: "34" */}
          <text
            x="165"
            y="35"
            fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="950"
            fontSize="36"
            fontStyle="italic"
            letterSpacing="-1px"
            fill="#ffffff"
          >
            34
          </text>

          {/* Subtle accent border line */}
          <line x1="152" y1="8" x2="148" y2="36" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
        </g>
      </svg>

      {showSubline && (
        <span className="hidden lg:inline-block pl-2 border-l border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
          Tuzla'nın Güvenilir Haber Kaynağı
        </span>
      )}
    </div>
  );
};
