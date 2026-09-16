import React, { useState } from 'react';
import { 
  Megaphone, 
  ExternalLink, 
  Eye, 
  MousePointer, 
  Percent, 
  Check, 
  Save, 
  Image as ImageIcon,
  Edit2
} from 'lucide-react';
import { AdPlacement, CurrentUser } from '../../types';
import { storageService } from '../../services/storageService';

interface AdManagerPanelProps {
  currentUser: CurrentUser;
  onRefresh?: () => void;
}

export const AdManagerPanel: React.FC<AdManagerPanelProps> = ({ currentUser, onRefresh }) => {
  const [ads, setAds] = useState<AdPlacement[]>(storageService.getAds());
  const [editingAd, setEditingAd] = useState<AdPlacement | null>(null);

  const reload = () => {
    setAds(storageService.getAds());
    if (onRefresh) onRefresh();
  };

  const handleToggleActive = (ad: AdPlacement) => {
    const updated = { ...ad, active: !ad.active };
    storageService.updateAdPlacement(updated, currentUser);
    reload();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd) return;

    storageService.updateAdPlacement(editingAd, currentUser);
    setEditingAd(null);
    reload();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Reklam Yerleşim ve Sponsorluk Yönetimi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masaüstü ve mobil reklam alanlarını açıp kapatın, hedef URL ve banner görsellerini güncelleyin.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ads.map((ad) => {
          const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00';
          return (
            <div
              key={ad.id}
              className={`p-4 rounded-xl border transition-all text-xs space-y-3 bg-white dark:bg-slate-800 ${
                ad.active ? 'border-slate-200 dark:border-slate-700 shadow-xs' : 'border-slate-200 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {ad.name}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Alan: {ad.location} ({ad.width}x{ad.height}px)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingAd(ad)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                    title="Düzenle"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleToggleActive(ad)}
                    className={`px-2.5 py-1 rounded-full font-bold text-[11px] cursor-pointer transition ${
                      ad.active
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {ad.active ? 'Aktif Yayında' : 'Pasif'}
                  </button>
                </div>
              </div>

              {/* Banner Preview */}
              <div className="h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 relative">
                <img
                  src={ad.imageUrl}
                  alt={ad.sponsorName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                  Sponsor: {ad.sponsorName}
                </div>
              </div>

              {/* Performance Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Gösterim</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{ad.impressions.toLocaleString('tr-TR')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Tıklama</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{ad.clicks.toLocaleString('tr-TR')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">TO (CTR)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">%{ctr}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 truncate pt-1">
                <span className="truncate max-w-[80%]">Hedef: {ad.targetUrl}</span>
                <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-0.5 shrink-0">
                  Aç <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Ad Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Reklam Alanını Düzenle: {editingAd.name}
            </h4>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sponsor Firma / Marka</label>
                <input
                  type="text"
                  value={editingAd.sponsorName}
                  onChange={(e) => setEditingAd({ ...editingAd, sponsorName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Banner Görsel URL'si</label>
                <input
                  type="url"
                  value={editingAd.imageUrl}
                  onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hedef Yönlendirme URL'si</label>
                <input
                  type="url"
                  value={editingAd.targetUrl}
                  onChange={(e) => setEditingAd({ ...editingAd, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
