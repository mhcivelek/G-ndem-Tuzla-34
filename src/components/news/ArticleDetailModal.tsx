import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Eye, 
  Calendar, 
  User, 
  Volume2, 
  VolumeX, 
  Type, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Tag, 
  Share2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { NewsItem, Comment, Category, CurrentUser } from '../../types';
import { SocialShareButtons } from './SocialShareButtons';
import { storageService } from '../../services/storageService';

interface ArticleDetailModalProps {
  news: NewsItem;
  category?: Category;
  categories: Category[];
  allNews: NewsItem[];
  currentUser: CurrentUser;
  onClose: () => void;
  onSelectRelatedNews: (item: NewsItem) => void;
  inArticleAdSlot?: React.ReactNode;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  news,
  category,
  categories,
  allNews,
  currentUser,
  onClose,
  onSelectRelatedNews,
  inArticleAdSlot,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState(currentUser.role !== 'reader' ? currentUser.name : '');
  const [authorEmail, setAuthorEmail] = useState(currentUser.email || '');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Load comments for this news
  useEffect(() => {
    const list = storageService.getCommentsForNews(news.id);
    setComments(list);
    storageService.incrementViews(news.id);
  }, [news.id]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const [speechWarning, setSpeechWarning] = useState('');

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechWarning('Tarayıcınız veya ortam sesli okuma özelliğini desteklemiyor.');
      setTimeout(() => setSpeechWarning(''), 4000);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${news.title}. ${news.spot}. ${news.content.substring(0, 500)}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'tr-TR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    const result = storageService.addComment(
      news.id,
      authorName || 'Tuzlalı Okur',
      authorEmail,
      commentContent
    );

    setCommentContent('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 5000);
  };

  const handleLikeComment = (commentId: string) => {
    storageService.likeComment(commentId);
    setComments(storageService.getCommentsForNews(news.id));
  };

  const relatedNews = allNews
    .filter((n) => n.id !== news.id && (n.category === news.category || n.tags.some((t) => news.tags.includes(t))))
    .slice(0, 3);

  const textSizeClass = 
    fontSize === 'xlarge' ? 'text-lg sm:text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-base sm:text-lg leading-relaxed' :
    'text-sm sm:text-base leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`${category?.color || 'bg-red-600'} text-white font-bold text-xs px-2.5 py-1 rounded uppercase tracking-wider`}>
              {category?.name || news.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {news.publishedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader Button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                isSpeaking 
                  ? 'bg-amber-500 text-slate-950 animate-pulse' 
                  : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
              }`}
              title={isSpeaking ? 'Sesli Okumayı Durdur' : 'Haberi Sesli Dinle'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Durdur' : 'Sesli Dinle'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded p-0.5 text-xs font-bold text-slate-700 dark:text-slate-200">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-slate-900 shadow-xs' : ''}`}
                title="Normal Metin Boyutu"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm ${fontSize === 'large' ? 'bg-white dark:bg-slate-900 shadow-xs' : ''}`}
                title="Büyük Metin Boyutu"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-base ${fontSize === 'xlarge' ? 'bg-white dark:bg-slate-900 shadow-xs' : ''}`}
                title="Çok Büyük Metin Boyutu"
              >
                A++
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <div className="overflow-y-auto px-4 sm:px-8 py-6 space-y-6 flex-1">
          {speechWarning && (
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 p-2.5 rounded-lg text-xs font-semibold">
              {speechWarning}
            </div>
          )}
          {/* Article Title */}
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {news.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <img
                src={news.author.avatar}
                alt={news.author.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-red-500/20"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{news.author.name}</p>
                <p className="text-[11px] text-slate-500">{news.author.role}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold px-2 py-1 rounded">
                <Clock className="w-3.5 h-3.5" />
                {news.readTimeMinutes} dakika okuma süresi
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {news.views.toLocaleString('tr-TR')}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {comments.length} Yorum
              </span>
            </div>
          </div>

          {/* Social Media Share Bar (Prominent Top) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <SocialShareButtons title={news.title} size="md" />
          </div>

          {/* Featured Cover Image */}
          <div className="rounded-xl overflow-hidden shadow-md aspect-16/9 bg-slate-100 dark:bg-slate-800 relative">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Spot / Lead Paragraph */}
          <p className="text-base sm:text-xl font-semibold text-slate-700 dark:text-slate-200 leading-relaxed border-l-4 border-red-600 pl-4 py-1 italic bg-slate-50 dark:bg-slate-800/40 rounded-r">
            {news.spot}
          </p>

          {/* Main Article Body (High readability serif/sans) */}
          <div className={`text-slate-800 dark:text-slate-200 space-y-4 font-serif ${textSizeClass}`}>
            {news.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* In-Article Sponsor Ad (if enabled) */}
          {news.adEnabled && inArticleAdSlot && (
            <div className="my-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">SPONSORLU BAĞLANTI / REKLAM</span>
              {inArticleAdSlot}
            </div>
          )}

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Etiketler:
              </span>
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium hover:bg-red-50 hover:text-red-600 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Media Share Bar (Bottom) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <SocialShareButtons title={news.title} size="md" />
          </div>

          {/* Related Tuzla News */}
          {relatedNews.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                İlginizi Çekebilecek Diğer Tuzla Haberleri
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedNews.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedNews(rel)}
                    className="group cursor-pointer bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 transition"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full aspect-16/10 object-cover rounded-lg mb-2 group-hover:scale-102 transition"
                    />
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-500 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- INTERACTIVE COMMENT SECTION --- */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-600" />
                Okur Yorumları ({comments.length})
              </h3>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Moderasyon Korumalı
              </span>
            </div>

            {/* Notification alert on submit */}
            {commentSubmitted && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Yorumunuz başarıyla alındı!</strong> Topluluk kurallarımız gereği moderasyon onayından sonra sayfada yayınlanacaktır.
                </span>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Hızlı Yorum Yap</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Adınız Soyadınız (Örn: Ahmet Yılmaz)"
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="E-posta Adresiniz (Yayınlanmaz)"
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Bu haber hakkındaki düşüncelerinizi paylaşın... (Hakaret ve nefret söylemi içeren yorumlar onaylanmaz)"
                rows={3}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 resize-none"
                required
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Tuzla 34 tarafsız yayın ilkelerine tabidir.
                </span>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Yorumu Gönder
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {comments.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  Henüz yorum yapılmamış. İlk yorumu siz yapın!
                </div>
              ) : (
                comments.map((cmt) => (
                  <div
                    key={cmt.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
                          {cmt.authorName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{cmt.authorName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{cmt.createdAt}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                      {cmt.content}
                    </p>

                    <div className="flex items-center justify-end gap-2 text-xs pt-1 pl-8">
                      <button
                        onClick={() => handleLikeComment(cmt.id)}
                        className="flex items-center gap-1 text-slate-500 hover:text-red-600 text-[11px] transition cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Faydalı ({cmt.likes})</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
