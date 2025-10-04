// Tijori API integration for fundamental data and analysis
export interface TijoriCompany {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: number;
  pe: number;
  pb: number;
  roe: number;
  roa: number;
  debtToEquity: number;
  currentRatio: number;
  quickRatio: number;
  revenue: number;
  profit: number;
  revenueGrowth: number;
  profitGrowth: number;
  lastUpdated: string;
}

export interface TijoriFinancials {
  symbol: string;
  period: string;
  revenue: number;
  profit: number;
  ebitda: number;
  operatingProfit: number;
  netProfit: number;
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  cashAndEquivalents: number;
  totalDebt: number;
  workingCapital: number;
  capex: number;
  depreciation: number;
  interestExpense: number;
  taxExpense: number;
  dividend: number;
  bookValue: number;
  sharesOutstanding: number;
}

export interface TijoriPeerComparison {
  symbol: string;
  peers: Array<{
    symbol: string;
    name: string;
    marketCap: number;
    pe: number;
    pb: number;
    roe: number;
    revenue: number;
    profit: number;
    revenueGrowth: number;
    profitGrowth: number;
  }>;
  industryAverage: {
    pe: number;
    pb: number;
    roe: number;
    revenueGrowth: number;
    profitGrowth: number;
  };
}

export interface TijoriShareholding {
  symbol: string;
  promoters: number;
  fii: number;
  dii: number;
  public: number;
  others: number;
  total: number;
  lastUpdated: string;
}

export interface TijoriInsiderTrading {
  symbol: string;
  transactions: Array<{
    date: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    value: number;
    person: string;
    designation: string;
  }>;
  netBuySell: number;
  totalValue: number;
  lastUpdated: string;
}

