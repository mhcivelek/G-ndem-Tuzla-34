import { 
  NewsItem, 
  BreakingNews, 
  Comment, 
  AdPlacement, 
  SystemLog, 
  NotificationPreferences, 
  CurrentUser, 
  CategoryId 
} from '../types';
import { 
  INITIAL_NEWS, 
  INITIAL_BREAKING_NEWS, 
  INITIAL_COMMENTS, 
  INITIAL_ADS, 
  INITIAL_LOGS 
} from '../data/initialData';
import { cacheService } from './cacheService';

export const DEFAULT_CURRENT_USER: CurrentUser = {
  id: 'usr-admin-1',
  name: 'Metin Halis Çivelek',
  email: 'vsmetinhaliscivelek@gmail.com',
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  enabled: true,
  breakingNewsPush: true,
  soundAlerts: true,
  categories: ['tuzla-yerel', 'asayis', 'tersane-ekonomi', 'belediye'],
  quietHoursEnabled: false,
  quietHoursStart: '23:00',
  quietHoursEnd: '08:00',
  emailDigest: true,
  userEmail: 'vsmetinhaliscivelek@gmail.com',
};

class StorageService {
  private newsKey = 'gt34_news';
  private breakingKey = 'gt34_breaking';
  private commentsKey = 'gt34_comments';
  private adsKey = 'gt34_ads';
  private logsKey = 'gt34_logs';
  private prefsKey = 'gt34_user_prefs';
  private userKey = 'gt34_active_user';

