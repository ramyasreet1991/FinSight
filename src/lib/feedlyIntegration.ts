// Feedly API integration for news feeds
export interface FeedlyArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  published: string;
  updated: string;
  origin: {
    title: string;
    streamId: string;
    htmlUrl: string;
  };
  alternate: Array<{
    href: string;
    type: string;
  }>;
  visual?: {
    url: string;
    width: number;
    height: number;
  };
  categories: Array<{
    id: string;
    label: string;
  }>;
  tags: string[];
  keywords: string[];
  entities: Array<{
    name: string;
    type: string;
    confidence: number;
  }>;
}

export interface FeedlyStream {
  id: string;
  title: string;
  description: string;
  website: string;
  subscribers: number;
  velocity: number;
  topics: string[];
  language: string;
  contentType: string;
  lastUpdated: string;
}

export class FeedlyService {
  private apiKey: string;
  private baseUrl: string = 'https://cloud.feedly.com/v3';
  private userId: string | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Initialize Feedly service
  async initialize(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const profile = await response.json();
        this.userId = profile.id;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Feedly initialization failed:', error);
      return false;
    }
  }

  // Search for financial news streams
  async searchFinancialStreams(query: string = 'finance'): Promise<FeedlyStream[]> {
    try {
      const response = await fetch(`${this.baseUrl}/search/feeds?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.results || [];
      }
      return [];
    } catch (error) {
      console.error('Feedly search failed:', error);
      return [];
    }
  }

  // Get articles from a specific stream
  async getStreamArticles(streamId: string, count: number = 20): Promise<FeedlyArticle[]> {
    try {
      const response = await fetch(`${this.baseUrl}/streams/contents?streamId=${encodeURIComponent(streamId)}&count=${count}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.items || [];
      }
      return [];
    } catch (error) {
      console.error('Feedly articles fetch failed:', error);
      return [];
    }
  }

  // Get financial news articles
  async getFinancialNews(count: number = 50): Promise<FeedlyArticle[]> {
    try {
      // Search for financial streams
      const financialStreams = await this.searchFinancialStreams('finance india stock market');
      
      // Get articles from top financial streams
      const allArticles: FeedlyArticle[] = [];
      
      for (const stream of financialStreams.slice(0, 5)) { // Top 5 streams
        const articles = await this.getStreamArticles(stream.id, Math.ceil(count / 5));
        allArticles.push(...articles);
      }

      // Sort by published date and return latest
      return allArticles
        .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        .slice(0, count);
    } catch (error) {
      console.error('Feedly financial news fetch failed:', error);
      return [];
    }
  }

  // Get stock-specific news
  async getStockNews(symbol: string, count: number = 20): Promise<FeedlyArticle[]> {
    try {
      const query = `${symbol} stock news`;
      const streams = await this.searchFinancialStreams(query);
      
      const allArticles: FeedlyArticle[] = [];
      
      for (const stream of streams.slice(0, 3)) {
        const articles = await this.getStreamArticles(stream.id, Math.ceil(count / 3));
        allArticles.push(...articles);
      }

      return allArticles
        .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        .slice(0, count);
    } catch (error) {
      console.error('Feedly stock news fetch failed:', error);
      return [];
    }
  }

  // Get market sentiment from news
  async getMarketSentiment(): Promise<{
    positive: number;
    negative: number;
    neutral: number;
    articles: FeedlyArticle[];
  }> {
    try {
      const articles = await this.getFinancialNews(100);
      let positive = 0;
      let negative = 0;
      let neutral = 0;

      articles.forEach(article => {
        const sentiment = this.analyzeSentiment(article.title + ' ' + article.summary);
        if (sentiment > 0.1) positive++;
        else if (sentiment < -0.1) negative++;
        else neutral++;
      });

      return {
        positive,
        negative,
        neutral,
        articles: articles.slice(0, 20)
      };
    } catch (error) {
      console.error('Feedly sentiment analysis failed:', error);
      return { positive: 0, negative: 0, neutral: 0, articles: [] };
    }
  }

  // Simple sentiment analysis
  private analyzeSentiment(text: string): number {
    const positiveWords = ['gain', 'rise', 'up', 'positive', 'growth', 'profit', 'bullish', 'strong', 'increase'];
    const negativeWords = ['fall', 'drop', 'down', 'negative', 'loss', 'bearish', 'weak', 'decrease', 'decline'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });
    
    return score / words.length;
  }

  // Subscribe to a stream
  async subscribeToStream(streamId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: streamId,
          title: 'Financial News'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Feedly subscription failed:', error);
      return false;
    }
  }
}

