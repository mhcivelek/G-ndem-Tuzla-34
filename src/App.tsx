import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Zap, 
  SlidersHorizontal, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  MapPin, 
  CloudSun, 
  Pill, 
  Compass, 
  BookOpen, 
  Search, 
  ShieldCheck, 
  ArrowUp,
  X,
  FileText
} from 'lucide-react';
import { 
  NewsItem, 
  BreakingNews, 
  AdPlacement, 
  CurrentUser, 
  CategoryId 
} from './types';
import { CATEGORIES, CURRENT_ROLES } from './data/initialData';
import { storageService } from './services/storageService';
import { Header } from './components/common/Header';
import { BreakingNewsBar } from './components/news/BreakingNewsBar';
import { HeroHeadlineSlider } from './components/news/HeroHeadlineSlider';
import { NewsCard } from './components/news/NewsCard';
import { AdBanner } from './components/ads/AdBanner';
import { ArticleDetailModal } from './components/news/ArticleDetailModal';
import { NewsEditorModal } from './components/admin/NewsEditorModal';
import { BreakingNewsFastModal } from './components/admin/BreakingNewsFastModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { NotificationModal } from './components/notifications/NotificationModal';
import { SystemDocsModal } from './components/docs/SystemDocsModal';

export default function App() {
  // Application Data States
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [breakingList, setBreakingList] = useState<BreakingNews[]>([]);
  const [ads, setAds] = useState<AdPlacement[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(CURRENT_ROLES.super_admin);

  // Filter & Navigation States
  const [activeCategory, setActiveCategory] = useState<CategoryId>('hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'comments'>('date');
  const [breakingViewMode, setBreakingViewMode] = useState<'ticker' | 'stream'>('ticker');

  // Modal States
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isNewsEditorOpen, setIsNewsEditorOpen] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);
  const [isBreakingModalOpen, setIsBreakingModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [showMobileBottomAd, setShowMobileBottomAd] = useState(true);

  // Dark Mode State with document class syncing
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Load initial data from Storage Service
  const refreshAllData = () => {
    setNewsList(storageService.getNews());
    setBreakingList(storageService.getBreakingNews());
    setAds(storageService.getAds());
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Filter & Sort Logic
  const filteredNews = useMemo(() => {
    return newsList
      .filter((item) => {
        const matchesCat = activeCategory === 'hepsi' || item.category === activeCategory;
        const matchesSearch = searchQuery.trim() === '' || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.spot.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'comments') return b.commentsCount - a.commentsCount;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [newsList, activeCategory, searchQuery, sortBy]);

  const headlineNews = useMemo(() => {
    const headlines = newsList.filter((n) => n.isHeadline);
    return headlines.length > 0 ? headlines : newsList.slice(0, 5);
  }, [newsList]);

  // Specific ad placements
  const headerAd = ads.find((a) => a.location === 'header_top');
  const headlineBottomAd = ads.find((a) => a.location === 'headline_bottom');
  const sidebarAd = ads.find((a) => a.location === 'sidebar_sticky');
  const inArticleAd = ads.find((a) => a.location === 'in_article');
  const mobileBottomAd = ads.find((a) => a.location === 'mobile_bottom');

  const handleSelectBreakingItem = (item: BreakingNews) => {
    // If breaking news matches a news item, open it, or create a quick preview modal
    const matching = newsList.find((n) => n.id === item.id || n.title.includes(item.title.substring(0, 20)));
    if (matching) {
      setSelectedNews(matching);
    } else {
      // Open synthetic article for breaking item
      setSelectedNews({
        id: item.id,
        title: item.title,
        spot: item.summary,
        content: `${item.summary}\n\nTuzla 34 Haber Merkezi olay yerinden gelişmeleri aktarmaya devam ediyor. Ekipler sahada incelemelerini sürdürmektedir. Ayrıntılar geldikçe aktarılacaktır.`,
        category: item.category,
        coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        author: {
          name: 'Gündem Tuzla 34 Flaş Masası',
          role: 'Son Dakika Editörü',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        publishedAt: item.timestamp,
        readTimeMinutes: 1,
        views: 342,
        commentsCount: 0,
        isHeadline: true,
        tags: ['SonDakika', 'Tuzla', 'Flaş'],
        adEnabled: true,
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-red-600 selection:text-white">
      {/* Header */}
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUser={currentUser}
        onChangeUserRole={(role) => {
          if (CURRENT_ROLES[role]) {
            setCurrentUser(CURRENT_ROLES[role]);
          } else {
            setCurrentUser((prev) => ({ ...prev, role }));
          }
        }}
        onSelectUserRole={setCurrentUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        onOpenAdminPanel={() => setIsAdminDashboardOpen(true)}
        onOpenNewsEditor={() => {
          setEditingNewsItem(null);
          setIsNewsEditorOpen(true);
        }}
        onOpenBreakingModal={() => setIsBreakingModalOpen(true)}
        onOpenBreakingNewsEditor={() => setIsBreakingModalOpen(true)}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenDocs={() => setIsDocsModalOpen(true)}
        onOpenSearch={() => {
          const searchInput = document.querySelector('input[placeholder*="ara"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
      />

      {/* Breaking News Bar (Dual Mode: Horizontal Ticker & Vertical Stream) */}
      <BreakingNewsBar
        breakingList={breakingList}
        items={breakingList}
        viewMode={breakingViewMode}
        onToggleViewMode={() => setBreakingViewMode((prev) => (prev === 'ticker' ? 'stream' : 'ticker'))}
        onSelectBreakingNews={handleSelectBreakingItem}
        onSelectBreaking={handleSelectBreakingItem}
        onOpenBreakingNewsEditor={() => setIsBreakingModalOpen(true)}
        onOpenFastEntry={() => setIsBreakingModalOpen(true)}
      />

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 flex-1 space-y-6">
        {/* Top Header Billboard Ad (728x90) */}
        {headerAd && headerAd.active && (
          <div className="w-full flex justify-center">
            <AdBanner placement={headerAd} className="max-w-4xl w-full" />
          </div>
        )}

        {/* Hero Manşet Slider (Turkish 1..10 Headline Portal Component) */}
        {activeCategory === 'hepsi' && searchQuery.trim() === '' && (
          <section className="w-full">
            <HeroHeadlineSlider
              headlineNews={headlineNews}
              categories={CATEGORIES}
              onSelectNews={setSelectedNews}
            />
          </section>
        )}

        {/* Headline Bottom Leaderboard Ad (970x90) */}
        {headlineBottomAd && headlineBottomAd.active && (
          <div className="w-full flex justify-center pt-1">
            <AdBanner placement={headlineBottomAd} className="max-w-5xl w-full" />
          </div>
        )}

        {/* Category Filter Pills & Sort Bar */}
        <section className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold hidden sm:inline flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sırala:
            </span>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setSortBy('date')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  sortBy === 'date'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                En Yeni
              </button>
              <button
                onClick={() => setSortBy('views')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  sortBy === 'views'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                Çok Okunan
              </button>
              <button
                onClick={() => setSortBy('comments')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                  sortBy === 'comments'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                Çok Yorumlanan
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout: Main Feed (8 cols) + Right Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main News Feed Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Active search or category banner */}
            {(searchQuery.trim() !== '' || activeCategory !== 'hepsi') && (
              <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-800/80 px-4 py-2.5 rounded-xl text-xs font-semibold">
                <span>
                  {searchQuery ? `"${searchQuery}" için sonuçlar` : `${CATEGORIES.find((c) => c.id === activeCategory)?.name} Haberleri`} ({filteredNews.length} içerik bulundu)
                </span>
                <button
                  onClick={() => {
                    setActiveCategory('hepsi');
                    setSearchQuery('');
                  }}
                  className="text-red-600 hover:underline font-bold"
                >
                  Filtreyi Temizle
                </button>
              </div>
            )}

            {/* News Cards Grid */}
            {filteredNews.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Search className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Aradığınız kriterde haber bulunamadı.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Lütfen farklı bir kategori seçin veya arama kelimenizi kontrol edin.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('hepsi');
                    setSearchQuery('');
                  }}
                  className="mt-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Tüm Haberleri Göster
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredNews.map((news) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    category={CATEGORIES.find((c) => c.id === news.category)}
                    onSelectNews={setSelectedNews}
                    onSelect={setSelectedNews}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Local Widgets & Sidebar Column */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Widget 1: Tuzla Sahil & Deniz Durumu */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Tuzla Sahil & Hava Durumu
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Canlı MGM</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Sıcaklık</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">19°C</span>
                  <span className="text-[10px] text-slate-500 block">Parçalı Bulutlu</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Deniz Suyu</span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">14°C</span>
                  <span className="text-[10px] text-slate-500 block">Tuzla Marina</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Rüzgar</span>
                  <span className="text-base font-black text-emerald-600">18 km/s</span>
                  <span className="text-[10px] text-slate-500 block">Poyraz</span>
                </div>
              </div>
            </div>

            {/* Widget 2: Tuzla Nöbetçi Eczaneleri (Essential Turkish Local News Service) */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-red-600" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Bugün Tuzla Nöbetçi Eczaneleri
                  </h3>
                </div>
                <span className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  24 Saat Açık
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>Yayla Sahil Eczanesi</span>
                    <span className="text-red-600 font-mono text-[11px]">0216 446 12 34</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Cengiz Topel Cad. No: 18/B (Tuzla Devlet Hastanesi Yanı)
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>Aydıntepe Merkez Eczanesi</span>
                    <span className="text-red-600 font-mono text-[11px]">0216 395 78 90</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Aydıntepe Mah. 100. Yıl Cad. No: 42 (Marmaray İstasyonu Karşısı)
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Sticky Ad Banner (300x600) */}
            {sidebarAd && sidebarAd.active && (
              <div className="sticky top-20">
                <AdBanner placement={sidebarAd} />
              </div>
            )}

            {/* Widget 3: Günün En Çok Okunanları */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Günün Çok Okunan Tuzla Haberleri
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {newsList.slice(0, 4).map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="flex items-center gap-3 group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <span className="text-lg font-black text-slate-300 dark:text-slate-700 font-mono group-hover:text-red-600 transition">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 line-clamp-2 transition leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> {item.readTimeMinutes} dk
                        </span>
                        <span>•</span>
                        <span>{item.views.toLocaleString('tr-TR')} okuma</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 4: Quick Action Panel for Editors & Admins */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">Hızlı Editör Masası</h4>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Aktif Rol: {currentUser.role}</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Haber girişi, anlık son dakika flaş haberi, yorum moderasyonu ve reklam yerleşimlerini yönetin.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setIsBreakingModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Son Dakika Gir</span>
                </button>

                <button
                  onClick={() => {
                    setEditingNewsItem(null);
                    setIsNewsEditorOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Haber Ekle</span>
                </button>
              </div>

              <button
                onClick={() => setIsAdminDashboardOpen(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Tüm Yönetim Panelini Aç</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Bottom Sticky Ad (320x50) */}
      {mobileBottomAd && mobileBottomAd.active && showMobileBottomAd && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl p-1 sm:hidden flex items-center justify-between gap-2">
          <div className="flex-1 overflow-hidden">
            <AdBanner placement={mobileBottomAd} />
          </div>
          <button
            onClick={() => setShowMobileBottomAd(false)}
            className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer"
            title="Reklamı Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-12 pb-16 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs">
                  34
                </div>
                <span className="font-black text-lg tracking-tight">GÜNDEM TUZLA 34</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                İstanbul'un sanayi, tersane, marina ve sahil incisi Tuzla'nın bağımsız, tarafsız ve hızlı dijital haber platformu.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Postane Mah. Rauf Orbay Cad. No:34 Tuzla / İstanbul</span>
              </div>
            </div>

            {/* Neighborhoods coverage */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                Tuzla Mahalle Haberleri
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li className="hover:text-white cursor-pointer">• Postane & Sahil & Marina</li>
                <li className="hover:text-white cursor-pointer">• Yayla & Cami Mahallesi</li>
                <li className="hover:text-white cursor-pointer">• Evliya Çelebi & İstasyon</li>
                <li className="hover:text-white cursor-pointer">• Aydınlı & İçmeler & Aydıntepe</li>
                <li className="hover:text-white cursor-pointer">• Mimarsinan & Şifa Mahallesi</li>
                <li className="hover:text-white cursor-pointer">• Tepeören & Akfırat & Sanayi</li>
              </ul>
            </div>

            {/* Corporate & Editorial */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                Kurumsal & Yayın İlkeleri
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li className="hover:text-white cursor-pointer">• Künye & İletişim</li>
                <li className="hover:text-white cursor-pointer">• Basın Meslek İlkeleri</li>
                <li className="hover:text-white cursor-pointer">• Gizlilik ve Çerez Politikası</li>
                <li className="hover:text-white cursor-pointer">• KVKK Aydınlatma Metni</li>
                <li className="hover:text-white cursor-pointer">• Reklam & Sponsorluk İletişimi</li>
              </ul>
            </div>

            {/* Technical & Documentation */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
                Sistem & Geliştirici
              </h4>
              <p className="text-slate-400 text-xs">
                Gündem Tuzla 34, yüksek hızlı önbellekleme mimarisi ve mikroservis uyumlu altyapı ile güçlendirilmiştir.
              </p>
              <button
                onClick={() => setIsDocsModalOpen(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-500" />
                <span>Teknik Dokümantasyon & API</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Gündem Tuzla 34. Tüm hakları saklıdır. İçerikler kaynak gösterilmeden kopyalanamaz.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="hover:text-white transition flex items-center gap-1 cursor-pointer"
              >
                <span>Yukarı Çık</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODAL DIALOGS --- */}

      {/* 1. Article Detail Reader Modal */}
      {selectedNews && (
        <ArticleDetailModal
          news={selectedNews}
          category={CATEGORIES.find((c) => c.id === selectedNews.category)}
          categories={CATEGORIES}
          allNews={newsList}
          currentUser={currentUser}
          onClose={() => setSelectedNews(null)}
          onSelectRelatedNews={setSelectedNews}
          inArticleAdSlot={inArticleAd && inArticleAd.active ? <AdBanner placement={inArticleAd} /> : undefined}
        />
      )}

      {/* 2. Standart Haber Giriş Bölümü (News Editor Modal) */}
      {isNewsEditorOpen && (
        <NewsEditorModal
          categories={CATEGORIES}
          currentUser={currentUser}
          onClose={() => {
            setIsNewsEditorOpen(false);
            setEditingNewsItem(null);
          }}
          onNewsSaved={(saved) => {
            refreshAllData();
            setIsNewsEditorOpen(false);
            setEditingNewsItem(null);
            setSelectedNews(saved);
          }}
          editingNews={editingNewsItem}
        />
      )}

      {/* 3. Ayrı Son Dakika Haberi Girişi Modal */}
      {isBreakingModalOpen && (
        <BreakingNewsFastModal
          categories={CATEGORIES}
          currentUser={currentUser}
          onClose={() => setIsBreakingModalOpen(false)}
          onBreakingAdded={(newItem) => {
            refreshAllData();
          }}
        />
      )}

      {/* 4. Admin & Yönetim Dashboard Modal */}
      {isAdminDashboardOpen && (
        <AdminDashboardModal
          currentUser={currentUser}
          newsList={newsList}
          breakingList={breakingList}
          categories={CATEGORIES}
          onClose={() => setIsAdminDashboardOpen(false)}
          onOpenNewsEditor={(item) => {
            setEditingNewsItem(item || null);
            setIsNewsEditorOpen(true);
          }}
          onOpenBreakingModal={() => setIsBreakingModalOpen(true)}
          onRefreshData={refreshAllData}
        />
      )}

      {/* 5. Kişiselleştirilmiş Bildirim Ayarları Modal */}
      {isNotificationModalOpen && (
        <NotificationModal
          categories={CATEGORIES}
          breakingList={breakingList}
          onClose={() => setIsNotificationModalOpen(false)}
          onSelectBreaking={handleSelectBreakingItem}
        />
      )}

      {/* 6. Sistem & Geliştirici Dokümantasyon Sayfası Modal */}
      {isDocsModalOpen && (
        <SystemDocsModal onClose={() => setIsDocsModalOpen(false)} />
      )}
    </div>
  );
}
