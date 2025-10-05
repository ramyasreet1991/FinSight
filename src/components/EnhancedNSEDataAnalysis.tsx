import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Input } from '../ui/input';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Calendar,
  DollarSign,
  Percent,
  Zap,
  Shield,
  Info,
  ExternalLink,
  Database,
  LineChart,
  Search,
  BookOpen,
  Lightbulb,
  Globe,
  Building,
  Coins,
  TrendingUp as Growth,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface NSEMarketData {
  date: string;
  totalTurnover: number;
  totalVolume: number;
  advances: number;
  declines: number;
  unchanged: number;
  advanceDeclineRatio: number;
  mostActive: Array<{
    symbol: string;
    name: string;
    turnover: number;
    volume: number;
    changePercent: number;
    price: number;
    sector: string;
  }>;
  topNSecuritiesShare: number;
  internetTradingShare: number;
  deliveryPercentage: number;
  marketCap: number;
  breadthScore: number;
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  category: string;
  metrics: any;
  recommendation: string;
}

interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  potential: 'High' | 'Medium' | 'Low';
  timeframe: string;
  sectors: string[];
  keyStocks: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

const EnhancedNSEDataAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [marketData, setMarketData] = useState<NSEMarketData | null>(null);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [opportunities, setOpportunities] = useState<MarketOpportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock data initialization
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMarketData: NSEMarketData = {
        date: '2024-01-15',
        totalTurnover: 125000,
        totalVolume: 85000,
        advances: 1245,
        declines: 876,
        unchanged: 234,
        advanceDeclineRatio: 1.42,
        mostActive: [
          { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', turnover: 4500, volume: 12500, changePercent: 2.5, price: 2845.50, sector: 'Oil & Gas' },
          { symbol: 'TCS', name: 'Tata Consultancy Services', turnover: 3200, volume: 8900, changePercent: -1.2, price: 3456.80, sector: 'IT' },
          { symbol: 'INFY', name: 'Infosys Ltd', turnover: 2800, volume: 7600, changePercent: 1.8, price: 1567.90, sector: 'IT' },
          { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', turnover: 2600, volume: 9800, changePercent: 0.5, price: 1623.40, sector: 'Banking' },
          { symbol: 'SBIN', name: 'State Bank of India', turnover: 2400, volume: 11200, changePercent: 3.2, price: 567.80, sector: 'Banking' }
        ],
        topNSecuritiesShare: 68.5,
        internetTradingShare: 23.4,
        deliveryPercentage: 58.3,
        marketCap: 2850000,
        breadthScore: 72
      };

      const mockInsights: MarketInsight[] = [
        {
          id: '1',
          title: 'Strong Market Breadth Indicates Healthy Rally',
          description: 'Advance-decline ratio of 1.42 suggests broad-based participation in the current market rally, with 58.7% of stocks advancing.',
          impact: 'Positive',
          confidence: 85,
          category: 'Market Breadth',
          metrics: { advanceDeclineRatio: 1.42, advancingStocks: 1245, decliningStocks: 876 },
          recommendation: 'Continue monitoring for sustained breadth. Consider diversifying across sectors showing strength.'
        },
        {
          id: '2',
          title: 'High Delivery Percentage Shows Genuine Buying Interest',
          description: 'Delivery percentage of 58.3% indicates strong genuine buying interest, suggesting institutional and long-term investor participation.',
          impact: 'Positive',
          confidence: 78,
          category: 'Delivery Analysis',
          metrics: { deliveryPercentage: 58.3, averageDelivery: 45.2 },
          recommendation: 'Focus on stocks with high delivery percentages for potential long-term investments.'
        },
        {
          id: '3',
          title: 'Concentration Risk in Top Securities',
          description: 'Top N securities account for 68.5% of total turnover, indicating high concentration risk in large-cap stocks.',
          impact: 'Negative',
          confidence: 82,
          category: 'Liquidity Analysis',
          metrics: { topNSecuritiesShare: 68.5, concentrationRatio: 2.1 },
          recommendation: 'Diversify portfolio to include mid and small-cap stocks to reduce concentration risk.'
        }
      ];

      const mockOpportunities: MarketOpportunity[] = [
        {
          id: '1',
          title: 'Banking Sector Recovery Play',
          description: 'Banking stocks showing strong delivery and volume, indicating potential recovery from recent corrections.',
          potential: 'High',
          timeframe: '3-6 months',
          sectors: ['Banking', 'Financial Services'],
          keyStocks: ['HDFCBANK', 'SBIN', 'ICICIBANK', 'KOTAKBANK'],
          riskLevel: 'Medium'
        },
        {
          id: '2',
          title: 'IT Sector Value Opportunity',
          description: 'IT stocks trading at attractive valuations with improving fundamentals and digital transformation tailwinds.',
          potential: 'Medium',
          timeframe: '6-12 months',
          sectors: ['IT', 'Software'],
          keyStocks: ['TCS', 'INFY', 'HCLTECH', 'WIPRO'],
          riskLevel: 'Low'
        },
        {
          id: '3',
          title: 'Small-Cap Momentum Strategy',
          description: 'Small-cap stocks showing strong momentum with improving market breadth and liquidity.',
          potential: 'High',
          timeframe: '1-3 months',
          sectors: ['Small-Cap', 'Mid-Cap'],
          keyStocks: ['Multiple opportunities in small-cap space'],
          riskLevel: 'High'
        }
      ];

      setMarketData(mockMarketData);
      setInsights(mockInsights);
      setOpportunities(mockOpportunities);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 10000000); // Assuming amount is in crores
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'Negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'Neutral': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading NSE market data...</p>
        </div>
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load market data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced NSE Data Analysis</h1>
              <p className="text-gray-600 mt-2">Comprehensive market insights, opportunities, and real-time data analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live Data</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
                <p>• Market data and insights are provided for informational purposes</p>
                <p>• Past performance does not guarantee future results</p>
                <p>• Please consult with a qualified financial advisor before making investment decisions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Breadth Score</p>
                <p className="text-2xl font-bold text-gray-900">{marketData.breadthScore}/100</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+5 from yesterday</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Turnover</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(marketData.totalTurnover)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+8.2% from yesterday</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Advance/Decline</p>
                <p className="text-2xl font-bold text-gray-900">{marketData.advanceDeclineRatio.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Broad participation</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery %</p>
                <p className="text-2xl font-bold text-gray-900">{marketData.deliveryPercentage}%</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Strong buying interest</span>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* Market Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Breadth Analysis */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                    Market Breadth Analysis
                  </h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {marketData.date}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{marketData.advances}</div>
                      <div className="text-sm text-green-700">Advances</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{marketData.declines}</div>
                      <div className="text-sm text-red-700">Declines</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">{marketData.unchanged}</div>
                      <div className="text-sm text-gray-700">Unchanged</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Advance/Decline Ratio</span>
                      <span className="text-lg font-bold text-blue-900">{marketData.advanceDeclineRatio.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-700">
                      {marketData.advanceDeclineRatio > 1.2 ? 'Strong breadth - Bullish sentiment' : 
                       marketData.advanceDeclineRatio < 0.8 ? 'Weak breadth - Bearish sentiment' : 
                       'Neutral breadth - Mixed sentiment'}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Liquidity Analysis */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Coins className="h-5 w-5 text-green-600 mr-2" />
                    Liquidity Analysis
                  </h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Live
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Top N Securities Share</span>
                      <span className="text-lg font-bold text-green-900">{marketData.topNSecuritiesShare}%</span>
                    </div>
                    <div className="mt-2 text-xs text-green-700">
                      {marketData.topNSecuritiesShare > 70 ? 'High concentration risk' : 
                       marketData.topNSecuritiesShare < 50 ? 'Well distributed liquidity' : 
                       'Moderate concentration'}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Internet Trading Share</span>
                      <span className="text-lg font-bold text-blue-900">{marketData.internetTradingShare}%</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-700">
                      Retail participation in market activity
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Most Active Securities */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 text-purple-600 mr-2" />
                  Most Active Securities
                </h3>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search securities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Symbol</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Sector</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Change %</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Turnover (Cr)</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Volume (L)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.mostActive
                      .filter(stock => 
                        searchQuery === '' || 
                        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((stock, index) => (
                      <tr key={stock.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{stock.symbol}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600">{stock.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs">{stock.sector}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          ₹{stock.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`flex items-center justify-end space-x-1 ${
                            stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.changePercent >= 0 ? 
                              <ArrowUpRight className="h-4 w-4" /> : 
                              <ArrowDownRight className="h-4 w-4" />
                            }
                            <span className="font-medium">
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          ₹{stock.turnover.toFixed(0)} Cr
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          {stock.volume.toFixed(0)}L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Market Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight) => (
                <Card key={insight.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`p-2 rounded-lg border ${
                      insight.impact === 'Positive' ? 'bg-green-100 border-green-200' :
                      insight.impact === 'Negative' ? 'bg-red-100 border-red-200' :
                      'bg-blue-100 border-blue-200'
                    }`}>
                      {insight.impact === 'Positive' ? 
                        <TrendingUp className="h-5 w-5 text-green-600" /> :
                        insight.impact === 'Negative' ?
                        <TrendingDown className="h-5 w-5 text-red-600" /> :
                        <Minus className="h-5 w-5 text-blue-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={`${getImpactColor(insight.impact)}`}>
                          {insight.impact}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{insight.description}</p>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mr-1" />
                      Recommendation
                    </h5>
                    <p className="text-sm text-gray-600">{insight.recommendation}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{insight.category}</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Opportunities */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={`${getPotentialColor(opportunity.potential)}`}>
                          {opportunity.potential} Potential
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {opportunity.timeframe}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getRiskColor(opportunity.riskLevel)}`}>
                          Risk: {opportunity.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Target Sectors:</h5>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.sectors.map((sector, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Key Stocks:</h5>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.keyStocks.map((stock, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            {stock}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <Target className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Educational Content */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  Understanding NSE Data
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Market Breadth</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Measures the number of stocks advancing vs declining. A ratio above 1.2 indicates strong market sentiment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Delivery Percentage</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Percentage of shares delivered vs traded. High delivery indicates genuine buying interest.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Liquidity Concentration</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Shows how much trading is concentrated in top securities. High concentration indicates risk.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Tools & Resources */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 text-green-600 mr-2" />
                  Tools & Resources
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Market Breadth Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="h-4 w-4 mr-2" />
                    Sector Analysis Tool
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trend Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Risk Assessment
                  </Button>
                </div>
              </Card>
            </div>

            {/* Best Practices */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                NSE Data Analysis Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">✅ Best Practices</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Monitor market breadth for sentiment analysis</li>
                    <li>• Track delivery percentages for genuine interest</li>
                    <li>• Watch liquidity concentration for risk assessment</li>
                    <li>• Analyze most active securities for trends</li>
                    <li>• Use multiple timeframes for confirmation</li>
                    <li>• Combine with fundamental analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Relying solely on price movements</li>
                    <li>• Ignoring volume and delivery data</li>
                    <li>• Not considering market breadth</li>
                    <li>• Overlooking liquidity risks</li>
                    <li>• Trading on single data points</li>
                    <li>• Ignoring sector rotation patterns</li>
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

export default EnhancedNSEDataAnalysis;
