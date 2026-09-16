import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  PlusCircle, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  Menu, 
  X, 
  CloudSun, 
  TrendingUp, 
  ChevronDown,
  Clock,
  Layers
} from 'lucide-react';
import { Logo } from './Logo';
import { Category, CategoryId, CurrentUser, UserRole } from '../../types';

interface HeaderProps {
  categories: Category[];
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  currentUser: CurrentUser;
  onChangeUserRole: (role: UserRole) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNewsEditor: () => void;
  onOpenBreakingNewsEditor: () => void;
  onOpenNotifications: () => void;
  onOpenDocs: () => void;
  onOpenSearch: () => void;
  onOpenAdminPanel: (tab?: string) => void;
  unreadNotificationsCount?: number;
  headerAdSlot?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  currentUser,
  onChangeUserRole,
  isDarkMode,
  onToggleDarkMode,
  onOpenNewsEditor,
  onOpenBreakingNewsEditor,
  onOpenNotifications,
  onOpenDocs,
  onOpenSearch,
  onOpenAdminPanel,
  unreadNotificationsCount = 2,
  headerAdSlot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);
    setCurrentDate(formatted);
  }, []);

  const rolesList: { role: UserRole; label: string; badgeColor: string }[] = [
    { role: 'super_admin', label: 'Süper Yönetici (Admin)', badgeColor: 'bg-red-600 text-white' },
    { role: 'editor', label: 'Haber Editörü', badgeColor: 'bg-blue-600 text-white' },
    { role: 'reporter', label: 'Saha Muhabiri', badgeColor: 'bg-emerald-600 text-white' },
    { role: 'moderator', label: 'Yorum Moderatörü', badgeColor: 'bg-amber-600 text-white' },
    { role: 'reader', label: 'Ziyaretçi / Okur', badgeColor: 'bg-slate-600 text-white' },
  ];

  const currentRoleInfo = rolesList.find((r) => r.role === currentUser.role) || rolesList[0];

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors">
      {/* 1. TOP UTILITY BAR (Live info, weather, prayer time, role picker, dark mode) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date, Weather & Markets */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {currentDate}
            </span>

            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">Tuzla</span> 19°C Parçalı Bulutlu
            </span>

            <div className="hidden md:flex items-center gap-3 border-l border-slate-700 pl-3">
              <span className="flex items-center gap-1">
                <span className="text-slate-400">USD:</span>
                <span className="font-semibold text-emerald-400">34.22</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">EUR:</span>
                <span className="font-semibold text-emerald-400">37.88</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">ALTIN:</span>
                <span className="font-semibold text-amber-300">2.894 TL</span>
              </span>
            </div>
          </div>

          {/* Right: RBAC switcher, Theme Toggle, Notification Bell */}
          <div className="flex items-center gap-2.5">
            {/* Role Switcher for previewing RBAC permissions */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs transition border border-slate-700 cursor-pointer"
                title="Yetki rolü değiştirerek arayüz kısıtlamalarını test edin"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline text-slate-400">Rol:</span>
                <span className="font-semibold truncate max-w-[110px]">{currentRoleInfo.label.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Yetkilendirme Modülü (RBAC)</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Aktif: {currentUser.name}</p>
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => onChangeUserRole(r.role)}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition ${
                        currentUser.role === r.role ? 'font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/30' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{r.label}</span>
                      {currentUser.role === r.role && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              id="header-notification-btn"
              onClick={onOpenNotifications}
              className="relative p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="Kişiselleştirilmiş Bildirim Ayarları"
              aria-label="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Dark Mode Switcher */}
            <button
              id="header-dark-mode-toggle"
              onClick={onToggleDarkMode}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-amber-300 transition cursor-pointer"
              title={isDarkMode ? 'Aydınlık moda geç' : 'Gece moduna geç'}
              aria-label="Gece Modu"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Docs link */}
            <button
              onClick={onOpenDocs}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition text-xs font-medium cursor-pointer"
              title="API, Mimari ve Tasarım Dokümantasyonu"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Dokümantasyon</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND & ACTIONS BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('hepsi')}>
          <Logo size="md" showSubline={true} />
        </div>

        {/* Optional Header Leaderboard Ad Slot (728x90) */}
        {headerAdSlot && (
          <div className="hidden lg:block flex-1 max-w-[728px] mx-4">
            {headerAdSlot}
          </div>
        )}

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            id="quick-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Haberlerde Ara (Ctrl + K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Ara...</span>
          </button>

          {/* Dedicated Fast Breaking News Button (Ayrı Giriş) - Permission restricted */}
          {(currentUser.role === 'super_admin' || currentUser.role === 'editor' || currentUser.role === 'reporter') && (
            <button
              id="fast-breaking-news-btn"
              onClick={onOpenBreakingNewsEditor}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-xs transition hover:shadow cursor-pointer animate-pulse"
              title="Ayrı Hızlı Son Dakika Haberi Girişi"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Son Dakika Gir</span>
            </button>
          )}

          {/* Standard News CMS Editor Button - Permission restricted */}
          {(currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
            <button
              id="standard-news-add-btn"
              onClick={onOpenNewsEditor}
              className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white font-semibold text-xs px-3 py-2 rounded-lg transition cursor-pointer"
              title="Yeni Standart Haber Ekle"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Haber Ekle</span>
            </button>
          )}

          {/* Admin / Management Center */}
          {(currentUser.role === 'super_admin' || currentUser.role === 'editor' || currentUser.role === 'moderator') && (
            <button
              id="admin-management-btn"
              onClick={() => onOpenAdminPanel()}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Yönetim & Moderasyon Paneli"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">Panel</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Kategorileri Göster"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR (Sticky & Horizontal Scroll) */}
      <nav className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center space-x-1 py-1.5 whitespace-nowrap min-w-max md:min-w-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.id === 'hepsi' && <Layers className="w-3.5 h-3.5" />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kategoriler & Menü</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded text-xs font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onOpenDocs();
                setMobileMenuOpen(false);
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Sistem Dokümantasyonu
            </button>
            <button
              onClick={() => {
                onOpenNotifications();
                setMobileMenuOpen(false);
              }}
              className="text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1"
            >
              <Bell className="w-3.5 h-3.5" />
              Bildirim Ayarları
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
