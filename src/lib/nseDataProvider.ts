// NSE Data Provider for Live Stock Data Integration
// This module handles fetching live data from NSE and other sources

export interface NSEStock {
  symbol: string;
  name: string;
  weight?: number;
  sector?: string;
  marketCap?: string;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  lastUpdated: string;
}

export interface NewsItem {
  title: string;
  link: string;
  published: string;
  source: string;
  category: string;
  symbol?: string;
}

export interface MultibaggerScore {
  symbol: string;
  scores: {
    growth: number;
    market: number;
    scalability: number;
    management: number;
    debt: number;
    cashflow: number;
    moat: number;
    valuation: number;
    marketcap: number;
    momentum: number;
  };
  totalScore: number;
  verdict: 'High' | 'Medium' | 'Low';
  confidence: number;
  lastUpdated: string;
  newsItems: NewsItem[];
}

class NSEDataProvider {
  private baseURL = 'https://www.niftyindices.com';
  private nseBaseURL = 'https://www.nseindia.com';
  private fallbackURL = 'https://www.smart-investing.in/indices-bse-nse.php?index=NFTSML250MOMQ100';
  
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
  };

  // Mock data for demonstration - replace with actual API calls
  async fetchNiftySmallcapMomentumConstituents(): Promise<NSEStock[]> {
    // In production, this would fetch from NSE API
    // For now, returning mock data based on the actual index
    const mockData: NSEStock[] = [
      {
        symbol: 'BALRAMCHIN',
        name: 'Balrampur Chini Mills Ltd',
        weight: 1.2,
        sector: 'Sugar',
        marketCap: 'Mid Cap',
        currentPrice: 456.50,
        change: 23.40,
        changePercent: 5.41,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'BATAINDIA',
        name: 'Bata India Ltd',
        weight: 0.8,
        sector: 'Footwear',
        marketCap: 'Large Cap',
        currentPrice: 1821.80,
        change: 15.20,
        changePercent: 0.84,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'BHEL',
        name: 'Bharat Heavy Electricals Ltd',
        weight: 0.6,
        sector: 'Power Equipment',
        marketCap: 'Large Cap',
        currentPrice: 267.30,
        change: 12.80,
        changePercent: 5.03,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'COALINDIA',
        name: 'Coal India Ltd',
        weight: 1.5,
        sector: 'Mining',
        marketCap: 'Large Cap',
        currentPrice: 456.90,
        change: 8.50,
        changePercent: 1.90,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'DIVISLAB',
        name: 'Divi\'s Laboratories Ltd',
        weight: 2.1,
        sector: 'Pharmaceuticals',
        marketCap: 'Large Cap',
        currentPrice: 3856.80,
        change: 3.20,
        changePercent: 0.08,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'EICHERMOT',
        name: 'Eicher Motors Ltd',
        weight: 1.8,
        sector: 'Automobiles',
        marketCap: 'Large Cap',
        currentPrice: 3456.70,
        change: -45.30,
        changePercent: -1.29,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'GAIL',
        name: 'GAIL (India) Ltd',
        weight: 1.3,
        sector: 'Oil & Gas',
        marketCap: 'Large Cap',
        currentPrice: 234.50,
        change: 12.40,
        changePercent: 5.58,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'HINDALCO',
        name: 'Hindalco Industries Ltd',
        weight: 1.1,
        sector: 'Metals',
        marketCap: 'Large Cap',
        currentPrice: 567.80,
        change: 18.90,
        changePercent: 3.44,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'INDUSINDBK',
        name: 'IndusInd Bank Ltd',
        weight: 1.7,
        sector: 'Banking',
        marketCap: 'Large Cap',
        currentPrice: 1234.60,
        change: 34.20,
        changePercent: 2.85,
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'JSWSTEEL',
        name: 'JSW Steel Ltd',
        weight: 1.4,
        sector: 'Steel',
        marketCap: 'Large Cap',
        currentPrice: 789.30,
        change: 22.10,
        changePercent: 2.88,
        lastUpdated: new Date().toISOString()
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData;
  }

  async fetchNewsForSymbol(symbol: string): Promise<NewsItem[]> {
    // Mock news data - in production, this would fetch from NSE RSS feeds
    const mockNews: NewsItem[] = [
      {
        title: `${symbol} Reports Strong Q3 Results`,
        link: `https://nseindia.com/corporate-filings/${symbol.toLowerCase()}`,
        published: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'NSE Corporate Filings',
        category: 'Financial Results',
        symbol: symbol
      },
      {
        title: `Promoter Transaction in ${symbol}`,
        link: `https://nseindia.com/insider-trading/${symbol.toLowerCase()}`,
        published: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'NSE Insider Trading',
        category: 'Insider Trading',
        symbol: symbol
      },
      {
        title: `Board Meeting Scheduled for ${symbol}`,
        link: `https://nseindia.com/board-meetings/${symbol.toLowerCase()}`,
        published: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'NSE Board Meetings',
        category: 'Corporate Actions',
        symbol: symbol
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNews.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  async generateMultibaggerScore(stock: NSEStock): Promise<MultibaggerScore> {
    // Mock AI scoring - in production, this would use actual LLM API
    const scores = {
      growth: Math.random() > 0.3 ? 1 : Math.random() > 0.5 ? 0.5 : 0,
      market: Math.random() > 0.2 ? 1 : Math.random() > 0.4 ? 0.5 : 0,
      scalability: Math.random() > 0.4 ? 1 : Math.random() > 0.6 ? 0.5 : 0,
      management: Math.random() > 0.25 ? 1 : Math.random() > 0.5 ? 0.5 : 0,
      debt: Math.random() > 0.3 ? 1 : Math.random() > 0.5 ? 0.5 : 0,
      cashflow: Math.random() > 0.35 ? 1 : Math.random() > 0.55 ? 0.5 : 0,
      moat: Math.random() > 0.4 ? 1 : Math.random() > 0.6 ? 0.5 : 0,
      valuation: Math.random() > 0.3 ? 1 : Math.random() > 0.5 ? 0.5 : 0,
      marketcap: Math.random() > 0.2 ? 1 : Math.random() > 0.4 ? 0.5 : 0,
      momentum: Math.random() > 0.25 ? 1 : Math.random() > 0.5 ? 0.5 : 0,
    };

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const verdict = totalScore >= 8 ? 'High' : totalScore >= 5 ? 'Medium' : 'Low';
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%

    const newsItems = await this.fetchNewsForSymbol(stock.symbol);

    return {
      symbol: stock.symbol,
      scores,
      totalScore,
      verdict,
      confidence,
      lastUpdated: new Date().toISOString(),
      newsItems
    };
  }

  async fetchAllMultibaggerScores(): Promise<MultibaggerScore[]> {
    const stocks = await this.fetchNiftySmallcapMomentumConstituents();
    const scores: MultibaggerScore[] = [];

    for (const stock of stocks) {
      const score = await this.generateMultibaggerScore(stock);
      scores.push(score);
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return scores;
  }

  // Utility methods for data refresh
  async refreshData(): Promise<{
    stocks: NSEStock[];
    scores: MultibaggerScore[];
    lastUpdated: string;
  }> {
    console.log('Refreshing NSE data...');
    
    const stocks = await this.fetchNiftySmallcapMomentumConstituents();
    const scores = await this.fetchAllMultibaggerScores();
    
    return {
      stocks,
      scores,
      lastUpdated: new Date().toISOString()
    };
  }

  // Export data for external processing
  async exportToCSV(): Promise<string> {
    const data = await this.refreshData();
    
    // Convert to CSV format
    const csvRows = [
      'Symbol,Name,Sector,MarketCap,CurrentPrice,Change,ChangePercent,Growth,Market,Scalability,Management,Debt,Cashflow,Moat,Valuation,MarketCap,Momentum,TotalScore,Verdict,Confidence,LastUpdated'
    ];

    data.stocks.forEach((stock, index) => {
      const score = data.scores[index];
      const row = [
        stock.symbol,
        stock.name,
        stock.sector || '',
        stock.marketCap || '',
        stock.currentPrice || 0,
        stock.change || 0,
        stock.changePercent || 0,
        score.scores.growth,
        score.scores.market,
        score.scores.scalability,
        score.scores.management,
        score.scores.debt,
        score.scores.cashflow,
        score.scores.moat,
        score.scores.valuation,
        score.scores.marketcap,
        score.scores.momentum,
        score.totalScore,
        score.verdict,
        score.confidence,
        score.lastUpdated
      ].join(',');
      
      csvRows.push(row);
    });

    return csvRows.join('\n');
  }
}

export const nseDataProvider = new NSEDataProvider();
export default nseDataProvider;
