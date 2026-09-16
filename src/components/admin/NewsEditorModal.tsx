import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Image as ImageIcon, 
  FileText, 
  Sparkles, 
  Clock, 
  Tag, 
  Globe, 
  CheckCircle,
  Layers
} from 'lucide-react';
import { NewsItem, Category, CategoryId, CurrentUser } from '../../types';
import { storageService } from '../../services/storageService';

interface NewsEditorModalProps {
  categories: Category[];
  currentUser: CurrentUser;
  onClose: () => void;
  onNewsSaved: (news: NewsItem) => void;
  editingNews?: NewsItem | null;
}

const PRESET_IMAGES = [
  { label: 'Tuzla Marina & Sahil', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tuzla Tersaneler & Gemi', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tuzla Şehir & Belediye', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Asayiş & Emniyet', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tuzlaspor & Futbol', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Teknoloji & Sanayi', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
];

export const NewsEditorModal: React.FC<NewsEditorModalProps> = ({
  categories,
  currentUser,
  onClose,
  onNewsSaved,
  editingNews,
}) => {
  const [title, setTitle] = useState(editingNews?.title || '');
  const [spot, setSpot] = useState(editingNews?.spot || '');
  const [content, setContent] = useState(editingNews?.content || '');
  const [category, setCategory] = useState<CategoryId>(editingNews?.category || 'tuzla-yerel');
  const [coverImage, setCoverImage] = useState(
    editingNews?.coverImage || PRESET_IMAGES[0].url
  );
  const [tagsInput, setTagsInput] = useState(editingNews?.tags?.join(', ') || 'Tuzla, İstanbul, Gündem');
  const [isHeadline, setIsHeadline] = useState(editingNews?.isHeadline ?? true);
  const [adEnabled, setAdEnabled] = useState(editingNews?.adEnabled ?? true);
  const [seoTitle, setSeoTitle] = useState(editingNews?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(editingNews?.seoDescription || '');

  // Estimated reading time calculation in real-time
  const estimatedReadingTime = storageService.calculateReadingTime(content + ' ' + spot);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Lütfen haber başlığı ve içerik alanını doldurun.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingNews) {
      const updated: NewsItem = {
        ...editingNews,
        title,
        spot,
        content,
        category,
        coverImage,
        tags,
        isHeadline,
        adEnabled,
        readTimeMinutes: estimatedReadingTime,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || spot,
      };
      storageService.updateNews(updated, currentUser);
      onNewsSaved(updated);
    } else {
      const created = storageService.addNews(
        {
          title,
          spot,
          content,
          category,
          coverImage,
          author: {
            name: currentUser.name,
            role: currentUser.role === 'super_admin' ? 'Genel Yayın Yönetmeni' : 'Haber Editörü',
            avatar: currentUser.avatar,
          },
          isHeadline,
          readTimeMinutes: estimatedReadingTime,
          tags,
          adEnabled,
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || spot,
        },
        currentUser
      );
      onNewsSaved(created);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="font-extrabold text-sm sm:text-base">
              {editingNews ? 'Haberi Düzenle' : 'Bilgi Giriş Bölümü: Yeni Haber Ekle'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 text-xs sm:text-sm">
          {/* Main Title & Spot */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Haber Başlığı *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Tuzla Sahil Yolu Genişletme Projesinde İlk Kazma Vuruldu"
                className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Spot / Özet (Haber Giriş Metni) *
              </label>
              <textarea
                value={spot}
                onChange={(e) => setSpot(e.target.value)}
                placeholder="Haberin çarpıcı 1-2 cümlelik özeti..."
                rows={2}
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden resize-none"
                required
              />
            </div>
          </div>

          {/* Category & Headline Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Haber Kategorisi *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              >
                {categories.filter((c) => c.id !== 'hepsi').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isHeadline}
                  onChange={(e) => setIsHeadline(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">Manşet Alanında Göster</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={adEnabled}
                  onChange={(e) => setAdEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">Reklam Alanı Aktif</span>
              </label>
            </div>
          </div>

          {/* Cover Image URL & Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Kapak Görseli URL'si *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 text-xs px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                required
              />
            </div>

            {/* Quick image preset buttons */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-slate-500 font-semibold mr-1">Tuzla Şablon Görselleri:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCoverImage(preset.url)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition cursor-pointer ${
                    coverImage === preset.url
                      ? 'bg-red-600 text-white border-red-600 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Image Preview */}
            {coverImage && (
              <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-2">
                <img src={coverImage} alt="Önizleme" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Full Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Haber Tam Metni *
              </label>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Tahmini Okuma: {estimatedReadingTime} dakika ({content.split(/\s+/).filter(Boolean).length} kelime)
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Haberin detaylı içeriğini buraya yazın..."
              rows={8}
              className="w-full text-xs sm:text-sm p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden font-serif"
              required
            />
          </div>

          {/* Tags & SEO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Etiketler (Virgülle ayırın)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tuzla, Asayiş, Gündem, Haber"
                className="w-full text-xs px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                SEO Başlığı (Opsiyonel)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Arama motorları için özel başlık"
                className="w-full text-xs px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs cursor-pointer"
            >
              İptal
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingNews ? 'Değişiklikleri Kaydet' : 'Haberi Yayına Al'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
