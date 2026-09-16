import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Eye, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { NewsItem, Category } from '../../types';

interface HeroHeadlineSliderProps {
  headlineNews: NewsItem[];
  categories: Category[];
  onSelectNews?: (news: NewsItem) => void;
  onSelect?: (news: NewsItem) => void;
}

export const HeroHeadlineSlider: React.FC<HeroHeadlineSliderProps> = ({
  headlineNews = [],
  categories = [],
  onSelectNews,
  onSelect,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = Array.isArray(headlineNews) ? headlineNews.slice(0, 10) : [];
  const currentSlide = slides[activeIndex] || slides[0];

  const handleSlideSelect = () => {
    if (currentSlide) {
      (onSelectNews || onSelect)?.(currentSlide);
    }
  };

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  if (!currentSlide) return null;

  const currentCat = categories.find((c) => c.id === currentSlide.category);

  return (
    <div 
      className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Feature Slide Stage */}
      <div 
        className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full overflow-hidden cursor-pointer"
        onClick={handleSlideSelect}
      >
        {/* Background Cover Image with Zoom Effect */}
        <img
          key={currentSlide.id}
          src={currentSlide.coverImage}
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Multi-layer Gradient Scrims for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent max-w-3xl" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2">
          <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> GÜNDEM MANŞET
          </span>
          {currentCat && (
            <span className={`${currentCat.color} text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider`}>
              {currentCat.name}
            </span>
          )}
        </div>

        {/* Bottom Slide Information */}
        <div className="absolute bottom-16 sm:bottom-18 left-4 sm:left-6 right-4 sm:right-6 max-w-3xl space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded text-amber-300">
              <Clock className="w-3.5 h-3.5" /> {currentSlide.readTimeMinutes} dakika okuma süresi
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Eye className="w-3.5 h-3.5" /> {currentSlide.views.toLocaleString('tr-TR')} görüntülenme
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <MessageSquare className="w-3.5 h-3.5" /> {currentSlide.commentsCount} yorum
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3.5xl font-black text-white leading-tight tracking-tight drop-shadow-md group-hover:text-red-400 transition-colors">
            {currentSlide.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
            {currentSlide.spot}
          </p>

          <div className="pt-1 flex items-center gap-2 text-xs font-bold text-red-400 group-hover:text-red-300">
            <span>Haberi Tamamını Oku</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Slider Navigation Arrows (Left / Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Önceki Manşet"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((prev) => (prev + 1) % slides.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Sonraki Manşet"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* 1..10 Classic Turkish Portal Pager Bar */}
      <div className="bg-slate-950/95 border-t border-slate-800 p-2 sm:p-2.5 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <span className="hidden lg:inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2 shrink-0">
          MANŞETLER:
        </span>

        <div className="flex items-center gap-1 sm:gap-1.5 w-full justify-center md:justify-start">
          {slides.map((slide, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 min-w-[28px] max-w-[50px] py-1.5 rounded text-xs font-black transition-all cursor-pointer text-center ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md scale-105 ring-2 ring-red-400/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={slide.title}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0 pr-2">
          <span className="text-xs text-slate-400 font-mono">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};
