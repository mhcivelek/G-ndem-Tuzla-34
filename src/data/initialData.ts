import { Category, NewsItem, BreakingNews, AdPlacement, SystemLog, Comment, CurrentUser } from '../types';

export const CURRENT_ROLES: Record<string, CurrentUser> = {
  super_admin: {
    id: 'usr-admin',
    name: 'Metin Halis Çivelek',
    email: 'yonetim@gundemtuzla34.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
  editor: {
    id: 'usr-edit',
    name: 'Hakan Şentürk',
    email: 'hakan.senturk@gundemtuzla34.com',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  moderator: {
    id: 'usr-mod',
    name: 'Cemre Aydın',
    email: 'moderasyon@gundemtuzla34.com',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  reader: {
    id: 'usr-reader',
    name: 'Tuzlalı Okur',
    email: 'okur@gundemtuzla34.com',
    role: 'reader',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'hepsi', name: 'Tüm Haberler', slug: 'tum-haberler', color: 'bg-slate-700', iconName: 'Layers' },
  { id: 'tuzla-yerel', name: 'Tuzla Yerel', slug: 'tuzla-yerel', color: 'bg-red-600', iconName: 'MapPin' },
  { id: 'asayis', name: 'Asayiş', slug: 'asayis', color: 'bg-amber-600', iconName: 'ShieldAlert' },
  { id: 'tersane-ekonomi', name: 'Tersane & Sanayi', slug: 'tersane-ekonomi', color: 'bg-blue-600', iconName: 'Anchor' },
  { id: 'belediye', name: 'Belediye & Hizmet', slug: 'belediye', color: 'bg-emerald-600', iconName: 'Building2' },
  { id: 'siyaset', name: 'Siyaset', slug: 'siyaset', color: 'bg-purple-600', iconName: 'Vote' },
  { id: 'yasam', name: 'Yaşam & Çevre', slug: 'yasam', color: 'bg-teal-600', iconName: 'Trees' },
  { id: 'spor', name: 'Tuzlaspor & Spor', slug: 'spor', color: 'bg-cyan-600', iconName: 'Trophy' },
  { id: 'kultur-sanat', name: 'Kültür & Sanat', slug: 'kultur-sanat', color: 'bg-rose-600', iconName: 'Palette' },
];

export const INITIAL_BREAKING_NEWS: BreakingNews[] = [
  {
    id: 'brk-1',
    title: 'SON DAKİKA: Tuzla Sahil Yolu İçmeler Kavşağında Trafik Kazası - Trafik Tek Şeritten Sağlanıyor',
    summary: 'İçmeler mevkiinde meydana gelen zincirleme trafik kazası nedeniyle ekipler bölgeye sevk edildi. Sürücülerin E-5 ve D-100 alternatif güzergahlarını kullanması öneriliyor.',
    category: 'asayis',
    urgency: 'critical',
    timestamp: '5 dakika önce',
    active: true,
  },
  {
    id: 'brk-2',
    title: 'Tuzla Tersaneler Bölgesinde Yeni Nesil Hibrit Römorkör Denize İndirildi',
    summary: 'Türkiye nin en büyük özel tersanelerinden birinde sıfır emisyon hedefiyle üretilen modern hibrit römorkör törenle suya indirildi.',
    category: 'tersane-ekonomi',
    urgency: 'high',
    timestamp: '22 dakika önce',
    active: true,
  },
  {
    id: 'brk-3',
    title: 'Meteoroloji Tuzla ve Anadolu Yakası İçin Kuvvetli Lodos ve Sağanak Uyarısı Yaptı',
    summary: 'Bu gece yarısından itibaren etkisini artırması beklenen fırtına nedeniyle sahil şeridindeki vatandaşların ve balıkçıların tedbirli olması istendi.',
    category: 'yasam',
    urgency: 'normal',
    timestamp: '45 dakika önce',
    active: true,
  },
  {
    id: 'brk-4',
    title: 'Tuzlaspor Hafta Sonu Oynanacak Kritik Maç İçin Hazırlıklarını Tamamladı',
    summary: 'Kendi evinde taraftarı önünde sahaya çıkacak olan mavi-beyazlı ekipte moraller yüksek.',
    category: 'spor',
    urgency: 'normal',
    timestamp: '1 saat önce',
    active: true,
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'tuzla-101',
    title: 'Tuzla Marina ve Mercan Koyu Sahil Düzenleme Projesinde İkinci Etap Tamamlandı',
    spot: 'Tuzla halkının denizle buluştuğu Mercan Koyu ve sahil bandında yürüyüş yolları, bisiklet parkurları ve yeşil dinlenme alanları hizmete açıldı.',
    content: `İstanbul'un güney kapısı ve deniz kenti kimliğiyle öne çıkan Tuzla'da, sahil düzenleme çalışmaları hız kesmeden sürüyor. Mercan Koyu ile Viaport Marina arasındaki sahil şeridinde yürütülen 2. etap çevre düzenlemesi projesi törenle halkın kullanımına sunuldu.

Proje kapsamında 4.5 kilometrelik kesintisiz bisiklet ve koşu yolu tamamlanırken, 35 bin metrekarelik yeni rekreasyon alanı oluşturuldu. Sahil bandında kurulan güneş enerjili aydınlatma sistemleri ve çevre dostu kent mobilyaları çevre sakinlerinin büyük beğenisini topladı.

Yetkililer yaptıkları açıklamada: "Tuzla'nın sahip olduğu eşsiz sahil potansiyelini doğaya saygılı bir yaklaşımla koruyor ve vatandaşlarımızın nefes alabileceği modern sosyal alanlara dönüştürüyoruz. Önümüzdeki aylarda Kamil Abdüş Gölü kuş cenneti çevresindeki yürüyüş yollarının da entegrasyonu tamamlanacak." ifadelerini kullandı.

Ayrıca sahil boyunca yerleştirilen engelsiz erişim rampaları ve akıllı şarj istasyonları da modern şehircilik standartlarında örnek bir uygulama olarak dikkat çekiyor.`,
    category: 'tuzla-yerel',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Hakan Şentürk',
      role: 'Kıdemli Yerel Muhabir',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-16 11:30',
    views: 4820,
    isHeadline: true,
    headlineOrder: 1,
    readTimeMinutes: 4,
    tags: ['Tuzla Sahil', 'Mercan Koyu', 'Marina', 'Çevre Düzenlemesi'],
    commentsCount: 14,
    adEnabled: true,
    seoTitle: 'Tuzla Marina ve Mercan Koyu 2. Etap Düzenlemesi Tamamlandı',
    seoDescription: 'Tuzla sahil şeridinde yeni bisiklet yolları ve park alanları açıldı.',
  },
  {
    id: 'tuzla-102',
    title: 'Tuzla Tersaneler Bölgesi Küresel Yeşil Gemi Dönüşümünde Liderliğe Oynuyor',
    spot: 'Avrupa ve dünya denizcilik sektörünün rotasını çevirdiği Tuzla Tersaneleri, elektrikli ve amonyak yakıtlı gemi dönüşüm projelerinde sipariş rekoru kırdı.',
    content: `Türkiye gemi inşa sanayisinin kalbi konumundaki Tuzla Tersaneler Bölgesi, uluslararası yeşil mutabakat kriterlerine uygun olarak yeni nesil çevre dostu gemi teknolojilerine öncülük ediyor.

Son altı ayda Norveç, Hollanda ve Almanya başta olmak üzere denizcilik devlerinden alınan hibrit ve LNG yakıtlı gemi siparişlerinin toplam değeri 850 milyon doları aştı. Tuzla'daki mühendisler, yerli AR-GE merkezlerinde geliştirilen batarya yönetim sistemlerini ticari gemilere başarıyla entegre ediyor.

GİSBİR (Türkiye Gemi İnşa Sanayicileri Birliği) temsilcileri, Tuzla'nın nitelikli iş gücü, yüksek tersane kapasitesi ve stratejik konumu ile dünyanın en güvenilir gemi inşa ve bakım merkezleri arasında yer aldığını vurguladı. Bölgede 30 binden fazla kişiye doğrudan ve dolaylı istihdam sağlanmaya devam ediyor.`,
    category: 'tersane-ekonomi',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Murat Yalçın',
      role: 'Ekonomi ve Sanayi Editörü',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-16 09:45',
    views: 3950,
    isHeadline: true,
    headlineOrder: 2,
    readTimeMinutes: 3,
    tags: ['Tuzla Tersaneleri', 'Gemi İnşa', 'Sanayi', 'İhracat'],
    commentsCount: 8,
    adEnabled: true,
  },
  {
    id: 'tuzla-103',
    title: 'Tuzla da Gençler ve Çocuklar İçin Yeni Bilim ve Kodlama Kampüsü Kapılarını Açtı',
    spot: 'Şifa Mahallesi ile Mimar Sinan Mahallesi kesişiminde kurulan ileri teknoloji eğitim merkezi, yapay zeka ve robotik atölyeleriyle gençleri geleceğe hazırlıyor.',
    content: `Tuzla Belediyesi ve Sanayi Bakanlığı iş birliğiyle hayata geçirilen Tuzla Teknoloji ve Girişimcilik Kampüsü, düzenlenen törenle öğrenci ve genç girişimcilerin kullanımına açıldı.

Merkezde ilköğretimden üniversite çağına kadar tüm gençlere ücretsiz robotik kodlama, Python, yapay zeka modelleme ve 3D tasarım dersleri verilecek. Ayrıca kampüs içerisinde Tuzla Organize Sanayi Bölgesi (İTOSB) firmalarıyla ortak staj ve mentorluk programları uygulanacak.

Açılışta konuşan proje yöneticileri: "Teknolojiye meraklı çocuklarımızın fikirlerini prototiplere dönüştürebileceği laboratuvarları kurduk. Tuzla sadece bir sanayi üssü değil, aynı zamanda dijital çağın yetenek merkezi olacak." dedi.`,
    category: 'belediye',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Selin Karaca',
      role: 'Eğitim & Teknoloji Muhabiri',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-16 08:20',
    views: 2840,
    isHeadline: true,
    headlineOrder: 3,
    readTimeMinutes: 3,
    tags: ['Eğitim', 'Teknoloji', 'Tuzla Belediyesi', 'Gençlik'],
    commentsCount: 6,
    adEnabled: true,
  },
  {
    id: 'tuzla-104',
    title: 'Tuzla Emniyeti nden Huzur 34 Denetimi: 48 Noktada Eş Zamanlı Uygulama',
    spot: 'İlçe genelinde asayiş ve trafik güvenliğinin sağlanması amacıyla 250 personelin katılımıyla kapsamlı güvenlik denetimi gerçekleştirildi.',
    content: `Tuzla İlçe Emniyet Müdürlüğü koordinesinde gerçekleşen geniş çaplı asayiş uygulamasında, D-100 karayolu bağlantıları, tren istasyonları çevreleri, park ve meydanlar didik didik arandı.

Uygulama kapsamında 1.840 kişinin GBT sorgulaması yapılırken, aranan 9 şahıs yakalanarak adli mercilere sevk edildi. Trafik denetimlerinde ise 410 araç kontrol edildi, kural ihlali yapan sürücülere cezai işlem uygulandı.

Emniyet yetkilileri, Tuzla sakinlerinin huzur ve emniyeti için denetimlerin kararlılıkla devam edeceğini açıkladı.`,
    category: 'asayis',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Kemal Dağdelen',
      role: 'Asayiş Muhabiri',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-15 22:15',
    views: 5210,
    isHeadline: true,
    headlineOrder: 4,
    readTimeMinutes: 2,
    tags: ['Tuzla Emniyet', 'Asayiş', 'Huzur Denetimi', 'Güvenlik'],
    commentsCount: 19,
    adEnabled: false,
  },
  {
    id: 'tuzla-105',
    title: 'Tuzlaspor Transfer Sezonunu 3 Önemli Takviyeyle Kapattı',
    spot: 'Ligdeki üst sıra mücadelesini sürdüren mavi-beyazlı temsilcimiz, kadrosuna hücum ve savunma hattını güçlendiren 3 yeni oyuncu kattı.',
    content: `TFF 2. Ligde mücadele eden Tuzlaspor, teknik heyetin raporu doğrultusunda transfer çalışmalarını tamamladı. Kulüp tesislerinde düzenlenen imza töreniyle tecrübeli stoper, dinamik merkez orta saha ve genç forvet resmi sözleşmeye imza attı.

Kulüp Başkanı yaptığı basın açıklamasında: "Tuzla halkının gururu olan takımımızı layık olduğu üst liglere taşımak için mücadelemizi sürdürüyoruz. Tüm Tuzlalı sporseverleri hafta sonu stadımıza bekliyoruz." çağrısında bulundu.`,
    category: 'spor',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ahmet Yıldız',
      role: 'Spor Müdürü',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-15 17:50',
    views: 3120,
    isHeadline: false,
    readTimeMinutes: 2,
    tags: ['Tuzlaspor', 'Futbol', 'Transfer', 'Spor'],
    commentsCount: 11,
    adEnabled: true,
  },
  {
    id: 'tuzla-106',
    title: 'Tuzla da Tarihi İçmeler Şifalı Suları ve Termal Miras İçin Turizm Hamlesi',
    spot: 'Yüzyıllardır romatizmal hastalıklara ve deri rahatsızlıklarına iyi geldiği bilinen Tuzla İçmeler kaplıcaları modern bir termal sağlık merkezine kavuşuyor.',
    content: `Evliya Çelebi nin Seyahatnamesinde de övgüyle bahsettiği ünlü Tuzla İçmeler Maden Suları ve termal kaynakları, hazırlanacak yeni turizm master planı ile uluslararası sağlık turizmi destinasyonuna dönüştürülüyor.

Termal suyun mineral zenginliği laboratuvar analizleriyle tescillenirken, bölgede butik oteller, fizik tedavi merkezleri ve ekolojik dinlenme parkları inşa edilecek.

İstanbul Sağlık Turizmi Derneği ile koordineli yürütülen çalışma sayesinde Sabiha Gökçen Havalimanı na sadece 15 dakika mesafede olan Tuzla, yabancı sağlık turistleri için de cazibe merkezi haline gelecek.`,
    category: 'yasam',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Hakan Şentürk',
      role: 'Kıdemli Yerel Muhabir',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-15 14:10',
    views: 4100,
    isHeadline: false,
    readTimeMinutes: 3,
    tags: ['Tuzla İçmeler', 'Kaplıca', 'Sağlık Turizmi', 'Tarih'],
    commentsCount: 5,
    adEnabled: true,
  },
  {
    id: 'tuzla-107',
    title: 'Tuzla Belediyesi Meclisi Eylül Ayı Oturumu: Kentsel Dönüşüm Bütçesi Oybirliğiyle Geçti',
    spot: 'İlçe meclisinde görüşülen Aydınlı ve Şifa mahallelerindeki riskli yapıların dönüşümü maddesi tüm siyasi partilerin ortak oyuyla kabul edildi.',
    content: `Tuzla Belediye Meclisi 2026 yılı Eylül ayı olağan toplantısını gerçekleştirdi. Toplantının ana gündem maddesi olan kentsel dönüşüm kira yardımları ve ada bazlı imar revizyonu oybirliğiyle onaylandı.

Toplantıda konuşan grup başkanvekilleri, deprem gerçeğine karşı Tuzla da dayanıklı konut üretiminin siyaset üstü bir öncelik olduğunu belirterek vatandaşların uzlaşma ofislerine başvurması çağrısını yineledi.`,
    category: 'siyaset',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Murat Yalçın',
      role: 'Siyaset & Yerel Yönetimler',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-15 11:00',
    views: 2650,
    isHeadline: false,
    readTimeMinutes: 3,
    tags: ['Tuzla Meclisi', 'Kentsel Dönüşüm', 'İmar', 'Aydınlı'],
    commentsCount: 7,
    adEnabled: true,
  },
  {
    id: 'tuzla-108',
    title: 'Tuzla Sanat Günleri Başlıyor: İdris Güllüce Kültür Merkezi nde Dolu Dolu Program',
    spot: 'Tiyatro oyunları, açık hava sinema günleri ve yerel sanatçıların karma resim sergisi 10 gün boyunca Tuzlalı sanatseverlerle buluşacak.',
    content: `Kültür ve sanatın kalbi bu hafta Tuzla da atacak. İdris Güllüce Kültür Merkezi nde start alacak 'Tuzla Sanat Günleri' kapsamında usta tiyatrocular sahne alacak, çocuklara yönelik kukla ve drama atölyeleri düzenlenecek.

Etkinlik boyunca tüm gösterimlerin ücretsiz olacağı, kayıtların ise Tuzla Belediyesi kültür portali üzerinden yapılabileceği bildirildi.`,
    category: 'kultur-sanat',
    coverImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Selin Karaca',
      role: 'Kültür Sanat Editörü',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-14 18:30',
    views: 1980,
    isHeadline: false,
    readTimeMinutes: 2,
    tags: ['Tuzla Kültür', 'Tiyatro', 'İdris Güllüce', 'Sanat'],
    commentsCount: 3,
    adEnabled: true,
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'cmt-1',
    newsId: 'tuzla-101',
    authorName: 'Engin Vural',
    authorEmail: 'engin.vural@gmail.com',
    content: 'Mercan sahilinde hafta sonları ailemizle yürümek harika oldu. Bisiklet yolu da çok kaliteli yapılmış, emeği geçenlere teşekkürler.',
    createdAt: '2026-09-16 12:15',
    status: 'approved',
    likes: 12,
    dislikes: 0,
  },
  {
    id: 'cmt-2',
    newsId: 'tuzla-101',
    authorName: 'Merve Altın',
    authorEmail: 'merve.altin@outlook.com',
    content: 'Aydınlatmalar çok iyi düşünülmüş, akşam saatlerinde de güvenle yürünebiliyor. Kamil Abdüş Gölü rekreasyonunu da sabırsızlıkla bekliyoruz.',
    createdAt: '2026-09-16 13:00',
    status: 'approved',
    likes: 9,
    dislikes: 1,
  },
  {
    id: 'cmt-3',
    newsId: 'tuzla-102',
    authorName: 'Kaptan Levent Denizci',
    authorEmail: 'levent.kaptan@tuzlater sane.com',
    content: 'Tersanelerimizdeki mühendislik kabiliyeti dünyayla yarışıyor. Yeşil gemi inşa projesinde yer almaktan onur duyuyoruz.',
    createdAt: '2026-09-16 10:20',
    status: 'approved',
    likes: 24,
    dislikes: 0,
  },
  {
    id: 'cmt-4',
    newsId: 'tuzla-104',
    authorName: 'Mehmet Salih',
    authorEmail: 'salih34@mail.com',
    content: 'Emniyet güçlerimize teşekkür ederiz. Şifa ve Aydınlı civarında devriyelerin artması mahallemizi çok rahatlattı.',
    createdAt: '2026-09-15 23:10',
    status: 'approved',
    likes: 18,
    dislikes: 0,
  },
  {
    id: 'cmt-5',
    newsId: 'tuzla-101',
    authorName: 'Tuzlalı Balıkçı',
    authorEmail: 'balikci.tuzla@gmail.com',
    content: 'Sahil düzenlenirken amatör balıkçılar için ayrılan olta iskeleleri biraz daha genişletilebilirdi, yine de çok güzel.',
    createdAt: '2026-09-16 13:45',
    status: 'pending',
    likes: 4,
    dislikes: 0,
  }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: 'ad-head',
    name: 'Tepe Header Lider Banner (728x90)',
    location: 'header_top',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://gundemtuzla34.com/reklam/marina-konutlari',
    sponsorName: 'Tuzla Marina Rezidans & Yaşam Evleri',
    active: true,
    impressions: 14280,
    clicks: 412,
    width: 728,
    height: 90,
  },
  {
    id: 'ad-headline-sub',
    name: 'Manşet Altı Tam Boyut Banner (970x90)',
    location: 'headline_bottom',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://gundemtuzla34.com/reklam/tuzla-lezzet-festivali',
    sponsorName: 'Tuzla Balıkçıları & Gastronomi Şöleni',
    active: true,
    impressions: 9850,
    clicks: 345,
    width: 970,
    height: 90,
  },
  {
    id: 'ad-sidebar',
    name: 'Kenar Çubuğu Kule Banner (300x600)',
    location: 'sidebar_sticky',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://gundemtuzla34.com/reklam/tersane-lojistik',
    sponsorName: 'Tuzla Denizcilik & Uluslararası Lojistik A.Ş.',
    active: true,
    impressions: 18450,
    clicks: 580,
    width: 300,
    height: 600,
  },
  {
    id: 'ad-article',
    name: 'Haber İçi Sponsorlu Alan (300x250)',
    location: 'in_article',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://gundemtuzla34.com/reklam/tuzla-otomotiv',
    sponsorName: 'Tuzla Motorlu Araçlar & Servis Merkezi',
    active: true,
    impressions: 11200,
    clicks: 290,
    width: 300,
    height: 250,
  },
  {
    id: 'ad-mobile',
    name: 'Mobil Sabit Alt Banner (320x50)',
    location: 'mobile_bottom',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://gundemtuzla34.com/reklam/tuzla-sigorta',
    sponsorName: 'Tuzla Güven Sigorta Acentesi',
    active: true,
    impressions: 22100,
    clicks: 740,
    width: 320,
    height: 50,
  }
];

export const INITIAL_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-16 13:50:12',
    userId: 'usr-admin',
    userName: 'Metin Halis Çivelek',
    role: 'super_admin',
    action: 'SON_DAKIKA_YAYINLANDI',
    details: 'İçmeler Kavşağı kaza haberi acil koduyla yayına verildi.',
    ip: '195.175.22.41',
    level: 'info',
  },
  {
    id: 'log-2',
    timestamp: '2026-09-16 13:42:05',
    userId: 'usr-mod',
    userName: 'Moderatör Cem',
    role: 'moderator',
    action: 'YORUM_ONAYLANDI',
    details: 'tuzla-101 haberine yapılan #cmt-1 ve #cmt-2 onaylandı.',
    ip: '88.255.102.14',
    level: 'info',
  },
  {
    id: 'log-3',
    timestamp: '2026-09-16 12:30:19',
    userId: 'usr-edit',
    userName: 'Hakan Şentürk',
    role: 'editor',
    action: 'MANSET_GUNCELLEME',
    details: 'Mercan Koyu haberi 1. sıra manşet pozisyonuna sabitlendi.',
    ip: '212.156.40.92',
    level: 'info',
  },
  {
    id: 'log-4',
    timestamp: '2026-09-16 11:15:00',
    userId: 'system',
    userName: 'CacheManager',
    role: 'super_admin',
    action: 'ONBELLEK_TEMIZLEME',
    details: 'Otomatik TTL (300s) sonrasında haber önbellek katmanı yenilendi.',
    ip: '127.0.0.1',
    level: 'info',
  }
];

export const CATEGORIES = INITIAL_CATEGORIES;

