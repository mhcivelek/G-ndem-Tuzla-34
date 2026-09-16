import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { AdPlacement } from '../../types';
import { storageService } from '../../services/storageService';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  useEffect(() => {
    if (placement.active) {
      storageService.recordAdImpression(placement.id);
    }
  }, [placement.id, placement.active]);

  if (!placement.active) return null;

  const handleClick = () => {
    storageService.recordAdClick(placement.id);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group ${className}`}>
      {/* Compliance Label */}
      <div className="absolute top-1.5 right-1.5 z-10 bg-slate-950/70 backdrop-blur-xs text-[9px] font-bold text-slate-300 px-1.5 py-0.5 rounded tracking-wider uppercase">
        REKLAM
      </div>

      <a
        href={placement.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block relative overflow-hidden"
        title={`Sponsor: ${placement.sponsorName}`}
      >
        <img
          src={placement.imageUrl}
          alt={placement.sponsorName}
          className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
          style={{ maxHeight: placement.height > 200 ? `${placement.height}px` : undefined }}
        />

        {/* Sponsor overlay footer */}
        <div className="p-2 bg-white/95 dark:bg-slate-900/95 flex items-center justify-between text-[11px] border-t border-slate-200 dark:border-slate-800">
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[80%]">
            {placement.sponsorName}
          </span>
          <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-0.5 shrink-0">
            Ziyaret Et <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  );
};
