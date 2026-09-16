export type CategoryId = 
  | 'hepsi'
  | 'tuzla-yerel'
  | 'asayis'
  | 'tersane-ekonomi'
  | 'siyaset'
  | 'belediye'
  | 'yasam'
  | 'spor'
  | 'kultur-sanat';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  color: string;
  iconName: string;
}

export interface Comment {
  id: string;
  newsId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected' | 'spam';
  likes: number;
  dislikes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  spot: string;
  content: string;
  category: CategoryId;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  views: number;
  isHeadline: boolean;
  isEditorsPick?: boolean;
  headlineOrder?: number;
  readTimeMinutes: number;
  tags: string[];
  commentsCount: number;
  adEnabled?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BreakingNews {
  id: string;
  title: string;
  summary: string;
  category: CategoryId;
  urgency: 'critical' | 'high' | 'normal';
  timestamp: string;
  active: boolean;
  relatedNewsId?: string;
  expiresAt?: string;
}

export type UserRole = 'super_admin' | 'editor' | 'reporter' | 'moderator' | 'reader';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface AdPlacement {
  id: string;
  name: string;
  location: 'header_top' | 'headline_bottom' | 'sidebar_sticky' | 'in_article' | 'mobile_bottom';
  imageUrl: string;
  targetUrl: string;
  sponsorName: string;
  active: boolean;
  impressions: number;
  clicks: number;
  width: number;
  height: number;
}

export interface NotificationPreferences {
  enabled: boolean;
  breakingNewsPush: boolean;
  soundAlerts: boolean;
  categories: CategoryId[];
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  emailDigest: boolean;
  userEmail: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  details: string;
  ip: string;
  level: 'info' | 'warn' | 'error' | 'security';
}

export interface AnalyticsStats {
  totalViewsToday: number;
  uniqueVisitors: number;
  activeReadersNow: number;
  avgReadTimeSeconds: number;
  bounceRate: number;
  mobilePercentage: number;
  hourlyTraffic: { hour: string; views: number; mobile: number; desktop: number }[];
  categoryDistribution: { name: string; count: number; percentage: number }[];
  topArticles: { id: string; title: string; views: number; category: string }[];
}
