interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  timestamp: number;
  sourceKey: string;
}

export interface CachePerformanceStats {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  hitRatio: number;
  savedDatabaseQueries: number;
  estimatedTimeSavedMs: number;
  entriesCount: number;
}

class CacheService {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();
  private stats: CachePerformanceStats = {
    totalRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    hitRatio: 0,
    savedDatabaseQueries: 0,
    estimatedTimeSavedMs: 0,
    entriesCount: 0,
  };

  private defaultTTL = 180; // 3 minutes TTL default

  constructor() {
    this.loadStats();
  }

  private loadStats() {
    try {
      const saved = localStorage.getItem('gt34_cache_stats');
      if (saved) {
        this.stats = { ...this.stats, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
  }

  private saveStats() {
    try {
      localStorage.setItem('gt34_cache_stats', JSON.stringify(this.stats));
    } catch {
      // ignore
    }
  }

  public get<T>(key: string): T | null {
    this.stats.totalRequests++;
    const entry = this.memoryCache.get(key) as CacheEntry<T> | undefined;

    if (entry) {
      if (Date.now() < entry.expiresAt) {
        this.stats.cacheHits++;
        this.stats.savedDatabaseQueries++;
        this.stats.estimatedTimeSavedMs += 35; // Simulated 35ms DB query latency saved
        this.calculateRatio();
        return entry.data;
      } else {
        // Expired
        this.memoryCache.delete(key);
      }
    }

    // Try localStorage backup
    try {
      const raw = localStorage.getItem(`gt34_c_${key}`);
      if (raw) {
        const parsed: CacheEntry<T> = JSON.parse(raw);
        if (Date.now() < parsed.expiresAt) {
          this.memoryCache.set(key, parsed);
          this.stats.cacheHits++;
          this.stats.savedDatabaseQueries++;
          this.stats.estimatedTimeSavedMs += 25;
          this.calculateRatio();
          return parsed.data;
        } else {
          localStorage.removeItem(`gt34_c_${key}`);
        }
      }
    } catch {
      // ignore
    }

    this.stats.cacheMisses++;
    this.calculateRatio();
    return null;
  }

  public set<T>(key: string, data: T, ttlSeconds: number = this.defaultTTL): void {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
      timestamp: Date.now(),
      sourceKey: key,
    };

    this.memoryCache.set(key, entry as CacheEntry<unknown>);
    this.stats.entriesCount = this.memoryCache.size;

    try {
      localStorage.setItem(`gt34_c_${key}`, JSON.stringify(entry));
    } catch {
      // ignore storage quota
    }

    this.saveStats();
  }

  public invalidate(keyOrPrefix: string): void {
    for (const key of this.memoryCache.keys()) {
      if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
        this.memoryCache.delete(key);
        localStorage.removeItem(`gt34_c_${key}`);
      }
    }
    this.stats.entriesCount = this.memoryCache.size;
    this.saveStats();
  }

  public clearAll(): void {
    this.memoryCache.clear();
    this.stats.entriesCount = 0;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('gt34_c_')) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
    this.saveStats();
  }

  private calculateRatio() {
    if (this.stats.totalRequests > 0) {
      this.stats.hitRatio = Math.round((this.stats.cacheHits / this.stats.totalRequests) * 100);
    }
    this.saveStats();
  }

  public getStats(): CachePerformanceStats {
    return {
      ...this.stats,
      entriesCount: this.memoryCache.size,
    };
  }
}

export const cacheService = new CacheService();
