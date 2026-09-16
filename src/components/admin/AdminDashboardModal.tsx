import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Zap, 
  MessageSquare, 
  Megaphone, 
  BarChart3, 
  History, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { CurrentUser, NewsItem, Category, BreakingNews, AdPlacement } from '../../types';
import { storageService } from '../../services/storageService';
import { CommentModerationPanel } from './CommentModerationPanel';
import { AdManagerPanel } from './AdManagerPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { AuditLogsPanel } from './AuditLogsPanel';

interface AdminDashboardModalProps {
  currentUser: CurrentUser;
  newsList: NewsItem[];
  breakingList: BreakingNews[];
  categories: Category[];
  onClose: () => void;
  onOpenNewsEditor: (news?: NewsItem | null) => void;
  onOpenBreakingModal: () => void;
  onRefreshData: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  currentUser,
  newsList,
  breakingList,
  categories,
  onClose,
  onOpenNewsEditor,
  onOpenBreakingModal,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'comments' | 'ads' | 'analytics' | 'logs'>('news');
  const [newsFilterCategory, setNewsFilterCategory] = useState('all');

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`"${title}" başlıklı haberi silmek istediğinize emin misiniz?`)) {
      storageService.deleteNews(id, currentUser);
      onRefreshData();
    }
  };

  const handleToggleHeadline = (item: NewsItem) => {
    const updated = { ...item, isHeadline: !item.isHeadline };
    storageService.updateNews(updated, currentUser);
    onRefreshData();
  };

  const pendingCommentsCount = storageService.getComments().filter((c) => c.status === 'pending').length;

  const filteredNews = newsList.filter((n) => {
    if (newsFilterCategory === 'all') return true;
    return n.category === newsFilterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white dark:bg-slate-900 max-w-6xl w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 relative max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with quick buttons */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-sm">
              34
            </div>
            <div>
              <h2 className="font-black text-sm sm:text-base leading-tight">
                Gündem Tuzla 34 - Yönetim & Editör Masası
              </h2>
              <p className="text-[11px] text-slate-400">
                Giriş Yapan: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct button: Ayrı Son Dakika Haberi Girişi */}
            <button
              onClick={onOpenBreakingModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer animate-pulse"
              title="Ayrı Son Dakika Haberi Girişi (Flaş)"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Ayrı Son Dakika Girişi</span>
            </button>

            {/* Direct button: Standart Haber Ekle */}
            <button
              onClick={() => onOpenNewsEditor(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              title="Bilgi Giriş Bölümü: Yeni Haber Ekle"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Haber Ekle</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs font-bold overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'news'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Haber Arşivi ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'comments'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Yorum Moderasyonu</span>
            {pendingCommentsCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                {pendingCommentsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'ads'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Reklam Yerleşimleri</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Veri Analitiği & Raporlar</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'logs'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Sistem Günlükleri & Yedekleme</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: NEWS LIST */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Kategoriye Göre:</span>
                  <select
                    value={newsFilterCategory}
                    onChange={(e) => setNewsFilterCategory(e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {categories.filter((c) => c.id !== 'hepsi').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  Toplam {filteredNews.length} haber listeleniyor
                </div>
              </div>

              {/* News Table */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Görsel & Başlık</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Manşet</th>
                        <th className="p-3">Okuma Süresi</th>
                        <th className="p-3">Görüntülenme</th>
                        <th className="p-3 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredNews.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-12 h-9 object-cover rounded shrink-0 bg-slate-100"
                              />
                              <div className="min-w-0 max-w-sm">
                                <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                                  {item.title}
                                </p>
                                <p className="text-[11px] text-slate-400 font-mono">{item.publishedAt}</p>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-semibold text-[10px]">
                              {item.category}
                            </span>
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => handleToggleHeadline(item)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition ${
                                item.isHeadline
                                  ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                              }`}
                            >
                              {item.isHeadline ? 'Manşette' : 'Standart'}
                            </button>
                          </td>

                          <td className="p-3 font-mono text-slate-500">
                            {item.readTimeMinutes} dk
                          </td>

                          <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                            {item.views.toLocaleString('tr-TR')}
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onOpenNewsEditor(item)}
                                className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                                title="Haberi Düzenle"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteNews(item.id, item.title)}
                                className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 cursor-pointer"
                                title="Haberi Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMMENTS MODERATION */}
          {activeTab === 'comments' && (
            <CommentModerationPanel
              currentUser={currentUser}
              newsList={newsList}
              onRefresh={onRefreshData}
            />
          )}

          {/* TAB 3: AD MANAGER */}
          {activeTab === 'ads' && (
            <AdManagerPanel
              currentUser={currentUser}
              onRefresh={onRefreshData}
            />
          )}

          {/* TAB 4: ANALYTICS */}
          {activeTab === 'analytics' && (
            <AnalyticsPanel newsList={newsList} />
          )}

          {/* TAB 5: AUDIT LOGS & BACKUP */}
          {activeTab === 'logs' && (
            <AuditLogsPanel
              currentUser={currentUser}
              onRefreshAll={onRefreshData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
