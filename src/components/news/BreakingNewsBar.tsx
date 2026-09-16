import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX, 
  Rows, 
  Columns, 
  Share2, 
  Clock, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { BreakingNews } from '../../types';

interface BreakingNewsBarProps {
  breakingList?: BreakingNews[];
  items?: BreakingNews[];
  onSelectBreakingNews?: (item: BreakingNews) => void;
  onSelectBreaking?: (item: BreakingNews) => void;
  onOpenBreakingNewsEditor?: () => void;
  onOpenFastEntry?: () => void;
  viewMode?: 'horizontal' | 'vertical' | 'ticker' | 'stream';
  onToggleViewMode?: () => void;
}

export const BreakingNewsBar: React.FC<BreakingNewsBarProps> = ({
  breakingList,
  items,
  onSelectBreakingNews,
  onSelectBreaking,
  onOpenBreakingNewsEditor,
  onOpenFastEntry,
  viewMode: controlledViewMode,
  onToggleViewMode,
}) => {
  const list = breakingList || items || [];
  const activeItems = Array.isArray(list) ? list.filter((b) => b && b.active) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  // Internal or external view mode: 'horizontal' | 'vertical'
  const [internalViewMode, setInternalViewMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const viewMode = controlledViewMode
    ? (controlledViewMode === 'ticker' || controlledViewMode === 'horizontal' ? 'horizontal' : 'vertical')
    : internalViewMode;

  const handleSelect = (item: BreakingNews) => {
    (onSelectBreakingNews || onSelectBreaking)?.(item);
  };

  const handleOpenEditor = () => {
    (onOpenBreakingNewsEditor || onOpenFastEntry)?.();
  };

  const toggleView = () => {
    if (onToggleViewMode) {
      onToggleViewMode();
    } else {
      setInternalViewMode((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
    }
  };

  // Auto cycle in horizontal mode
  useEffect(() => {
    if (activeItems.length <= 1 || isPaused || viewMode === 'vertical') return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [activeItems.length, isPaused, viewMode]);

  if (activeItems.length === 0) return null;

  const currentItem = activeItems[currentIndex] || activeItems[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);
  };

  const urgencyBadge = (urgency: BreakingNews['urgency']) => {
    switch (urgency) {
      case 'critical':
        return <span className="bg-red-700 text-white font-black text-[10px] px-1.5 py-0.5 rounded tracking-wide animate-pulse uppercase">KRİTİK</span>;
      case 'high':
        return <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded tracking-wide uppercase">ACİL</span>;
      default:
        return <span className="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded tracking-wide uppercase">GÜNCEL</span>;
    }
  };

  return (
    <div className="w-full bg-slate-900 border-y border-red-700/60 text-white transition-all shadow-md">
      {/* View Mode 1: HORIZONTAL TICKER BAR (Default Desktop & Quick Mobile) */}
      {viewMode === 'horizontal' && (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 md:gap-4">
          {/* Badge Label */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded font-black text-xs sm:text-sm tracking-wider uppercase shadow-xs">
              <Zap className="w-4 h-4 fill-white animate-bounce" />
              <span>SON DAKİKA</span>
            </div>
            {urgencyBadge(currentItem.urgency)}
          </div>

          {/* Ticker Content */}
          <div 
            className="flex-1 overflow-hidden cursor-pointer group"
            onClick={() => handleSelect(currentItem)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs hidden sm:inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentItem.timestamp}:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-1">
                {currentItem.title}
              </p>
            </div>
          </div>

          {/* Controls: Counter, Navigation, Mode Switcher */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 text-slate-300">
            <span className="text-[11px] font-mono font-medium text-slate-400 hidden md:inline">
              {currentIndex + 1}/{activeItems.length}
            </span>

            <button
              onClick={handlePrev}
              className="p-1 hover:bg-slate-800 rounded transition text-slate-300 hover:text-white"
              title="Önceki Son Dakika"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-slate-800 rounded transition text-slate-300 hover:text-white"
              title="Sonraki Son Dakika"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-white hidden sm:inline-block"
              title={isPaused ? 'Oynat' : 'Duraklat'}
              aria-label="Duraklat"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Switch to Vertical View Button */}
            <button
              id="toggle-breaking-vertical-btn"
              onClick={toggleView}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded transition border border-slate-700 ml-1 cursor-pointer"
              title="Dikey Son Dakika Akışına Geç (Liste Görünümü)"
            >
              <Rows className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">Dikey Görünüm</span>
            </button>
          </div>
        </div>
      )}

      {/* View Mode 2: VERTICAL EXPANDED STREAM (For both PC & Mobile deep scanning) */}
      {viewMode === 'vertical' && (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded font-black text-xs tracking-wider uppercase">
                <Zap className="w-4 h-4 fill-white" />
                SON DAKİKA DİKEY CANLI AKIŞI
              </span>
              <span className="text-xs text-slate-400 font-medium">({activeItems.length} Aktif Gelişme)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenEditor}
                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded transition cursor-pointer"
              >
                + Yeni Giriş
              </button>
              <button
                id="toggle-breaking-horizontal-btn"
                onClick={toggleView}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded border border-slate-700 cursor-pointer"
                title="Yatay Kayan Banda Dön"
              >
                <Columns className="w-3.5 h-3.5 text-blue-400" />
                <span>Yatay Kayan Bant</span>
              </button>
            </div>
          </div>

          {/* Vertical items grid / stream */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="bg-slate-800/80 hover:bg-slate-800 p-3.5 rounded-lg border border-slate-700/80 hover:border-red-500/80 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {urgencyBadge(item.urgency)}
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-2 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] uppercase tracking-wider text-red-400 font-semibold">Tuzla Gündem</span>
                  <span className="flex items-center gap-1 group-hover:text-white transition">
                    Haberi Aç <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
