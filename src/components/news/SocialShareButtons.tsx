import React, { useState } from 'react';
import { 
  Share2, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Send, 
  Link2, 
  Check, 
  Printer 
} from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  title,
  url = window.location.href,
  size = 'md',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`${title} | Gündem Tuzla 34`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const btnClass = size === 'sm'
    ? 'p-1.5 rounded-md text-xs transition flex items-center justify-center'
    : 'p-2 rounded-lg text-sm transition flex items-center justify-center font-medium gap-1.5';

  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Paylaş:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs`}
        title="WhatsApp'ta Paylaş"
      >
        <MessageCircle className="w-4 h-4" />
        {size === 'md' && <span className="hidden sm:inline">WhatsApp</span>}
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=gundemtuzla34`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600 shadow-xs`}
        title="X'te (Twitter) Paylaş"
      >
        <Twitter className="w-4 h-4" />
        {size === 'md' && <span className="hidden sm:inline">X</span>}
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-blue-700 hover:bg-blue-800 text-white shadow-xs`}
        title="Facebook'ta Paylaş"
      >
        <Facebook className="w-4 h-4" />
        {size === 'md' && <span className="hidden sm:inline">Facebook</span>}
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-blue-800 hover:bg-blue-900 text-white shadow-xs`}
        title="LinkedIn'de Paylaş"
      >
        <Linkedin className="w-4 h-4" />
        {size === 'md' && <span className="hidden sm:inline">LinkedIn</span>}
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-sky-500 hover:bg-sky-600 text-white shadow-xs`}
        title="Telegram'da Paylaş"
      >
        <Send className="w-4 h-4" />
        {size === 'md' && <span className="hidden sm:inline">Telegram</span>}
      </a>

      {/* Link Copy */}
      <button
        onClick={handleCopyLink}
        className={`${btnClass} bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer`}
        title="Bağlantıyı Kopyala"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
        {size === 'md' && <span>{copied ? 'Kopyalandı!' : 'Linki Kopyala'}</span>}
      </button>

      {/* Print */}
      <button
        onClick={handlePrint}
        className={`${btnClass} bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer hidden sm:flex`}
        title="Yazdır / PDF Olarak Kaydet"
      >
        <Printer className="w-4 h-4" />
      </button>
    </div>
  );
};