  // Helper to estimate reading time from text
  public calculateReadingTime(text: string): number {
    const wordsPerMinute = 180;
    const cleanWords = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(cleanWords / wordsPerMinute));
  }

  // News CRUD with Caching
  public getNews(): NewsItem[] {
    const cacheKey = 'all_news_list';
    const cached = cacheService.get<NewsItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const raw = localStorage.getItem(this.newsKey);
      const news: NewsItem[] = raw ? JSON.parse(raw) : INITIAL_NEWS;
      cacheService.set(cacheKey, news, 120);
      return news;
    } catch {
      return INITIAL_NEWS;
    }
  }

  public saveNews(news: NewsItem[]): void {
    try {
      localStorage.setItem(this.newsKey, JSON.stringify(news));
      cacheService.invalidate('all_news_list');
      cacheService.invalidate('cat_');
    } catch {
      // storage exception
    }
  }

  public getNewsByCategory(category: CategoryId): NewsItem[] {
    if (category === 'hepsi') {
      return this.getNews();
    }
    const cacheKey = `cat_${category}`;
    const cached = cacheService.get<NewsItem[]>(cacheKey);
    if (cached) return cached;

    const all = this.getNews();
    const filtered = all.filter((n) => n.category === category);
    cacheService.set(cacheKey, filtered, 120);
    return filtered;
  }

  public addNews(item: Omit<NewsItem, 'id' | 'views' | 'commentsCount' | 'publishedAt'>, user: CurrentUser): NewsItem {
    const all = this.getNews();
    const newId = `tuzla-${Date.now()}`;
    const readTime = this.calculateReadingTime(item.content + ' ' + item.spot);
    
    const created: NewsItem = {
      ...item,
      id: newId,
      views: 1,
      commentsCount: 0,
      publishedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readTimeMinutes: readTime,
    };

    const updated = [created, ...all];
    this.saveNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'HABER_EKLENDI',
      details: `Yeni haber yayınlandı: "${created.title}" [Kategori: ${created.category}]`,
      ip: '195.175.22.41',
      level: 'info',
    });

    return created;
  }

  public updateNews(item: NewsItem, user: CurrentUser): void {
    const all = this.getNews();
    const updated = all.map((n) => (n.id === item.id ? item : n));
    this.saveNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'HABER_GUNCELENDI',
      details: `Haber güncellendi: "${item.title}"`,
      ip: '195.175.22.41',
      level: 'info',
    });
  }

  public deleteNews(id: string, user: CurrentUser): void {
    const all = this.getNews();
    const target = all.find((n) => n.id === id);
    const updated = all.filter((n) => n.id !== id);
    this.saveNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'HABER_SILINDI',
      details: `Haber silindi: "${target ? target.title : id}"`,
      ip: '195.175.22.41',
      level: 'warn',
    });
  }

  public incrementViews(id: string): void {
    const all = this.getNews();
    const updated = all.map((n) => {
      if (n.id === id) {
        return { ...n, views: n.views + 1 };
      }
      return n;
    });
    this.saveNews(updated);
  }

  // Breaking News (Ayrı Son Dakika)
  public getBreakingNews(): BreakingNews[] {
    const cacheKey = 'breaking_news_list';
    const cached = cacheService.get<BreakingNews[]>(cacheKey);
    if (cached) return cached;

    try {
      const raw = localStorage.getItem(this.breakingKey);
      const list: BreakingNews[] = raw ? JSON.parse(raw) : INITIAL_BREAKING_NEWS;
      cacheService.set(cacheKey, list, 60); // fast TTL for breaking
      return list;
    } catch {
      return INITIAL_BREAKING_NEWS;
    }
  }

  public saveBreakingNews(list: BreakingNews[]): void {
    try {
      localStorage.setItem(this.breakingKey, JSON.stringify(list));
      cacheService.invalidate('breaking_news_list');
    } catch {
      // ignore
    }
  }

  public addBreakingNews(
    title: string, 
    summary: string, 
    category: CategoryId, 
    urgency: 'critical' | 'high' | 'normal', 
    user: CurrentUser
  ): BreakingNews {
    const list = this.getBreakingNews();
    const newItem: BreakingNews = {
      id: `brk-${Date.now()}`,
      title,
      summary,
      category,
      urgency,
      timestamp: 'Şimdi',
      active: true,
    };
    const updated = [newItem, ...list];
    this.saveBreakingNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'SON_DAKIKA_GIRILDI',
      details: `[${urgency.toUpperCase()}] "${title}"`,
      ip: '195.175.22.41',
      level: urgency === 'critical' ? 'warn' : 'info',
    });

    return newItem;
  }

  public toggleBreakingNewsActive(id: string, active: boolean, user: CurrentUser): void {
    const list = this.getBreakingNews();
    const updated = list.map((b) => (b.id === id ? { ...b, active } : b));
    this.saveBreakingNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'SON_DAKIKA_DURUM_DEGISTI',
      details: `Haber ID ${id} aktiflik: ${active}`,
      ip: '195.175.22.41',
      level: 'info',
    });
  }

  public deleteBreakingNews(id: string, user: CurrentUser): void {
    const list = this.getBreakingNews();
    const updated = list.filter((b) => b.id !== id);
    this.saveBreakingNews(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'SON_DAKIKA_SILINDI',
      details: `Son dakika haberi silindi (ID: ${id})`,
      ip: '195.175.22.41',
      level: 'warn',
    });
  }

  // Comments CRUD & Moderation
  public getComments(): Comment[] {
    try {
      const raw = localStorage.getItem(this.commentsKey);
      return raw ? JSON.parse(raw) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  }

  public getCommentsForNews(newsId: string): Comment[] {
    const all = this.getComments();
    return all.filter((c) => c.newsId === newsId && c.status === 'approved');
  }

  public saveComments(comments: Comment[]): void {
    try {
      localStorage.setItem(this.commentsKey, JSON.stringify(comments));
    } catch {
      // ignore
    }
  }

  public addComment(
    newsId: string, 
    authorName: string, 
    authorEmail: string, 
    content: string
  ): { comment: Comment; requiresModeration: boolean } {
    const comments = this.getComments();
    // Basic automatic spam checking
    const isSpam = /viagra|casino|kripto|bahis|free money/i.test(content);
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      newsId,
      authorName: authorName.trim() || 'Tuzlalı Okur',
      authorEmail: authorEmail.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: isSpam ? 'spam' : 'pending', // goes to moderation queue
      likes: 0,
      dislikes: 0,
    };

    this.saveComments([newComment, ...comments]);

    this.addLog({
      userId: 'visitor',
      userName: newComment.authorName,
      role: 'reader',
      action: 'YORUM_GIRILDI',
      details: `Haber #${newsId} için yeni yorum yapıldı (${newComment.status})`,
      ip: '176.240.11.89',
      level: isSpam ? 'warn' : 'info',
    });

    return { comment: newComment, requiresModeration: true };
  }

  public updateCommentStatus(commentId: string, status: Comment['status'], user: CurrentUser): void {
    const comments = this.getComments();
    const updated = comments.map((c) => (c.id === commentId ? { ...c, status } : c));
    this.saveComments(updated);

    // Update count in news item if approved
    const target = comments.find((c) => c.id === commentId);
    if (target) {
      const news = this.getNews();
      const approvedCount = updated.filter((c) => c.newsId === target.newsId && c.status === 'approved').length;
      const updatedNews = news.map((n) => (n.id === target.newsId ? { ...n, commentsCount: approvedCount } : n));
      this.saveNews(updatedNews);
    }

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'YORUM_MODERASYONU',
      details: `Yorum #${commentId} durumu güncellendi: ${status.toUpperCase()}`,
      ip: '195.175.22.41',
      level: 'info',
    });
  }

  public likeComment(commentId: string): void {
    const comments = this.getComments();
    const updated = comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    this.saveComments(updated);
  }

  // Ads Management
  public getAds(): AdPlacement[] {
    try {
      const raw = localStorage.getItem(this.adsKey);
      return raw ? JSON.parse(raw) : INITIAL_ADS;
    } catch {
      return INITIAL_ADS;
    }
  }

  public saveAds(ads: AdPlacement[]): void {
    try {
      localStorage.setItem(this.adsKey, JSON.stringify(ads));
    } catch {
      // ignore
    }
  }

  public updateAdPlacement(ad: AdPlacement, user: CurrentUser): void {
    const ads = this.getAds();
    const updated = ads.map((a) => (a.id === ad.id ? ad : a));
    this.saveAds(updated);

    this.addLog({
      userId: user.id,
      userName: user.name,
      role: user.role,
      action: 'REKLAM_GUNCELENDI',
      details: `Reklam alanı "${ad.name}" ayarları güncellendi. Aktif: ${ad.active}`,
      ip: '195.175.22.41',
      level: 'info',
    });
  }

  public recordAdClick(adId: string): void {
    const ads = this.getAds();
    const updated = ads.map((a) => (a.id === adId ? { ...a, clicks: a.clicks + 1 } : a));
    this.saveAds(updated);
  }

  public recordAdImpression(adId: string): void {
    const ads = this.getAds();
    const updated = ads.map((a) => (a.id === adId ? { ...a, impressions: a.impressions + 1 } : a));
    this.saveAds(updated);
  }

  // System Logs
  public getLogs(): SystemLog[] {
    try {
      const raw = localStorage.getItem(this.logsKey);
      return raw ? JSON.parse(raw) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  }

  public addLog(log: Omit<SystemLog, 'id' | 'timestamp'>): void {
    const logs = this.getLogs();
    const newLog: SystemLog = {
      ...log,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    try {
      localStorage.setItem(this.logsKey, JSON.stringify([newLog, ...logs.slice(0, 99)]));
    } catch {
      // ignore
    }
  }

  // Notification Preferences
  public getNotificationPrefs(): NotificationPreferences {
    try {
      const raw = localStorage.getItem(this.prefsKey);
      return raw ? JSON.parse(raw) : DEFAULT_NOTIFICATION_PREFS;
    } catch {
      return DEFAULT_NOTIFICATION_PREFS;
    }
  }

  public saveNotificationPrefs(prefs: NotificationPreferences): void {
    try {
      localStorage.setItem(this.prefsKey, JSON.stringify(prefs));
    } catch {
      // ignore
    }
  }

  // Active User / Role Switching
  public getActiveUser(): CurrentUser {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : DEFAULT_CURRENT_USER;
    } catch {
      return DEFAULT_CURRENT_USER;
    }
  }

  public setActiveUser(user: CurrentUser): void {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } catch {
      // ignore
    }
  }

  // Backup & Reset
  public exportBackupJson(): string {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      site: 'Gündem Tuzla 34',
      news: this.getNews(),
      breaking: this.getBreakingNews(),
      comments: this.getComments(),
      ads: this.getAds(),
      logs: this.getLogs(),
    };
    return JSON.stringify(backup, null, 2);
  }

  public restoreDefaults(): void {
    localStorage.removeItem(this.newsKey);
    localStorage.removeItem(this.breakingKey);
    localStorage.removeItem(this.commentsKey);
    localStorage.removeItem(this.adsKey);
    localStorage.removeItem(this.logsKey);
    cacheService.clearAll();
  }
}

export const storageService = new StorageService();
