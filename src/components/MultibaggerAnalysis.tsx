import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  Shield,
  Zap,
  Award,
  Brain,
  Building,
  Users,
  Globe,
  RefreshCw,
  Download,
  Filter,
  Search,
  Calendar,
  Info,
  ExternalLink
} from 'lucide-react';

interface MultibaggerCharacteristic {
  id: string;
  name: string;
  description: string;
  weight: number;
  icon: React.ComponentType<any>;
}

interface StockAnalysis {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: string;
  sector: string;
  characteristics: {
    [key: string]: {
      score: number; // 0, 0.5, or 1
      reasoning: string;
      confidence: number;
    };
  };
  totalScore: number;
  verdict: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  priceTarget?: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const MultibaggerAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('analysis');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedVerdict, setSelectedVerdict] = useState<string>('all');
  const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);

  const multibaggerCharacteristics: MultibaggerCharacteristic[] = [
    {
      id: 'growth',
      name: 'Revenue & Profit Growth',
      description: 'Consistent top-line and bottom-line growth over 3+ years',
      weight: 1.0,
      icon: TrendingUp
    },
    {
      id: 'market',
      name: 'Large Addressable Market',
      description: 'Sector growth trends and market expansion potential',
      weight: 1.0,
      icon: Globe
    },
    {
      id: 'scalability',
      name: 'Scalability & Operating Leverage',
      description: 'Business can grow margins as it scales',
      weight: 1.0,
      icon: Zap
    },
    {
      id: 'management',
      name: 'Visionary & Strong Management',
      description: 'Track record of leadership and execution',
      weight: 1.0,
      icon: Users
    },
    {
      id: 'debt',
      name: 'Low or Manageable Debt',
      description: 'Debt/equity ratio and interest coverage',
      weight: 1.0,
      icon: Shield
    },
    {
      id: 'cashflow',
      name: 'Positive Cash Flow & Reinvestment',
      description: 'Strong free cash flow and reinvestment capacity',
      weight: 1.0,
      icon: DollarSign
    },
    {
      id: 'moat',
      name: 'Competitive Advantage / Economic Moat',
      description: 'Brand, patents, cost advantage, network effect',
      weight: 1.0,
      icon: Building
    },
    {
      id: 'valuation',
      name: 'Undervaluation / Mispricing',
      description: 'Current valuation vs growth potential',
      weight: 1.0,
      icon: Target
    },
    {
      id: 'marketcap',
      name: 'Market Cap Potential',
      description: 'Small-to-mid cap with high growth headroom',
      weight: 1.0,
      icon: BarChart3
    },
    {
      id: 'momentum',
      name: 'Price Momentum / Market Recognition',
      description: 'Market recognition of fundamentals',
      weight: 1.0,
      icon: Activity
    }
  ];

  // Mock data for demonstration
  useEffect(() => {
    const mockAnalyses: StockAnalysis[] = [
      {
        symbol: 'BALRAMCHIN',
        name: 'Balrampur Chini Mills Ltd',
        currentPrice: 456.50,
        marketCap: 'Mid Cap',
        sector: 'Sugar',
        characteristics: {
          growth: { score: 1, reasoning: 'Strong 3-year revenue CAGR of 18% and profit growth of 22%', confidence: 90 },
          market: { score: 0.5, reasoning: 'Sugar sector has growth potential but cyclical nature', confidence: 75 },
          scalability: { score: 0.5, reasoning: 'Limited scalability due to commodity nature', confidence: 70 },
          management: { score: 1, reasoning: 'Proven track record with consistent dividend payments', confidence: 85 },
          debt: { score: 1, reasoning: 'Low debt-to-equity ratio of 0.15', confidence: 95 },
          cashflow: { score: 1, reasoning: 'Strong operating cash flows with good reinvestment', confidence: 80 },
          moat: { score: 0, reasoning: 'Low switching costs, commodity business', confidence: 85 },
          valuation: { score: 1, reasoning: 'Trading at reasonable PE of 12x vs industry avg 18x', confidence: 80 },
          marketcap: { score: 1, reasoning: 'Mid-cap with significant growth potential in ethanol', confidence: 75 },
          momentum: { score: 0.5, reasoning: 'Mixed momentum, positive on ethanol expansion', confidence: 70 }
        },
        totalScore: 7.5,
        verdict: 'Medium',
        lastUpdated: '2024-01-15T10:00:00Z',
        priceTarget: 520,
        riskLevel: 'Medium'
      },
      {
        symbol: 'BATAINDIA',
        name: 'Bata India Ltd',
        currentPrice: 1821.80,
        marketCap: 'Large Cap',
        sector: 'Footwear',
        characteristics: {
          growth: { score: 0.5, reasoning: 'Moderate growth, recovering from COVID impact', confidence: 75 },
          market: { score: 1, reasoning: 'Large footwear market with premiumization trend', confidence: 90 },
          scalability: { score: 1, reasoning: 'Strong brand allows premium pricing and margin expansion', confidence: 85 },
          management: { score: 1, reasoning: 'Experienced management with strong brand building', confidence: 90 },
          debt: { score: 1, reasoning: 'Very low debt levels, strong balance sheet', confidence: 95 },
          cashflow: { score: 1, reasoning: 'Consistent cash generation and dividend payments', confidence: 85 },
          moat: { score: 1, reasoning: 'Strong brand moat and distribution network', confidence: 90 },
          valuation: { score: 0, reasoning: 'Expensive at current PE of 45x', confidence: 85 },
          marketcap: { score: 0, reasoning: 'Large cap with limited multibagger potential', confidence: 80 },
          momentum: { score: 0.5, reasoning: 'Recovery momentum but premium valuation concern', confidence: 75 }
        },
        totalScore: 7,
        verdict: 'Medium',
        lastUpdated: '2024-01-15T10:00:00Z',
        priceTarget: 2100,
        riskLevel: 'Low'
      },
      {
        symbol: 'BHEL',
        name: 'Bharat Heavy Electricals Ltd',
        currentPrice: 267.30,
        marketCap: 'Large Cap',
        sector: 'Power Equipment',
        characteristics: {
          growth: { score: 0, reasoning: 'Declining revenues and profits over last 3 years', confidence: 90 },
          market: { score: 0.5, reasoning: 'Power sector growth but competition from private players', confidence: 70 },
          scalability: { score: 0, reasoning: 'Asset-heavy business with limited scalability', confidence: 80 },
          management: { score: 0.5, reasoning: 'Government ownership limits operational flexibility', confidence: 75 },
          debt: { score: 0, reasoning: 'High debt levels with poor interest coverage', confidence: 85 },
          cashflow: { score: 0, reasoning: 'Negative operating cash flows in recent years', confidence: 90 },
          moat: { score: 0.5, reasoning: 'Limited moat due to increasing competition', confidence: 70 },
          valuation: { score: 0.5, reasoning: 'Cheap valuation but justified by poor fundamentals', confidence: 75 },
          marketcap: { score: 0, reasoning: 'Large cap with declining business model', confidence: 80 },
          momentum: { score: 0, reasoning: 'Negative momentum due to poor performance', confidence: 85 }
        },
        totalScore: 2,
        verdict: 'Low',
        lastUpdated: '2024-01-15T10:00:00Z',
        priceTarget: 200,
        riskLevel: 'High'
      },
      {
        symbol: 'COALINDIA',
        name: 'Coal India Ltd',
        currentPrice: 456.90,
        marketCap: 'Large Cap',
        sector: 'Mining',
        characteristics: {
          growth: { score: 0.5, reasoning: 'Volatile growth due to commodity cycles', confidence: 80 },
          market: { score: 0, reasoning: 'Declining coal demand due to renewable energy transition', confidence: 85 },
          scalability: { score: 0, reasoning: 'Limited scalability in declining sector', confidence: 90 },
          management: { score: 0.5, reasoning: 'Government ownership affects efficiency', confidence: 75 },
          debt: { score: 1, reasoning: 'Strong balance sheet with low debt', confidence: 90 },
          cashflow: { score: 1, reasoning: 'Strong cash generation and high dividend yield', confidence: 85 },
          moat: { score: 1, reasoning: 'Monopoly position in coal mining', confidence: 95 },
          valuation: { score: 0.5, reasoning: 'Cheap valuation but declining business', confidence: 80 },
          marketcap: { score: 0, reasoning: 'Large cap with structural challenges', confidence: 85 },
          momentum: { score: 0, reasoning: 'Negative long-term momentum', confidence: 80 }
        },
        totalScore: 4.5,
        verdict: 'Low',
        lastUpdated: '2024-01-15T10:00:00Z',
        priceTarget: 400,
        riskLevel: 'High'
      },
      {
        symbol: 'DIVISLAB',
        name: 'Divi\'s Laboratories Ltd',
        currentPrice: 3856.80,
        marketCap: 'Large Cap',
        sector: 'Pharmaceuticals',
        characteristics: {
          growth: { score: 1, reasoning: 'Consistent 15-20% revenue and profit growth', confidence: 90 },
          market: { score: 1, reasoning: 'Large pharma market with API outsourcing growth', confidence: 85 },
          scalability: { score: 1, reasoning: 'High operating leverage in contract manufacturing', confidence: 80 },
          management: { score: 1, reasoning: 'Excellent management with strong execution track record', confidence: 95 },
          debt: { score: 1, reasoning: 'Debt-free company with strong balance sheet', confidence: 95 },
          cashflow: { score: 1, reasoning: 'Strong cash generation and reinvestment in capacity', confidence: 90 },
          moat: { score: 1, reasoning: 'Strong moat in complex API manufacturing', confidence: 85 },
          valuation: { score: 0, reasoning: 'Expensive at PE of 55x despite good fundamentals', confidence: 80 },
          marketcap: { score: 0, reasoning: 'Large cap with limited multibagger potential', confidence: 75 },
          momentum: { score: 1, reasoning: 'Strong momentum supported by fundamentals', confidence: 85 }
        },
        totalScore: 8,
        verdict: 'High',
        lastUpdated: '2024-01-15T10:00:00Z',
        priceTarget: 4200,
        riskLevel: 'Low'
      }
    ];

    setStockAnalyses(mockAnalyses);
  }, []);

  const sectors = ['all', 'Sugar', 'Footwear', 'Power Equipment', 'Mining', 'Pharmaceuticals'];
  const verdicts = ['all', 'High', 'Medium', 'Low'];

  const filteredStocks = stockAnalyses.filter(stock => {
    const sectorMatch = selectedSector === 'all' || stock.sector === selectedSector;
    const verdictMatch = selectedVerdict === 'all' || stock.verdict === selectedVerdict;
    return sectorMatch && verdictMatch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreIcon = (score: number) => {
    if (score === 1) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score === 0.5) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Multibagger Stock Analysis</h1>
              <p className="text-gray-600 mt-2">AI-powered evaluation of stocks based on 10 key multibagger characteristics</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Analysis
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Run AI Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This multibagger analysis is for educational purposes only. Not financial advice. 
                Always conduct your own research and consult a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Potential</p>
                <p className="text-2xl font-bold text-green-600">
                  {stockAnalyses.filter(s => s.verdict === 'High').length}
                </p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medium Potential</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stockAnalyses.filter(s => s.verdict === 'Medium').length}
                </p>
              </div>
              <Target className="h-8 w-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Potential</p>
                <p className="text-2xl font-bold text-red-600">
                  {stockAnalyses.filter(s => s.verdict === 'Low').length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(stockAnalyses.reduce((acc, s) => acc + s.totalScore, 0) / stockAnalyses.length).toFixed(1)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verdict</label>
              <select
                value={selectedVerdict}
                onChange={(e) => setSelectedVerdict(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {verdicts.map((verdict) => (
                  <option key={verdict} value={verdict}>
                    {verdict === 'all' ? 'All Verdicts' : verdict}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button className="w-full" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Stock Analysis</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics Guide</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio View</TabsTrigger>
          </TabsList>

          {/* Stock Analysis */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="space-y-4">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{stock.symbol}</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {stock.sector}
                        </Badge>
                        <Badge className={getVerdictColor(stock.verdict)}>
                          {stock.verdict} Potential
                        </Badge>
                        <Badge variant="outline" className={getRiskColor(stock.riskLevel)}>
                          {stock.riskLevel} Risk
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{stock.name}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>Price: {formatCurrency(stock.currentPrice)}</span>
                        <span>•</span>
                        <span>Market Cap: {stock.marketCap}</span>
                        {stock.priceTarget && (
                          <>
                            <span>•</span>
                            <span>Target: {formatCurrency(stock.priceTarget)}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>Updated: {formatTimestamp(stock.lastUpdated)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(stock.totalScore)} px-3 py-1 rounded-lg`}>
                        {stock.totalScore}/10
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Multibagger Score</p>
                    </div>
                  </div>

                  {/* Characteristics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                    {multibaggerCharacteristics.map((char) => {
                      const IconComponent = char.icon;
                      const charData = stock.characteristics[char.id];
                      return (
                        <div key={char.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                            {getScoreIcon(charData.score)}
                          </div>
                          <h4 className="font-medium text-sm mb-1">{char.name}</h4>
                          <p className="text-xs text-gray-600">{charData.reasoning}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Confidence: {Math.round(Object.values(stock.characteristics).reduce((acc, c) => acc + c.confidence, 0) / Object.values(stock.characteristics).length)}%
                      </span>
                    </div>
                    <Button 
                      onClick={() => setSelectedStock(stock)}
                      variant="outline" 
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Characteristics Guide */}
          <TabsContent value="characteristics" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Multibagger Characteristics Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {multibaggerCharacteristics.map((char) => {
                  const IconComponent = char.icon;
                  return (
                    <div key={char.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold">{char.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{char.description}</p>
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">✅ = 1 point (Characteristic met)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">⚠️ = 0.5 points (Partially met/Uncertain)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">❌ = 0 points (Characteristic not met)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Portfolio View */}
          <TabsContent value="portfolio" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Portfolio Multibagger Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Score Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Potential (8-10)</span>
                      <Badge className="bg-green-100 text-green-800">
                        {stockAnalyses.filter(s => s.totalScore >= 8).length} stocks
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium Potential (5-7)</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {stockAnalyses.filter(s => s.totalScore >= 5 && s.totalScore < 8).length} stocks
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low Potential (0-4)</span>
                      <Badge className="bg-red-100 text-red-800">
                        {stockAnalyses.filter(s => s.totalScore < 5).length} stocks
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Sector Analysis</h4>
                  <div className="space-y-2">
                    {sectors.slice(1).map((sector) => {
                      const sectorStocks = stockAnalyses.filter(s => s.sector === sector);
                      const avgScore = sectorStocks.length > 0 
                        ? sectorStocks.reduce((acc, s) => acc + s.totalScore, 0) / sectorStocks.length 
                        : 0;
                      return (
                        <div key={sector} className="flex justify-between items-center">
                          <span className="text-sm">{sector}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${getScoreColor(avgScore)}`}>
                              {avgScore.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({sectorStocks.length} stocks)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detailed Stock View */}
        {selectedStock && (
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">{selectedStock.symbol} - Detailed Analysis</h3>
                <p className="text-gray-600">{selectedStock.name}</p>
              </div>
              <Button onClick={() => setSelectedStock(null)} variant="outline">
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Characteristic Breakdown</h4>
                <div className="space-y-3">
                  {multibaggerCharacteristics.map((char) => {
                    const IconComponent = char.icon;
                    const charData = selectedStock.characteristics[char.id];
                    return (
                      <div key={char.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">{char.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getScoreIcon(charData.score)}
                            <span className="text-sm font-medium">
                              {charData.score}/1 ({Math.round(charData.score * 100)}%)
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{charData.reasoning}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Confidence</span>
                          <span className="text-xs font-medium">{charData.confidence}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Summary</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Overall Assessment</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      {selectedStock.verdict === 'High' && 'This stock shows strong multibagger characteristics with excellent fundamentals and growth potential.'}
                      {selectedStock.verdict === 'Medium' && 'This stock has moderate multibagger potential with some strong characteristics but also some concerns.'}
                      {selectedStock.verdict === 'Low' && 'This stock shows limited multibagger potential with significant challenges in key areas.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Multibagger Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(selectedStock.totalScore)}`}>
                        {selectedStock.totalScore}/10
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Investment Recommendation</h5>
                    <p className="text-sm text-gray-600">
                      {selectedStock.verdict === 'High' && 'Consider for long-term portfolio with strong growth potential.'}
                      {selectedStock.verdict === 'Medium' && 'Monitor closely and consider on dips with proper risk management.'}
                      {selectedStock.verdict === 'Low' && 'Avoid or consider only for short-term trading opportunities.'}
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Key Risks</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedStock.riskLevel === 'High' && (
                        <>
                          <li>• High debt levels or poor cash flow</li>
                          <li>• Declining business fundamentals</li>
                          <li>• Regulatory or sector headwinds</li>
                        </>
                      )}
                      {selectedStock.riskLevel === 'Medium' && (
                        <>
                          <li>• Moderate competitive pressures</li>
                          <li>• Cyclical business nature</li>
                          <li>• Valuation concerns</li>
                        </>
                      )}
                      {selectedStock.riskLevel === 'Low' && (
                        <>
                          <li>• Market volatility</li>
                          <li>• General economic conditions</li>
                          <li>• Sector-specific risks</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MultibaggerAnalysis;
