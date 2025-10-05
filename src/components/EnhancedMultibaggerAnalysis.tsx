import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
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
  ExternalLink,
  BookOpen,
  Lightbulb,
  Eye,
  ArrowUpRight,
  TrendingUp as Growth,
  Lock,
  Coins,
  MapPin,
  Clock,
  FileText
} from 'lucide-react';

interface MultibaggerCharacteristic {
  id: string;
  name: string;
  description: string;
  detailedExplanation: string;
  weight: number;
  icon: React.ComponentType<any>;
  examples: string[];
  metrics: string[];
  redFlags: string[];
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
      details: string;
      metrics: any;
    };
  };
  totalScore: number;
  verdict: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  priceTarget?: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  financialMetrics: {
    revenueGrowth: number;
    profitGrowth: number;
    debtToEquity: number;
    roe: number;
    pe: number;
    pb: number;
    marketCap: number;
  };
}

const EnhancedMultibaggerAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('criteria');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedVerdict, setSelectedVerdict] = useState<string>('all');
  const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const multibaggerCharacteristics: MultibaggerCharacteristic[] = [
    {
      id: 'growth',
      name: 'Revenue & Profit Growth',
      description: 'Consistent top-line and bottom-line growth over 3+ years',
      detailedExplanation: 'Sustainable growth is the foundation of multibagger stocks. Look for companies that have demonstrated consistent revenue and profit growth over multiple years, ideally 15-25% CAGR. This indicates strong business fundamentals and market demand.',
      weight: 1.0,
      icon: TrendingUp,
      examples: ['Revenue CAGR > 15% for 3+ years', 'Profit CAGR > 20% for 3+ years', 'Consistent quarterly growth'],
      metrics: ['Revenue CAGR', 'Profit CAGR', 'Quarterly Growth Rate', 'Growth Consistency Score'],
      redFlags: ['Declining revenues', 'Volatile profit margins', 'One-time gains boosting profits', 'Growth dependent on acquisitions']
    },
    {
      id: 'market',
      name: 'Large Addressable Market',
      description: 'Sector growth trends and market expansion potential',
      detailedExplanation: 'Companies operating in large, growing markets have more room to scale. Focus on sectors with structural growth drivers like digital transformation, urbanization, rising incomes, or regulatory tailwinds.',
      weight: 1.0,
      icon: Globe,
      examples: ['Digital payments (₹50L+ crore market)', 'Electric vehicles (growing 30%+ annually)', 'Healthcare (demographic dividend)'],
      metrics: ['Market Size', 'Market Growth Rate', 'Market Share', 'TAM (Total Addressable Market)'],
      redFlags: ['Declining industry', 'Saturated markets', 'Regulatory headwinds', 'Technology disruption risk']
    },
    {
      id: 'scalability',
      name: 'Scalability & Operating Leverage',
      description: 'Business can grow margins as it scales',
      detailedExplanation: 'Scalable businesses can increase margins as they grow due to fixed cost leverage, network effects, or operational efficiency. This creates a virtuous cycle where growth leads to higher profitability.',
      weight: 1.0,
      icon: Zap,
      examples: ['Software companies (high gross margins)', 'Platform businesses (network effects)', 'Asset-light models'],
      metrics: ['Operating Leverage', 'Margin Expansion', 'Fixed vs Variable Costs', 'Scale Benefits'],
      redFlags: ['High variable costs', 'Marginal cost increases', 'Capacity constraints', 'Diseconomies of scale']
    },
    {
      id: 'management',
      name: 'Visionary & Strong Management',
      description: 'Track record of leadership and execution',
      detailedExplanation: 'Quality management is crucial for long-term success. Look for leaders with vision, integrity, and a proven track record of execution. Check for promoter holding, insider buying, and alignment with minority shareholders.',
      weight: 1.0,
      icon: Users,
      examples: ['Promoter holding > 40%', 'Insider buying activity', 'Track record of value creation', 'Corporate governance ratings'],
      metrics: ['Promoter Holding %', 'Insider Trading Activity', 'Management Tenure', 'Corporate Governance Score'],
      redFlags: ['Frequent promoter selling', 'High management turnover', 'Corporate governance issues', 'Related party transactions']
    },
    {
      id: 'debt',
      name: 'Low or Manageable Debt',
      description: 'Debt/equity ratio and interest coverage',
      detailedExplanation: 'Low debt levels provide financial flexibility and reduce bankruptcy risk. Companies with manageable debt can invest in growth without excessive financial stress. Interest coverage ratio should be >3x.',
      weight: 1.0,
      icon: Shield,
      examples: ['Debt-to-equity < 0.5', 'Interest coverage > 3x', 'Net debt/EBITDA < 2x', 'Cash on books'],
      metrics: ['Debt-to-Equity Ratio', 'Interest Coverage Ratio', 'Net Debt/EBITDA', 'Cash Position'],
      redFlags: ['High debt-to-equity ratio', 'Low interest coverage', 'Rising debt levels', 'Covenant breaches']
    },
    {
      id: 'cashflow',
      name: 'Positive Cash Flow & Reinvestment',
      description: 'Strong free cash flow and reinvestment capacity',
      detailedExplanation: 'Cash flow is the lifeblood of any business. Companies generating strong free cash flows can reinvest in growth, pay dividends, or reduce debt. Look for consistent FCF generation and efficient capital allocation.',
      weight: 1.0,
      icon: DollarSign,
      examples: ['Positive FCF for 3+ years', 'FCF margins > 10%', 'Efficient working capital management', 'ROIC > Cost of capital'],
      metrics: ['Free Cash Flow', 'FCF Margin', 'Cash Conversion Cycle', 'ROIC'],
      redFlags: ['Negative free cash flow', 'Poor working capital management', 'Low ROIC', 'Cash burn rate']
    },
    {
      id: 'moat',
      name: 'Competitive Advantage / Economic Moat',
      description: 'Brand, patents, cost advantage, network effect',
      detailedExplanation: 'Economic moats protect companies from competition and allow them to maintain pricing power. Strong moats include brand recognition, patents, network effects, switching costs, or cost advantages.',
      weight: 1.0,
      icon: Building,
      examples: ['Brand recognition (Titan, Asian Paints)', 'Patents (Pharma companies)', 'Network effects (Paytm, Zomato)', 'Switching costs (SAP, Microsoft)'],
      metrics: ['Brand Value', 'Patent Portfolio', 'Market Share', 'Pricing Power'],
      redFlags: ['Weak competitive position', 'Declining market share', 'Price competition', 'No differentiation']
    },
    {
      id: 'valuation',
      name: 'Undervaluation / Mispricing',
      description: 'Current valuation vs growth potential',
      detailedExplanation: 'Even great companies can be poor investments if overvalued. Look for companies trading at reasonable valuations relative to their growth prospects. Consider PEG ratio, P/E to growth, and relative valuations.',
      weight: 1.0,
      icon: Target,
      examples: ['PEG ratio < 1.5', 'P/E < 25 for growth stocks', 'Trading below sector average', 'Margin of safety'],
      metrics: ['P/E Ratio', 'PEG Ratio', 'P/B Ratio', 'EV/EBITDA'],
      redFlags: ['High P/E ratios', 'PEG > 2', 'Trading at premium to growth', 'Overvaluation']
    },
    {
      id: 'marketcap',
      name: 'Market Cap Potential',
      description: 'Small-to-mid cap with high growth headroom',
      detailedExplanation: 'Smaller companies have more room to grow into multibaggers. Focus on companies with market cap ₹1,000-50,000 crores that can potentially grow 10-50x over the long term.',
      weight: 1.0,
      icon: BarChart3,
      examples: ['Market cap ₹1,000-50,000 crores', 'Room for 10-50x growth', 'Undiscovered gems', 'Emerging leaders'],
      metrics: ['Current Market Cap', 'Growth Potential', 'Market Cap Trajectory', 'Size Advantage'],
      redFlags: ['Too large (limited upside)', 'Too small (liquidity issues)', 'Micro cap risks', 'Penny stocks']
    },
    {
      id: 'momentum',
      name: 'Price Momentum / Market Recognition',
      description: 'Market recognition of fundamentals',
      detailedExplanation: 'While contrarian investing can be profitable, some momentum helps. Look for stocks showing positive price momentum backed by strong fundamentals, indicating market recognition of the company\'s potential.',
      weight: 1.0,
      icon: Activity,
      examples: ['Positive price momentum', 'Volume expansion', 'Institutional buying', 'Analyst upgrades'],
      metrics: ['Price Momentum', 'Volume Trends', 'Institutional Holdings', 'Analyst Sentiment'],
      redFlags: ['Declining price momentum', 'Low trading volumes', 'Institutional selling', 'Analyst downgrades']
    }
  ];

  // Mock data for demonstration
  useEffect(() => {
    const mockAnalyses: StockAnalysis[] = [
      {
        symbol: 'BALRAMCHIN',
        name: 'Balrampur Chini Mills Ltd',
        currentPrice: 456.50,
        marketCap: '₹9,500 Cr',
        sector: 'Sugar',
        characteristics: {
          growth: { score: 1, reasoning: 'Strong revenue and profit growth', confidence: 85, details: 'Revenue CAGR 18%, Profit CAGR 22%', metrics: { revenueGrowth: 18, profitGrowth: 22 } },
          market: { score: 0.5, reasoning: 'Moderate market growth potential', confidence: 70, details: 'Sugar industry growing 8% annually', metrics: { marketGrowth: 8 } },
          scalability: { score: 1, reasoning: 'High operating leverage', confidence: 80, details: 'Fixed cost leverage in sugar production', metrics: { operatingLeverage: 1.2 } },
          management: { score: 1, reasoning: 'Strong promoter holding', confidence: 90, details: 'Promoter holding 45%, experienced team', metrics: { promoterHolding: 45 } },
          debt: { score: 0.5, reasoning: 'Moderate debt levels', confidence: 75, details: 'Debt-to-equity 0.6, manageable', metrics: { debtToEquity: 0.6 } },
          cashflow: { score: 1, reasoning: 'Strong cash generation', confidence: 85, details: 'Positive FCF for 4 years', metrics: { fcf: 1200 } },
          moat: { score: 0.5, reasoning: 'Limited competitive advantage', confidence: 60, details: 'Commodity business, limited differentiation', metrics: { marketShare: 12 } },
          valuation: { score: 1, reasoning: 'Attractive valuation', confidence: 80, details: 'P/E 15, below industry average', metrics: { pe: 15 } },
          marketcap: { score: 1, reasoning: 'Good size for growth', confidence: 85, details: 'Market cap ₹9,500 Cr, room for growth', metrics: { marketCap: 9500 } },
          momentum: { score: 0.5, reasoning: 'Mixed momentum signals', confidence: 65, details: 'Recent price correction, fundamentals strong', metrics: { momentum: 0.1 } }
        },
        totalScore: 8.0,
        verdict: 'High',
        lastUpdated: '2024-01-15',
        priceTarget: 650,
        riskLevel: 'Medium',
        financialMetrics: {
          revenueGrowth: 18,
          profitGrowth: 22,
          debtToEquity: 0.6,
          roe: 18,
          pe: 15,
          pb: 2.1,
          marketCap: 9500
        }
      },
      {
        symbol: 'TATACHEM',
        name: 'Tata Chemicals Ltd',
        currentPrice: 1245.80,
        marketCap: '₹31,200 Cr',
        sector: 'Chemicals',
        characteristics: {
          growth: { score: 0.5, reasoning: 'Moderate growth trajectory', confidence: 70, details: 'Revenue CAGR 12%, Profit CAGR 15%', metrics: { revenueGrowth: 12, profitGrowth: 15 } },
          market: { score: 1, reasoning: 'Large growing market', confidence: 85, details: 'Chemicals industry growing 12% annually', metrics: { marketGrowth: 12 } },
          scalability: { score: 1, reasoning: 'Excellent scalability', confidence: 90, details: 'Asset-light model with high margins', metrics: { operatingLeverage: 1.5 } },
          management: { score: 1, reasoning: 'Tata group backing', confidence: 95, details: 'Tata group reputation and governance', metrics: { promoterHolding: 38 } },
          debt: { score: 1, reasoning: 'Low debt levels', confidence: 90, details: 'Debt-to-equity 0.3, strong balance sheet', metrics: { debtToEquity: 0.3 } },
          cashflow: { score: 0.5, reasoning: 'Variable cash flows', confidence: 65, details: 'Cyclical cash flows due to commodity nature', metrics: { fcf: 800 } },
          moat: { score: 1, reasoning: 'Strong competitive position', confidence: 85, details: 'Market leadership in specialty chemicals', metrics: { marketShare: 25 } },
          valuation: { score: 0.5, reasoning: 'Fair valuation', confidence: 70, details: 'P/E 22, sector average', metrics: { pe: 22 } },
          marketcap: { score: 0.5, reasoning: 'Large cap with limited upside', confidence: 60, details: 'Market cap ₹31,200 Cr, limited multibagger potential', metrics: { marketCap: 31200 } },
          momentum: { score: 0.5, reasoning: 'Neutral momentum', confidence: 60, details: 'Sideways price movement', metrics: { momentum: 0.05 } }
        },
        totalScore: 7.0,
        verdict: 'Medium',
        lastUpdated: '2024-01-15',
        priceTarget: 1550,
        riskLevel: 'Low',
        financialMetrics: {
          revenueGrowth: 12,
          profitGrowth: 15,
          debtToEquity: 0.3,
          roe: 15,
          pe: 22,
          pb: 3.2,
          marketCap: 31200
        }
      }
    ];
    setStockAnalyses(mockAnalyses);
  }, []);

  const filteredStocks = stockAnalyses.filter(stock => {
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
    const matchesVerdict = selectedVerdict === 'all' || stock.verdict === selectedVerdict;
    const matchesSearch = searchQuery === '' || 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSector && matchesVerdict && matchesSearch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced Multibagger Analysis</h1>
              <p className="text-gray-600 mt-2">Comprehensive 10-point framework for identifying potential multibagger stocks</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Critical Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Important Investment Disclaimer</h3>
              <div className="text-sm text-red-700 mt-1 space-y-1">
                <p>• This analysis is for <strong>educational purposes only</strong> and not investment advice</p>
                <p>• Past performance does not guarantee future results</p>
                <p>• All investments carry risk of loss</p>
                <p>• Please consult with a qualified financial advisor before making investment decisions</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="criteria">Multibagger Criteria</TabsTrigger>
            <TabsTrigger value="analysis">Stock Analysis</TabsTrigger>
            <TabsTrigger value="screening">Stock Screening</TabsTrigger>
            <TabsTrigger value="education">Education & Resources</TabsTrigger>
          </TabsList>

          {/* Multibagger Criteria */}
          <TabsContent value="criteria" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The 10-Point Multibagger Framework</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our comprehensive framework evaluates stocks across 10 key characteristics that historically 
                identify potential multibagger investments. Each criterion is weighted equally and scored 
                from 0-10 points for a maximum total score of 100.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {multibaggerCharacteristics.map((characteristic, index) => (
                <Card key={characteristic.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <characteristic.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{characteristic.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Weight: {characteristic.weight}x
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{characteristic.description}</p>
                      
                      <details className="mb-4">
                        <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                          <Info className="h-4 w-4 inline mr-1" />
                          Detailed Explanation
                        </summary>
                        <p className="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg">
                          {characteristic.detailedExplanation}
                        </p>
                      </details>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            What to Look For:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {characteristic.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-600 mr-2">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <BarChart3 className="h-4 w-4 text-blue-600 mr-1" />
                            Key Metrics:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {characteristic.metrics.map((metric, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <XCircle className="h-4 w-4 text-red-600 mr-1" />
                            Red Flags:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {characteristic.redFlags.map((flag, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-600 mr-2">•</span>
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Scoring Guide */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                Scoring Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-600">8-10</span>
                  </div>
                  <h4 className="font-semibold text-green-800">High Potential</h4>
                  <p className="text-sm text-green-600 mt-1">Strong multibagger characteristics across most criteria</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-yellow-600">5-7</span>
                  </div>
                  <h4 className="font-semibold text-yellow-800">Medium Potential</h4>
                  <p className="text-sm text-yellow-600 mt-1">Some multibagger characteristics but mixed signals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-red-600">0-4</span>
                  </div>
                  <h4 className="font-semibold text-red-800">Low Potential</h4>
                  <p className="text-sm text-red-600 mt-1">Limited multibagger characteristics identified</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Stock Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            {selectedStock ? (
              <div className="space-y-6">
                {/* Stock Header */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStock.name}</h2>
                      <p className="text-gray-600">{selectedStock.symbol} • {selectedStock.sector}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">₹{selectedStock.currentPrice}</div>
                      <div className="text-sm text-gray-500">Market Cap: {selectedStock.marketCap}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getVerdictColor(selectedStock.verdict)}`}>
                      {selectedStock.verdict} Potential
                    </Badge>
                    <Badge variant="outline" className={`${getScoreColor(selectedStock.totalScore)}`}>
                      Score: {selectedStock.totalScore}/10
                    </Badge>
                    <Badge variant="outline">
                      Risk: {selectedStock.riskLevel}
                    </Badge>
                    {selectedStock.priceTarget && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Target: ₹{selectedStock.priceTarget}
                      </Badge>
                    )}
                  </div>
                </Card>

                {/* Financial Metrics */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Revenue Growth</div>
                      <div className="text-lg font-semibold text-green-600">{selectedStock.financialMetrics.revenueGrowth}%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Profit Growth</div>
                      <div className="text-lg font-semibold text-green-600">{selectedStock.financialMetrics.profitGrowth}%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">ROE</div>
                      <div className="text-lg font-semibold text-blue-600">{selectedStock.financialMetrics.roe}%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">P/E Ratio</div>
                      <div className="text-lg font-semibold text-gray-600">{selectedStock.financialMetrics.pe}</div>
                    </div>
                  </div>
                </Card>

                {/* Detailed Characteristics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {multibaggerCharacteristics.map((characteristic) => {
                    const analysis = selectedStock.characteristics[characteristic.id];
                    return (
                      <Card key={characteristic.id} className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <characteristic.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{characteristic.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={`${getScoreColor(analysis.score * 10)}`}>
                                Score: {analysis.score * 10}/10
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Confidence: {analysis.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{analysis.reasoning}</p>
                        <p className="text-sm text-gray-500 mb-3">{analysis.details}</p>
                        
                        <details>
                          <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                            View Metrics
                          </summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <pre className="text-xs text-gray-600">
                              {JSON.stringify(analysis.metrics, null, 2)}
                            </pre>
                          </div>
                        </details>
                      </Card>
                    );
                  })}
                </div>

                <Button 
                  onClick={() => setSelectedStock(null)}
                  variant="outline"
                  className="w-full"
                >
                  Back to Stock List
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Stock to View Analysis</h3>
                <p className="text-gray-600">Choose a stock from the screening tab to see detailed multibagger analysis</p>
              </div>
            )}
          </TabsContent>

          {/* Stock Screening */}
          <TabsContent value="screening" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Sectors</option>
                  <option value="Sugar">Sugar</option>
                  <option value="Chemicals">Chemicals</option>
                </select>
                
                <select
                  value={selectedVerdict}
                  onChange={(e) => setSelectedVerdict(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Verdicts</option>
                  <option value="High">High Potential</option>
                  <option value="Medium">Medium Potential</option>
                  <option value="Low">Low Potential</option>
                </select>
              </div>
            </Card>

            {/* Stock List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStocks.map((stock) => (
                <Card 
                  key={stock.symbol} 
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">₹{stock.currentPrice}</div>
                      <div className="text-xs text-gray-500">{stock.marketCap}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{stock.sector}</Badge>
                    <Badge className={`${getVerdictColor(stock.verdict)}`}>
                      {stock.verdict} Potential
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Multibagger Score</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(stock.totalScore)}`}>
                      {stock.totalScore}/10
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>Updated: {stock.lastUpdated}</span>
                    <span className="flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      View Details
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education & Resources */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Educational Content */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  Learning Resources
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Understanding Multibagger Investing</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Learn the fundamentals of identifying stocks with 10x+ potential returns
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Financial Statement Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Master the art of reading balance sheets, P&L, and cash flow statements
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Risk Management</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential strategies for managing portfolio risk and position sizing
                    </p>
                  </div>
                </div>
              </Card>

              {/* Tools & Calculators */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 text-green-600 mr-2" />
                  Tools & Calculators
                </h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    CAGR Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="h-4 w-4 mr-2" />
                    Portfolio Allocation Tool
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Price Target Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Risk Assessment Tool
                  </Button>
                </div>
              </Card>
            </div>

            {/* Best Practices */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                Multibagger Investing Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">✅ Do's</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Invest for the long term (5+ years)</li>
                    <li>• Diversify across sectors and market caps</li>
                    <li>• Focus on business fundamentals</li>
                    <li>• Keep position sizes reasonable</li>
                    <li>• Regular review and rebalancing</li>
                    <li>• Stay updated with quarterly results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">❌ Don'ts</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Don't chase hot tips or rumors</li>
                    <li>• Avoid over-concentration in one stock</li>
                    <li>• Don't ignore risk management</li>
                    <li>• Avoid emotional decision making</li>
                    <li>• Don't invest money you can't afford to lose</li>
                    <li>• Avoid timing the market</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedMultibaggerAnalysis;
