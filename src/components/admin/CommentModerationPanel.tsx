import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Trash2, 
  AlertTriangle, 
  Filter, 
  MessageSquare, 
  Search, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Comment, CurrentUser, NewsItem } from '../../types';
import { storageService } from '../../services/storageService';

interface CommentModerationPanelProps {
  currentUser: CurrentUser;
  newsList: NewsItem[];
  onRefresh?: () => void;
}

export const CommentModerationPanel: React.FC<CommentModerationPanelProps> = ({
  currentUser,
  newsList,
  onRefresh,
}) => {
  const [comments, setComments] = useState<Comment[]>(storageService.getComments());
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'spam'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const reload = () => {
    setComments(storageService.getComments());
    if (onRefresh) onRefresh();
  };

  const handleUpdateStatus = (id: string, status: Comment['status']) => {
    storageService.updateCommentStatus(id, status, currentUser);
    reload();
  };

  const handleApproveAllPending = () => {
    const pendingList = comments.filter((c) => c.status === 'pending');
    pendingList.forEach((c) => {
      storageService.updateCommentStatus(c.id, 'approved', currentUser);
    });
    reload();
  };

  const filteredComments = comments.filter((c) => {
    if (activeFilter !== 'all' && c.status !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.authorName.toLowerCase().includes(q) || c.content.toLowerCase().includes(q);
    }
    return true;
  });

  const pendingCount = comments.filter((c) => c.status === 'pending').length;

  return (
    <div className="space-y-4">
      {/* Header & Batch Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Yorum Moderasyon Havuzu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Okurlardan gelen yorumları inceleyin, filtreleyin ve onaylayın.
            </p>
          </div>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={handleApproveAllPending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            Tüm Bekleyenleri Onayla ({pendingCount})
          </button>
        )}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded transition ${
              activeFilter === 'pending'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Bekleyenler ({pendingCount})
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`px-3 py-1.5 rounded transition ${
              activeFilter === 'approved'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Onaylananlar ({comments.filter((c) => c.status === 'approved').length})
          </button>
          <button
            onClick={() => setActiveFilter('rejected')}
            className={`px-3 py-1.5 rounded transition ${
              activeFilter === 'rejected'
                ? 'bg-rose-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Reddedilenler ({comments.filter((c) => c.status === 'rejected').length})
          </button>
          <button
            onClick={() => setActiveFilter('spam')}
            className={`px-3 py-1.5 rounded transition ${
              activeFilter === 'spam'
                ? 'bg-slate-700 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Spam ({comments.filter((c) => c.status === 'spam').length})
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded transition ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Tümü ({comments.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Yorumlarda veya yazarlarda ara..."
            className="text-xs pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-1 focus:ring-red-500 w-56"
          />
        </div>
      </div>

      {/* Comments Table / Cards */}
      <div className="space-y-2.5">
        {filteredComments.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            Bu kriterde yorum bulunamadı.
          </div>
        ) : (
          filteredComments.map((cmt) => {
            const related = newsList.find((n) => n.id === cmt.newsId);
            return (
              <div
                key={cmt.id}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{cmt.authorName}</span>
                    <span className="text-[11px] text-slate-400">{cmt.authorEmail || 'E-posta yok'}</span>
                    <span className="text-[10px] font-mono text-slate-400">• {cmt.createdAt}</span>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        cmt.status === 'approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : cmt.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : cmt.status === 'spam'
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {cmt.status === 'approved' ? 'Onaylı' : cmt.status === 'pending' ? 'Bekliyor' : cmt.status === 'spam' ? 'Spam' : 'Reddedildi'}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 font-normal leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    "{cmt.content}"
                  </p>

                  {related && (
                    <p className="text-[11px] text-slate-500 truncate">
                      İlgili Haber: <strong className="text-slate-700 dark:text-slate-300">{related.title}</strong>
                    </p>
                  )}
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {cmt.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(cmt.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                      title="Yorumu Onayla"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Onayla</span>
                    </button>
                  )}

                  {cmt.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(cmt.id, 'rejected')}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                      title="Yorumu Reddet"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Reddet</span>
                    </button>
                  )}

                  {cmt.status !== 'spam' && (
                    <button
                      onClick={() => handleUpdateStatus(cmt.id, 'spam')}
                      className="bg-slate-600 hover:bg-slate-700 text-white font-bold p-1.5 rounded-lg transition cursor-pointer"
                      title="Spam Olarak İşaretle"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