export class TijoriService {
  private apiKey: string;
  private baseUrl: string = 'https://api.tijori.in/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Get company fundamental data
  async getCompanyData(symbol: string): Promise<TijoriCompany | null> {
    try {
      const response = await fetch(`${this.baseUrl}/companies/${symbol}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Tijori company data fetch failed:', error);
      return null;
    }
  }

  // Get financial statements
  async getFinancials(symbol: string, period: string = 'annual'): Promise<TijoriFinancials[]> {
    try {
      const response = await fetch(`${this.baseUrl}/companies/${symbol}/financials?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Tijori financials fetch failed:', error);
      return [];
    }
  }

  // Get peer comparison
  async getPeerComparison(symbol: string): Promise<TijoriPeerComparison | null> {
    try {
      const response = await fetch(`${this.baseUrl}/companies/${symbol}/peers`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Tijori peer comparison fetch failed:', error);
      return null;
    }
  }

  // Get shareholding pattern
  async getShareholding(symbol: string): Promise<TijoriShareholding | null> {
    try {
      const response = await fetch(`${this.baseUrl}/companies/${symbol}/shareholding`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Tijori shareholding fetch failed:', error);
      return null;
    }
  }

  // Get insider trading data
  async getInsiderTrading(symbol: string): Promise<TijoriInsiderTrading | null> {
    try {
      const response = await fetch(`${this.baseUrl}/companies/${symbol}/insider-trading`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Tijori insider trading fetch failed:', error);
      return null;
    }
  }

  // Get sector analysis
  async getSectorAnalysis(sector: string): Promise<{
    sector: string;
    companies: TijoriCompany[];
    averageMetrics: {
      pe: number;
      pb: number;
      roe: number;
      revenueGrowth: number;
      profitGrowth: number;
    };
  } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/sectors/${encodeURIComponent(sector)}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Tijori sector analysis fetch failed:', error);
      return null;
    }
  }
}

// Mock Tijori service for development
export class MockTijoriService {
  async getCompanyData(symbol: string): Promise<TijoriCompany | null> {
    const mockData: { [key: string]: TijoriCompany } = {
      'BALRAMCHIN': {
        symbol: 'BALRAMCHIN',
        name: 'Balrampur Chini Mills Ltd',
        sector: 'Sugar',
        industry: 'Sugar & Confectionery',
        marketCap: 12500,
        pe: 15.2,
        pb: 2.1,
        roe: 18.5,
        roa: 12.3,
        debtToEquity: 0.8,
        currentRatio: 1.4,
        quickRatio: 0.9,
        revenue: 2500,
        profit: 180,
        revenueGrowth: 12.5,
        profitGrowth: 15.2,
        lastUpdated: new Date().toISOString()
      },
      'BATAINDIA': {
        symbol: 'BATAINDIA',
        name: 'Bata India Ltd',
        sector: 'Consumer Goods',
        industry: 'Footwear',
        marketCap: 18500,
        pe: 22.8,
        pb: 3.2,
        roe: 14.2,
        roa: 8.9,
        debtToEquity: 0.3,
        currentRatio: 2.1,
        quickRatio: 1.8,
        revenue: 3200,
        profit: 140,
        revenueGrowth: 8.5,
        profitGrowth: 12.3,
        lastUpdated: new Date().toISOString()
      },
      'BHEL': {
        symbol: 'BHEL',
        name: 'Bharat Heavy Electricals Ltd',
        sector: 'Capital Goods',
        industry: 'Power Equipment',
        marketCap: 45000,
        pe: 18.5,
        pb: 1.8,
        roe: 9.8,
        roa: 5.2,
        debtToEquity: 0.5,
        currentRatio: 1.6,
        quickRatio: 1.2,
        revenue: 18000,
        profit: 1200,
        revenueGrowth: 15.2,
        profitGrowth: 22.1,
        lastUpdated: new Date().toISOString()
      }
    };

    return mockData[symbol] || null;
  }

  async getFinancials(symbol: string, period: string = 'annual'): Promise<TijoriFinancials[]> {
    const mockFinancials: TijoriFinancials[] = [
      {
        symbol,
        period: '2024',
        revenue: 2500,
        profit: 180,
        ebitda: 320,
        operatingProfit: 280,
        netProfit: 180,
        totalAssets: 1500,
        totalLiabilities: 800,
        shareholdersEquity: 700,
        cashAndEquivalents: 120,
        totalDebt: 200,
        workingCapital: 300,
        capex: 80,
        depreciation: 40,
        interestExpense: 15,
        taxExpense: 45,
        dividend: 25,
        bookValue: 350,
        sharesOutstanding: 200
      }
    ];

    return mockFinancials;
  }

  async getPeerComparison(symbol: string): Promise<TijoriPeerComparison | null> {
    const mockPeers: TijoriPeerComparison = {
      symbol,
      peers: [
        {
          symbol: 'PEER1',
          name: 'Peer Company 1',
          marketCap: 12000,
          pe: 16.5,
          pb: 2.3,
          roe: 16.8,
          revenue: 2200,
          profit: 150,
          revenueGrowth: 10.2,
          profitGrowth: 12.5
        },
        {
          symbol: 'PEER2',
          name: 'Peer Company 2',
          marketCap: 15000,
          pe: 18.2,
          pb: 2.8,
          roe: 15.4,
          revenue: 2800,
          profit: 190,
          revenueGrowth: 8.5,
          profitGrowth: 14.2
        }
      ],
      industryAverage: {
        pe: 17.3,
        pb: 2.5,
        roe: 16.1,
        revenueGrowth: 9.3,
        profitGrowth: 13.3
      }
    };

    return mockPeers;
  }

  async getShareholding(symbol: string): Promise<TijoriShareholding | null> {
    return {
      symbol,
      promoters: 45.2,
      fii: 18.5,
      dii: 12.3,
      public: 22.1,
      others: 1.9,
      total: 100,
      lastUpdated: new Date().toISOString()
    };
  }

  async getInsiderTrading(symbol: string): Promise<TijoriInsiderTrading | null> {
    return {
      symbol,
      transactions: [
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          type: 'BUY',
          quantity: 1000,
          price: 456.50,
          value: 456500,
          person: 'John Doe',
          designation: 'Director'
        },
        {
          date: new Date(Date.now() - 172800000).toISOString(),
          type: 'SELL',
          quantity: 500,
          price: 450.20,
          value: 225100,
          person: 'Jane Smith',
          designation: 'CFO'
        }
      ],
      netBuySell: 500,
      totalValue: 231400,
      lastUpdated: new Date().toISOString()
    };
  }

  async getSectorAnalysis(sector: string): Promise<{
    sector: string;
    companies: TijoriCompany[];
    averageMetrics: {
      pe: number;
      pb: number;
      roe: number;
      revenueGrowth: number;
      profitGrowth: number;
    };
  } | null> {
    const companies = await Promise.all([
      this.getCompanyData('BALRAMCHIN'),
      this.getCompanyData('BATAINDIA'),
      this.getCompanyData('BHEL')
    ]);

    return {
      sector,
      companies: companies.filter(c => c !== null) as TijoriCompany[],
      averageMetrics: {
        pe: 18.8,
        pb: 2.4,
        roe: 14.2,
        revenueGrowth: 12.1,
        profitGrowth: 16.5
      }
    };
  }
}

// Export singleton instance
export const tijoriService = new MockTijoriService();
