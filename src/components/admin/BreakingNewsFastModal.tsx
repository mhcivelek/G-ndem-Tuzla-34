import React, { useState } from 'react';
import { 
  Zap, 
  X, 
  AlertTriangle, 
  Send, 
  Bell, 
  Volume2, 
  Flame, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { Category, CategoryId, CurrentUser, BreakingNews } from '../../types';
import { storageService } from '../../services/storageService';

interface BreakingNewsFastModalProps {
  categories: Category[];
  currentUser: CurrentUser;
  onClose: () => void;
  onBreakingAdded: (item: BreakingNews) => void;
}

export const BreakingNewsFastModal: React.FC<BreakingNewsFastModalProps> = ({
  categories,
  currentUser,
  onClose,
  onBreakingAdded,
}) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<CategoryId>('asayis');
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'normal'>('critical');
  const [triggerPush, setTriggerPush] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem = storageService.addBreakingNews(
      title.trim(),
      summary.trim() || title.trim(),
      category,
      urgency,
      currentUser
    );

    // Audio chime sound effect if enabled
    if (playSound && typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch {
        // audio context blocked or not permitted
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      onBreakingAdded(newItem);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border-2 border-red-600 dark:border-red-500 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Header */}
        <div className="bg-red-600 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 fill-white animate-bounce" />
            <h2 className="font-black text-sm sm:text-base uppercase tracking-wider">
              Ayrı Son Dakika Haberi Girişi (Flaş Haber)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-red-700 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-in zoom-in-50" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Son Dakika Haberi Yayında!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Yatay ve dikey son dakika bantları güncellendi, okurlara anlık bildirim tetiklendi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
            {/* Urgency Level Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Aciliyet Derecesi
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('critical')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    urgency === 'critical'
                      ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Flame className="w-4 h-4 text-white" />
                  <span>Kritik (Kırmızı)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('high')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    urgency === 'high'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Acil (Sarı)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('normal')}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    urgency === 'normal'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Güncel (Mavi)</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Son Dakika Başlığı *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: SON DAKİKA: Tuzla İçmeler Kavşağında Kaza - Yol Trafiğe Kapandı"
                className="w-full text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                required
                autoFocus
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Kısa Bilgi / Flaş Metin
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Olay yeri bilgisi, alternatif güzergahlar ve ilk resmi açıklamalar..."
                rows={2}
                className="w-full text-xs px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                İlgili Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full text-xs px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              >
                {categories.filter((c) => c.id !== 'hepsi').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trigger options */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={triggerPush}
                  onChange={(e) => setTriggerPush(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Kullanıcılara Anında Web Push Bildirimi Gönder</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={playSound}
                  onChange={(e) => setPlaySound(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Sitede Canlı Uyarı Sesi (Chime) Çal</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs cursor-pointer"
              >
                İptal
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Anında Yayına Al</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