// Mock Feedly service for development
export class MockFeedlyService {
  async getFinancialNews(count: number = 50): Promise<FeedlyArticle[]> {
    const mockArticles: FeedlyArticle[] = [
      {
        id: '1',
        title: 'Small-cap stocks show strong momentum in Q4 earnings',
        summary: 'NIFTY Smallcap 250 Momentum Quality 100 index gains 5.2% this week with strong earnings from sugar and pharma sectors.',
        content: 'Detailed analysis of small-cap momentum stocks...',
        author: 'Financial Times',
        published: new Date().toISOString(),
        updated: new Date().toISOString(),
        origin: {
          title: 'Economic Times',
          streamId: 'feed/https://economictimes.indiatimes.com/rssfeeds/1977021508.cms',
          htmlUrl: 'https://economictimes.indiatimes.com'
        },
        alternate: [{
          href: 'https://example.com/article/1',
          type: 'text/html'
        }],
        categories: [{
          id: 'finance',
          label: 'Finance'
        }],
        tags: ['small-cap', 'momentum', 'earnings'],
        keywords: ['BALRAMCHIN', 'BATAINDIA', 'BHEL'],
        entities: [{
          name: 'NIFTY Smallcap 250',
          type: 'INDEX',
          confidence: 0.95
        }]
      },
      {
        id: '2',
        title: 'Sugar sector sees increased demand amid global shortage',
        summary: 'Balrampur Chini Mills reports strong quarterly results with 15% revenue growth.',
        content: 'Sugar companies benefit from global supply constraints...',
        author: 'MoneyControl',
        published: new Date(Date.now() - 3600000).toISOString(),
        updated: new Date(Date.now() - 3600000).toISOString(),
        origin: {
          title: 'MoneyControl',
          streamId: 'feed/https://www.moneycontrol.com/rss/business.xml',
          htmlUrl: 'https://www.moneycontrol.com'
        },
        alternate: [{
          href: 'https://example.com/article/2',
          type: 'text/html'
        }],
        categories: [{
          id: 'sugar',
          label: 'Sugar Industry'
        }],
        tags: ['sugar', 'earnings', 'growth'],
        keywords: ['BALRAMCHIN'],
        entities: [{
          name: 'Balrampur Chini Mills',
          type: 'COMPANY',
          confidence: 0.98
        }]
      },
      {
        id: '3',
        title: 'Pharmaceutical sector faces regulatory challenges',
        summary: 'Divi\'s Laboratories adjusts guidance for next quarter due to regulatory headwinds.',
        content: 'Pharma companies navigate regulatory environment...',
        author: 'Business Standard',
        published: new Date(Date.now() - 7200000).toISOString(),
        updated: new Date(Date.now() - 7200000).toISOString(),
        origin: {
          title: 'Business Standard',
          streamId: 'feed/https://www.business-standard.com/rss/home_page_top_stories.cms',
          htmlUrl: 'https://www.business-standard.com'
        },
        alternate: [{
          href: 'https://example.com/article/3',
          type: 'text/html'
        }],
        categories: [{
          id: 'pharma',
          label: 'Pharmaceuticals'
        }],
        tags: ['pharma', 'regulatory', 'challenges'],
        keywords: ['DIVISLAB'],
        entities: [{
          name: 'Divi\'s Laboratories',
          type: 'COMPANY',
          confidence: 0.97
        }]
      }
    ];

    return mockArticles.slice(0, count);
  }

  async getStockNews(symbol: string, count: number = 20): Promise<FeedlyArticle[]> {
    const allNews = await this.getFinancialNews(50);
    return allNews.filter(article => 
      article.keywords.includes(symbol) || 
      article.title.toLowerCase().includes(symbol.toLowerCase())
    ).slice(0, count);
  }

  async getMarketSentiment(): Promise<{
    positive: number;
    negative: number;
    neutral: number;
    articles: FeedlyArticle[];
  }> {
    const articles = await this.getFinancialNews(20);
    return {
      positive: 12,
      negative: 3,
      neutral: 5,
      articles
    };
  }
}

// Export singleton instance
export const feedlyService = new MockFeedlyService();
