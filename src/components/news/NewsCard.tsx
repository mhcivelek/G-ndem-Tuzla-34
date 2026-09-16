import React from 'react';
import { Clock, Eye, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { NewsItem, Category } from '../../types';

interface NewsCardProps {
  news: NewsItem;
  category?: Category;
  onSelectNews: (news: NewsItem) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  category,
  onSelectNews,
  variant = 'standard',
}) => {
  const categoryName = category?.name || news.category;
  const categoryColor = category?.color || 'bg-slate-700';

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelectNews(news)}
        className="flex gap-3 items-center group cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800/80 last:border-0"
      >
        <div className="w-20 h-16 shrink-0 rounded-md overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
          <img
            src={news.coverImage}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
            {categoryName}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {news.readTimeMinutes} dk
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Eye className="w-3 h-3" /> {news.views}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelectNews(news)}
      className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={news.coverImage}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Gradient Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Category Badge */}
          <span className={`absolute top-3 left-3 ${categoryColor} text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider`}>
            {categoryName}
          </span>

          {/* Reading Time Badge */}
          <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            {news.readTimeMinutes} dk okuma
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-2">
            {news.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-normal leading-relaxed">
            {news.spot}
          </p>
        </div>
      </div>

      {/* Footer Info & Metrics */}
      <div className="px-4 py-3 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        {/* Author Avatar & Name */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={news.author.avatar}
            alt={news.author.name}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
          />
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate text-[11px]">
            {news.author.name}
          </span>
        </div>

        {/* Views & Comments Count */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="flex items-center gap-1" title="Okunma Sayısı">
            <Eye className="w-3.5 h-3.5" />
            {news.views.toLocaleString('tr-TR')}
          </span>
          <span className="flex items-center gap-1" title="Yorum Sayısı">
            <MessageSquare className="w-3.5 h-3.5" />
            {news.commentsCount}
          </span>
        </div>
      </div>
    </article>
  );
};
