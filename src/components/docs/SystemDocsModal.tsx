import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Code, 
  Database, 
  AlertCircle, 
  Network, 
  Palette, 
  Cpu, 
  Server, 
  ShieldCheck, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface SystemDocsModalProps {
  onClose: () => void;
}

export const SystemDocsModal: React.FC<SystemDocsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'db' | 'errors' | 'microservices'>('overview');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white dark:bg-slate-900 max-w-5xl w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="font-black text-sm sm:text-base">
                Gündem Tuzla 34 - Sistem & Geliştirici Dokümantasyonu
              </h2>
              <p className="text-[11px] text-slate-400">
                Mimari standartlar, RESTful API, veritabanı şeması, hata kılavuzu ve mikroservis yol haritası.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs font-bold overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tasarım Standartları</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'api'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>API Uç Noktaları (REST)</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'db'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Veritabanı Şeması & Cache</span>
          </button>

          <button
            onClick={() => setActiveTab('errors')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'errors'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Hata Protokolleri & Çözümler</span>
          </button>

          <button
            onClick={() => setActiveTab('microservices')}
            className={`px-4 py-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'microservices'
                ? 'border-red-600 text-red-600 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Yüksek Trafik & Mikroservis Yol Haritası</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* TAB 1: DESIGN STANDARDS */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Gündem Tuzla 34 UI/UX ve Tasarım Standartları
              </h3>
              <p>
                Gündem Tuzla 34, yerel habercilikte yüksek okunabilirlik, mobil öncelikli ergonomi ve anlık son dakika tepkime hızını merkeze alan modern bir haber mimarisidir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    Tipografi & Okunabilirlik
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Başlıklarda ve manşetlerde yüksek kontrastlı sans-serif (Plus Jakarta Sans), haber gövdesinde ise uzun okuma konforu sağlayan editoryal serif yazı tipi uygulanmıştır. Metin boyutu A / A+ / A++ seçenekleriyle dinamik ayarlanabilir.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Çift Yönlü Son Dakika Modu
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Hem yatay döner bant (ticker) hem de dikey canlı akış (stream) modları bulunmaktadır. Masaüstü geniş ekranda yatay akarken, mobil cihazlarda dikey dokunmatik akış görünümüne kolayca geçilebilir.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Akıllı Okuma Süresi Motoru
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Dakikada 180 Türkçe kelime okuma hızı baz alınarak gerçek zamanlı hesaplanır. Hem haber listeleme kartlarında hem de haber içi detayda gösterilir.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    Reklam & Gelir Alanları (IAB Standartları)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Header 728x90, Manşet Altı 970x90, Sidebar 300x600, Haber İçi 300x250 ve Mobil Alt Sabit 320x50 alanları bağımsız kontrol edilebilir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: API ENDPOINTS */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2. RESTful API Uç Noktaları Kılavuzu
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold">GET</span>
                    <span className="font-bold text-slate-900 dark:text-white">/api/v1/news</span>
                  </div>
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                    Tüm aktif haberleri listeler. Parametreler: <code>?category=tuzla-yerel&limit=20&page=1</code>.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">POST</span>
                    <span className="font-bold text-slate-900 dark:text-white">/api/v1/news</span>
                  </div>
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                    Yeni haber oluşturur. Yetki gerektirir (Rol: <code>super_admin</code> veya <code>editor</code>).
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded font-bold">POST</span>
                    <span className="font-bold text-slate-900 dark:text-white">/api/v1/breaking/urgent</span>
                  </div>
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                    Ayrı Son Dakika Haberi Girişi: WebSocket + FCM Push anında yayınlar.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-600 text-white px-2 py-0.5 rounded font-bold">POST</span>
                    <span className="font-bold text-slate-900 dark:text-white">/api/v1/comments</span>
                  </div>
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                    Okur yorumu ekler. Durum varsayılan <code>status: 'pending'</code> olarak işaretlenir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DB SCHEMA & CACHE */}
          {activeTab === 'db' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3. Veritabanı Şeması, İndeksleme ve Önbellekleme (Cache)
              </h3>
              <p>
                Veritabanı sorgularını en aza indirmek ve sayfa açılışını 100ms altına düşürmek için katmanlı önbellek mekanizması (In-Memory L1 + Persistent Local Storage L2) kurulmuştur.
              </p>

              <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-2 border border-slate-800">
                <span className="text-emerald-400 font-bold">// News Entity Schema</span>
                <pre>{`TABLE news (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  spot TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(32) NOT NULL,
  author JSON NOT NULL,
  publishedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  readTimeMinutes INT NOT NULL,
  views BIGINT DEFAULT 0,
  commentsCount INT DEFAULT 0,
  isHeadline BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  INDEX idx_news_category_published (category, publishedAt DESC),
  INDEX idx_news_isHeadline (isHeadline)
);`}</pre>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs">
                <strong className="text-blue-900 dark:text-blue-300">Önbellek Geçerlilik Süresi (TTL):</strong>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  Manşet ve haber akışı için 180 saniye (3 dk), son dakika flaş haberleri için 30 saniye, reklam yerleşimleri için 600 saniye (10 dk) olarak yapılandırılmıştır. Yeni bir haber veya son dakika eklendiğinde ilgili anahtar anında <code>cacheService.invalidate()</code> ile geçersiz kılınır.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: ERROR PROTOCOLS */}
          {activeTab === 'errors' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4. Olası Hata Protokolleri ve Çözüm Adımları
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-rose-800 dark:text-rose-300">
                    ERR-01: Son Dakika Bantı Güncellenmiyor (Cache Invalidation Failure)
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Sebep:</strong> Kullanıcı tarayıcısında eski HTTP ETag veya bellek önbelleği kalmış olabilir.
                    <br />
                    <strong>Çözüm:</strong> Admin panelinden yeni bir son dakika flaşı girildiğinde otomatik olarak <code>cacheService.clear()</code> çağrılır ve WebSocket tüm bağlı kullanıcılara refresh sinyali gönderir.
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-amber-800 dark:text-amber-300">
                    ERR-02: Okur Yorumu Sayfada Görünmüyor
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Sebep:</strong> Spam koruması ve nefret söylemi önleme kuralları gereği yorumlar otomatik <code>pending</code> statüsündedir.
                    <br />
                    <strong>Çözüm:</strong> Moderasyon Panelinden (Genel Yayın Yönetmeni / Moderatör) onay verilmesi gereklidir.
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">
                    ERR-03: Web Push Bildirim İzni Verilemedi
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Sebep:</strong> Tarayıcı güvenlik ayarları veya gizli mod push bildirimlerini engellemiş olabilir.
                    <br />
                    <strong>Çözüm:</strong> Site ayarlarından "Bildirimlere İzin Ver" seçeneği aktifleştirilmeli ve Bildirim Merkezi'nden "Test Bildirimi Gönder" butonu ile doğrulanmalıdır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MICROSERVICES ROADMAP */}
          {activeTab === 'microservices' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-red-600" />
                5. Yüksek Trafik Durumunda Mikroservis Mimari Geçiş Yol Haritası
              </h3>
              <p>
                Tuzla yerel seçimleri, olağanüstü hava koşulları veya tersane/sanayi gelişmelerinde oluşabilecek ani 100.000+ eşzamanlı kullanıcı dalgalanmalarına karşı adım adım mikroservis geçiş planı:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-red-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Faz 1: Kenar Ağ ve Statik Dağıtım (Edge Caching / Cloudflare CDN)
                    </h4>
                    <span className="text-[10px] font-mono bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded font-bold">FAZ 1</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Tüm haber kapak görselleri, CSS ve JS paketleri CDN kenar sunucularına aktarılır. Ana haber listeleri için 60 saniyelik <code>stale-while-revalidate</code> HTTP başlıkları atanır.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-blue-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Faz 2: Okuma ve Yazma Veritabanı Ayrımı (CQRS & Read Replicas)
                    </h4>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded font-bold">FAZ 2</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Haber okuma trafiği 5 ayrı salt-okunur (read replica) PostgreSQL düğümüne yönlendirilir. Yorum yazma ve haber ekleme işlemleri ise ana birincil (master) düğüme gönderilir.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-amber-500 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Faz 3: Bağımsız Son Dakika & Push Servisi (Event-Driven Microservice)
                    </h4>
                    <span className="text-[10px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-bold">FAZ 3</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Son dakika flaş haberleri ve anlık push bildirimleri bağımsız bir Go/Node.js mikroservisine ve Redis Pub/Sub kümesine taşınır. Böylece haber sunucusu çökse dahi flaş uyarılar kesintisiz çalışmaya devam eder.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-emerald-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Faz 4: Asenkron Yorum Kuyruğu (RabbitMQ / Kafka)
                    </h4>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">FAZ 4</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Milyonluk kullanıcı kitlesi aynı anda haber altına yorum yazarken kuyruklama sistemi devreye girer. Yorumlar hafızada kuyruğa alınır ve moderasyon botu (AI filtreleme) tarafından taranarak veritabanına yazılır.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
