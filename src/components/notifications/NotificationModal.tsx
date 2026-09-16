import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Volume2, 
  Moon, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Zap, 
  Sliders, 
  Inbox,
  Clock
} from 'lucide-react';
import { NotificationPreferences, Category, CategoryId, BreakingNews } from '../../types';
import { storageService } from '../../services/storageService';

interface NotificationModalProps {
  categories: Category[];
  breakingList: BreakingNews[];
  onClose: () => void;
  onSelectBreaking: (item: BreakingNews) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  categories,
  breakingList,
  onClose,
  onSelectBreaking,
}) => {
  const [prefs, setPrefs] = useState<NotificationPreferences>(storageService.getNotificationPrefs());
  const [activeTab, setActiveTab] = useState<'preferences' | 'inbox'>('preferences');
  const [savedNotice, setSavedNotice] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleToggleCategory = (catId: CategoryId) => {
    const exists = prefs.categories.includes(catId);
    const updatedCats = exists
      ? prefs.categories.filter((c) => c !== catId)
      : [...prefs.categories, catId];

    const updated = { ...prefs, categories: updatedCats };
    setPrefs(updated);
    storageService.saveNotificationPrefs(updated);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveNotificationPrefs(prefs);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleSendTestPush = () => {
    setTestSent(true);
    // Trigger notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Gündem Tuzla 34 - Test Bildirimi', {
        body: 'Tuzla son dakika bildirim sisteminiz başarıyla yapılandırıldı.',
        icon: '/assets/og-share.jpg',
      });
    }
    setTimeout(() => setTestSent(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm sm:text-base">
              Kişiselleştirilmiş Bildirim Merkezi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Preferences vs Inbox */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs font-bold">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'preferences'
                ? 'border-b-2 border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Kişisel Tercihler</span>
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'inbox'
                ? 'border-b-2 border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Son Bildirimler ({breakingList.length})</span>
          </button>
        </div>

        {/* Tab 1: Preferences */}
        {activeTab === 'preferences' && (
          <form onSubmit={handleSavePreferences} className="p-5 space-y-4 text-xs sm:text-sm">
            {savedNotice && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Bildirim tercihleriniz güncellendi ve tarayıcınıza kaydedildi.
              </div>
            )}

            {testSent && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-lg text-xs font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Test bildirimi gönderildi!
              </div>
            )}

            {/* Core Toggles */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                    Anlık Web Push Bildirimleri
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Önemli son dakika gelişmelerini tarayıcınıza push olarak alın.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.breakingNewsPush}
                  onChange={(e) => setPrefs({ ...prefs, breakingNewsPush: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-blue-500" /> Sesli Uyarı Sesi (Chime)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Kritik son dakika haberi düştüğünde kısa sesli ikaz verilsin.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.soundAlerts}
                  onChange={(e) => setPrefs({ ...prefs, soundAlerts: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-purple-500" /> Sessiz Saatler Modu
                  </span>
                  <span className="text-[11px] text-slate-500">
                    23:00 ile 08:00 arasında sesli ve push uyarıları sessize al.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.quietHoursEnabled}
                  onChange={(e) => setPrefs({ ...prefs, quietHoursEnabled: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
              </label>
            </div>

            {/* Category Preferences (Only alert for selected categories) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Hangi Kategorilerden Bildirim Almak İstersiniz?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.filter((c) => c.id !== 'hepsi').map((cat) => {
                  const isChecked = prefs.categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleToggleCategory(cat.id)}
                      className={`p-2 rounded-lg border text-xs font-medium text-left transition flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Digest */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" /> Günlük Tuzla E-Bülten Özeti
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Günün en önemli 5 haberi her sabah 08:30'da e-postanıza gelsin.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.emailDigest}
                  onChange={(e) => setPrefs({ ...prefs, emailDigest: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
              </label>

              {prefs.emailDigest && (
                <input
                  type="email"
                  value={prefs.userEmail}
                  onChange={(e) => setPrefs({ ...prefs, userEmail: e.target.value })}
                  placeholder="eposta@adresiniz.com"
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 mt-2"
                />
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSendTestPush}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Test Bildirimi Gönder
              </button>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-lg shadow-xs transition cursor-pointer"
              >
                Ayarları Kaydet
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Recent Notifications Inbox */}
        {activeTab === 'inbox' && (
          <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
            {breakingList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectBreaking(item);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition cursor-pointer border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">
                    {item.urgency}
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.timestamp}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
