// Data providers for live financial data integration
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: string;
}

export interface Recommendation {
  symbol: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  targetPrice: number;
  currentPrice: number;
  confidence: number;
  source: string;
  reason: string;
  timestamp: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  relatedStocks: string[];
  url: string;
}

// Mock data providers for demonstration
export class MockDataProvider {
  private static instance: MockDataProvider;
  
  static getInstance(): MockDataProvider {
    if (!MockDataProvider.instance) {
      MockDataProvider.instance = new MockDataProvider();
    }
    return MockDataProvider.instance;
  }

  // Simulate real-time price updates
  async getStockData(symbol: string): Promise<StockData> {
    const basePrice = this.getBasePrice(symbol);
    const change = (Math.random() - 0.5) * basePrice * 0.05; // ±2.5% change
    const newPrice = basePrice + change;
    
    return {
      symbol,
      name: this.getStockName(symbol),
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round((change / basePrice) * 10000) / 100,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.floor(Math.random() * 100000) + 10000,
      high: Math.round((newPrice + Math.random() * 10) * 100) / 100,
      low: Math.round((newPrice - Math.random() * 10) * 100) / 100,
      open: Math.round((basePrice + (Math.random() - 0.5) * 5) * 100) / 100,
      previousClose: basePrice,
      timestamp: new Date().toISOString()
    };
  }

  // Simulate recommendations from different sources
  async getRecommendations(): Promise<Recommendation[]> {
    const symbols = ['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO'];
    const sources = ['Liquide', 'Univest', 'StockEdge', 'Zerodha', 'HDFC Securities', 'MoneyControl'];
    const recommendations: Recommendation[] = [];

    for (const symbol of symbols) {
      const stockData = await this.getStockData(symbol);
      const source = sources[Math.floor(Math.random() * sources.length)];
      const recommendation = ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)] as 'BUY' | 'SELL' | 'HOLD';
      
      recommendations.push({
        symbol,
        recommendation,
        targetPrice: stockData.price * (1 + (Math.random() - 0.5) * 0.2),
        currentPrice: stockData.price,
        confidence: Math.floor(Math.random() * 40) + 60,
        source,
        reason: this.getRecommendationReason(recommendation, symbol),
        timestamp: new Date().toISOString()
      });
    }

    return recommendations;
  }

  // Simulate news feed
  async getNews(): Promise<NewsItem[]> {
    const newsItems: NewsItem[] = [
      {
        id: '1',
        title: 'Small-cap stocks show strong momentum in Q4',
        summary: 'NIFTY Smallcap 250 Momentum Quality 100 index gains 5.2% this week',
        source: 'Economic Times',
        timestamp: new Date().toISOString(),
        sentiment: 'POSITIVE',
        relatedStocks: ['BALRAMCHIN', 'BATAINDIA', 'BHEL'],
        url: 'https://example.com/news/1'
      },
      {
        id: '2',
        title: 'Sugar sector sees increased demand',
        summary: 'Balrampur Chini Mills reports strong quarterly results',
        source: 'MoneyControl',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        sentiment: 'POSITIVE',
        relatedStocks: ['BALRAMCHIN'],
        url: 'https://example.com/news/2'
      },
      {
        id: '3',
        title: 'Pharmaceutical sector faces regulatory challenges',
        summary: 'Divi\'s Laboratories adjusts guidance for next quarter',
        source: 'Business Standard',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        sentiment: 'NEGATIVE',
        relatedStocks: ['DIVISLAB'],
        url: 'https://example.com/news/3'
      }
    ];

    return newsItems;
  }

  private getBasePrice(symbol: string): number {
    const prices: { [key: string]: number } = {
      'BALRAMCHIN': 456.50,
      'BATAINDIA': 1821.80,
      'BHEL': 267.30,
      'COALINDIA': 456.90,
      'DIVISLAB': 3856.80,
      'EICHERMOT': 2456.50,
      'GAIL': 156.70,
      'HINDALCO': 567.40
    };
    return prices[symbol] || 100;
  }

  private getStockName(symbol: string): string {
    const names: { [key: string]: string } = {
      'BALRAMCHIN': 'Balrampur Chini Mills Ltd',
      'BATAINDIA': 'Bata India Ltd',
      'BHEL': 'Bharat Heavy Electricals Ltd',
      'COALINDIA': 'Coal India Ltd',
      'DIVISLAB': 'Divi\'s Laboratories Ltd',
      'EICHERMOT': 'Eicher Motors Ltd',
      'GAIL': 'GAIL (India) Ltd',
      'HINDALCO': 'Hindalco Industries Ltd'
    };
    return names[symbol] || `${symbol} Ltd`;
  }

  private getRecommendationReason(recommendation: string, symbol: string): string {
    const reasons = {
      'BUY': [
        'Strong momentum indicators and technical analysis support',
        'Positive earnings outlook and sector tailwinds',
        'Undervalued compared to peers with growth potential',
        'Breakout from consolidation pattern with volume confirmation'
      ],
      'SELL': [
        'Technical indicators showing weakness',
        'Overvalued compared to fundamentals',
        'Sector headwinds and regulatory concerns',
        'Profit booking recommended after recent gains'
      ],
      'HOLD': [
        'Wait for better entry point',
        'Mixed signals from technical and fundamental analysis',
        'Sector consolidation phase',
        'Monitor for breakout or breakdown'
      ]
    };
    
    const reasonList = reasons[recommendation as keyof typeof reasons];
    return reasonList[Math.floor(Math.random() * reasonList.length)];
  }
}

// Real-time data service
export class RealTimeDataService {
  private static instance: RealTimeDataService;
  private mockProvider: MockDataProvider;
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: ((data: StockData[]) => void)[] = [];

  constructor() {
    this.mockProvider = MockDataProvider.getInstance();
  }

  static getInstance(): RealTimeDataService {
    if (!RealTimeDataService.instance) {
      RealTimeDataService.instance = new RealTimeDataService();
    }
    return RealTimeDataService.instance;
  }

  // Subscribe to real-time updates
  subscribe(callback: (data: StockData[]) => void) {
    this.subscribers.push(callback);
    
    if (!this.updateInterval) {
      this.startRealTimeUpdates();
    }
  }

  // Unsubscribe from updates
  unsubscribe(callback: (data: StockData[]) => void) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
    
    if (this.subscribers.length === 0 && this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private async startRealTimeUpdates() {
    this.updateInterval = setInterval(async () => {
      const symbols = ['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO'];
      const stockData = await Promise.all(
        symbols.map(symbol => this.mockProvider.getStockData(symbol))
      );
      
      this.subscribers.forEach(callback => callback(stockData));
    }, 5000); // Update every 5 seconds
  }

  // Get current stock data
  async getCurrentStockData(symbols: string[]): Promise<StockData[]> {
    return Promise.all(symbols.map(symbol => this.mockProvider.getStockData(symbol)));
  }

  // Get recommendations
  async getCurrentRecommendations(): Promise<Recommendation[]> {
    return this.mockProvider.getRecommendations();
  }

  // Get news
  async getCurrentNews(): Promise<NewsItem[]> {
    return this.mockProvider.getNews();
  }
}

// Export singleton instances
export const dataService = RealTimeDataService.getInstance();
export const mockProvider = MockDataProvider.getInstance();
