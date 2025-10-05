import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
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
  LineChart
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
    turnover: number;
    volume: number;
    changePercent: number;
  }>;
  topNSecuritiesShare: number;
  internetTradingShare: number;
  deliveryPercentage: number;
}

interface NSESecurityData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  deliverableVolume: number;
  deliveryPercentage: number;
}

interface MarketInsight {
  type: 'breadth' | 'liquidity' | 'delivery' | 'participation' | 'leadership';
  title: string;
  score: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  description: string;
  opportunity?: string;
}

interface Opportunity {
  category: 'momentum' | 'contrarian' | 'value' | 'growth';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high';
  symbols?: string[];
}

const NSEDataAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1M');
  const [selectedMode, setSelectedMode] = useState<string>('investor');
  const [marketData, setMarketData] = useState<NSEMarketData[]>([]);
  const [securityData, setSecurityData] = useState<NSESecurityData[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const periods = [
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' }
  ];

  const modes = [
    { value: 'investor', label: 'Investor', icon: Target },
    { value: 'trader', label: 'Trader', icon: Activity },
    { value: 'pm', label: 'Portfolio Manager', icon: Users }
  ];

  // Mock data generation for demonstration
  useEffect(() => {
    generateMockData();
  }, [selectedPeriod]);

  const generateMockData = () => {
    setLoading(true);
    
    // Generate mock market data
    const mockMarketData: NSEMarketData[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const advances = Math.floor(Math.random() * 800) + 1200;
      const declines = Math.floor(Math.random() * 800) + 800;
      const totalTurnover = Math.floor(Math.random() * 50000) + 80000; // Crores
      const totalVolume = Math.floor(Math.random() * 100000) + 200000; // Lakhs
      
      return {
        date: date.toISOString().split('T')[0],
        totalTurnover,
        totalVolume,
        advances,
        declines,
        unchanged: 100,
        advanceDeclineRatio: advances / declines,
        mostActive: Array.from({ length: 10 }, (_, j) => ({
          symbol: `STOCK${j + 1}`,
          turnover: Math.floor(Math.random() * 1000) + 500,
          volume: Math.floor(Math.random() * 10000) + 5000,
          changePercent: (Math.random() - 0.5) * 20
        })),
        topNSecuritiesShare: Math.random() * 20 + 60,
        internetTradingShare: Math.random() * 10 + 15,
        deliveryPercentage: Math.random() * 20 + 40
      };
    });

    // Generate mock security data
    const mockSecurityData: NSESecurityData[] = Array.from({ length: 50 }, (_, i) => {
      const symbols = ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'KOTAKBANK', 'LT'];
      const symbol = symbols[i % symbols.length];
      const basePrice = Math.random() * 2000 + 100;
      const change = (Math.random() - 0.5) * 100;
      
      return {
        symbol,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: basePrice,
        high: basePrice + Math.abs(change),
        low: basePrice - Math.abs(change),
        close: basePrice + change,
        volume: Math.floor(Math.random() * 50000) + 10000,
        deliverableVolume: Math.floor(Math.random() * 20000) + 5000,
        deliveryPercentage: Math.random() * 40 + 30
      };
    });

    setMarketData(mockMarketData);
    setSecurityData(mockSecurityData);
    
    // Generate insights
    generateInsights(mockMarketData, mockSecurityData);
    
    // Generate opportunities
    generateOpportunities(mockMarketData, mockSecurityData);
    
    setLastUpdated(new Date().toISOString());
    setLoading(false);
  };

  const generateInsights = (marketData: NSEMarketData[], securityData: NSESecurityData[]) => {
    const avgAdvanceDeclineRatio = marketData.reduce((sum, d) => sum + d.advanceDeclineRatio, 0) / marketData.length;
    const avgDeliveryPercentage = marketData.reduce((sum, d) => sum + d.deliveryPercentage, 0) / marketData.length;
    const avgTopNShare = marketData.reduce((sum, d) => sum + d.topNSecuritiesShare, 0) / marketData.length;

    const insights: MarketInsight[] = [
      {
        type: 'breadth',
        title: 'Market Breadth',
        score: Math.min(100, Math.max(0, (avgAdvanceDeclineRatio - 0.8) * 100)),
        trend: avgAdvanceDeclineRatio > 1.2 ? 'bullish' : avgAdvanceDeclineRatio < 0.8 ? 'bearish' : 'neutral',
        description: `Average A/D ratio of ${avgAdvanceDeclineRatio.toFixed(2)} indicates ${avgAdvanceDeclineRatio > 1.2 ? 'strong' : avgAdvanceDeclineRatio < 0.8 ? 'weak' : 'neutral'} market breadth`,
        opportunity: avgAdvanceDeclineRatio > 1.2 ? 'Look for momentum plays in advancing stocks' : 'Consider contrarian opportunities in oversold sectors'
      },
      {
        type: 'delivery',
        title: 'Delivery Quality',
        score: avgDeliveryPercentage,
        trend: avgDeliveryPercentage > 60 ? 'bullish' : avgDeliveryPercentage < 40 ? 'bearish' : 'neutral',
        description: `Average delivery percentage of ${avgDeliveryPercentage.toFixed(1)}% suggests ${avgDeliveryPercentage > 60 ? 'strong' : avgDeliveryPercentage < 40 ? 'weak' : 'moderate'} conviction`,
        opportunity: avgDeliveryPercentage > 60 ? 'High delivery indicates genuine buying interest' : 'Low delivery suggests speculative activity'
      },
      {
        type: 'liquidity',
        title: 'Liquidity Concentration',
        score: avgTopNShare,
        trend: avgTopNShare > 70 ? 'bearish' : avgTopNShare < 50 ? 'bullish' : 'neutral',
        description: `Top N securities account for ${avgTopNShare.toFixed(1)}% of turnover, indicating ${avgTopNShare > 70 ? 'high' : avgTopNShare < 50 ? 'broad' : 'moderate'} concentration`,
        opportunity: avgTopNShare > 70 ? 'High concentration may lead to volatility' : 'Broad participation suggests healthy market'
      },
      {
        type: 'participation',
        title: 'Retail Participation',
        score: marketData[0]?.internetTradingShare || 0,
        trend: (marketData[0]?.internetTradingShare || 0) > 20 ? 'bullish' : 'neutral',
        description: `Internet trading share of ${(marketData[0]?.internetTradingShare || 0).toFixed(1)}% indicates retail participation level`,
        opportunity: 'Monitor for retail-driven momentum or panic selling'
      }
    ];

    setInsights(insights);
  };

  const generateOpportunities = (marketData: NSEMarketData[], securityData: NSESecurityData[]) => {
    const opportunities: Opportunity[] = [
      {
        category: 'momentum',
        title: 'High Delivery Breakouts',
        description: 'Stocks showing price breakouts with increasing delivery percentage indicate strong momentum',
        confidence: 85,
        timeframe: '1-2 weeks',
        riskLevel: 'medium',
        symbols: ['RELIANCE', 'TCS', 'HDFC']
      },
      {
        category: 'contrarian',
        title: 'Oversold Recovery Candidates',
        description: 'Quality stocks trading near support levels with improving delivery',
        confidence: 75,
        timeframe: '2-4 weeks',
        riskLevel: 'low',
        symbols: ['ITC', 'BHARTIARTL']
      },
      {
        category: 'value',
        title: 'Low Delivery Quality Stocks',
        description: 'Fundamentally strong stocks with temporary delivery weakness',
        confidence: 70,
        timeframe: '1-3 months',
        riskLevel: 'low',
        symbols: ['LT', 'KOTAKBANK']
      },
      {
        category: 'growth',
        title: 'Sector Rotation Play',
        description: 'Sectors showing improving breadth and delivery trends',
        confidence: 80,
        timeframe: '2-6 weeks',
        riskLevel: 'medium',
        symbols: ['INFY', 'HINDUNILVR']
      }
    ];

    setOpportunities(opportunities);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 10000000); // Convert crores to actual amount
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NSE Data Analysis Dashboard</h1>
              <p className="text-gray-600 mt-2">Market insights and opportunities from NSE equity reports</p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {new Date(lastUpdated).toLocaleString('en-IN')}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateMockData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This NSE data analysis is for educational purposes only. Based on NSE equity reports and best-practices research. 
                Not financial advice. Always consult qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {periods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg A/D Ratio</p>
                <p className="text-2xl font-bold text-blue-600">
                  {marketData.length > 0 ? (marketData.reduce((sum, d) => sum + d.advanceDeclineRatio, 0) / marketData.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Delivery %</p>
                <p className="text-2xl font-bold text-green-600">
                  {marketData.length > 0 ? (marketData.reduce((sum, d) => sum + d.deliveryPercentage, 0) / marketData.length).toFixed(1) : '0.0'}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top N Share</p>
                <p className="text-2xl font-bold text-purple-600">
                  {marketData.length > 0 ? (marketData.reduce((sum, d) => sum + d.topNSecuritiesShare, 0) / marketData.length).toFixed(1) : '0.0'}%
                </p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Internet Trading</p>
                <p className="text-2xl font-bold text-orange-600">
                  {marketData.length > 0 ? (marketData.reduce((sum, d) => sum + d.internetTradingShare, 0) / marketData.length).toFixed(1) : '0.0'}%
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="data">Raw Data</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="market-breadth">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Market Breadth Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Advances</span>
                        <span className="text-green-600 font-bold">
                          {marketData.length > 0 ? marketData[0].advances : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Declines</span>
                        <span className="text-red-600 font-bold">
                          {marketData.length > 0 ? marketData[0].declines : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">A/D Ratio</span>
                        <span className={`font-bold ${marketData.length > 0 && marketData[0].advanceDeclineRatio > 1 ? 'text-green-600' : 'text-red-600'}`}>
                          {marketData.length > 0 ? marketData[0].advanceDeclineRatio.toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="most-active">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Most Active Securities</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-6">
                    <div className="space-y-2">
                      {marketData.length > 0 && marketData[0].mostActive.slice(0, 5).map((stock, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <span className="font-medium">{stock.symbol}</span>
                            <p className="text-sm text-gray-600">Vol: {formatNumber(stock.volume)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`font-bold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </span>
                            <p className="text-sm text-gray-600">₹{formatNumber(stock.turnover)}Cr</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="market-structure">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold">Market Structure & Participation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Concentration Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Top N Securities Share</span>
                          <span className="font-medium">{marketData.length > 0 ? marketData[0].topNSecuritiesShare.toFixed(1) : '0.0'}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Internet Trading Share</span>
                          <span className="font-medium">{marketData.length > 0 ? marketData[0].internetTradingShare.toFixed(1) : '0.0'}%</span>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Volume Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Turnover</span>
                          <span className="font-medium">₹{marketData.length > 0 ? formatNumber(marketData[0].totalTurnover) : '0'}Cr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Volume</span>
                          <span className="font-medium">{marketData.length > 0 ? formatNumber(marketData[0].totalVolume) : '0'}L</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Market Insights */}
          <TabsContent value="insights" className="space-y-4">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="breadth-insights">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Market Breadth Insights</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insights.filter(i => i.type === 'breadth' || i.type === 'participation').map((insight, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getTrendIcon(insight.trend)}
                            <h3 className="text-lg font-semibold">{insight.title}</h3>
                          </div>
                          <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(insight.score)}`}>
                            {insight.score.toFixed(0)}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{insight.description}</p>
                        
                        {insight.opportunity && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="font-medium text-blue-800 mb-1">Opportunity</h4>
                            <p className="text-sm text-blue-700">{insight.opportunity}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quality-insights">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Delivery & Quality Insights</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insights.filter(i => i.type === 'delivery' || i.type === 'liquidity').map((insight, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getTrendIcon(insight.trend)}
                            <h3 className="text-lg font-semibold">{insight.title}</h3>
                          </div>
                          <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(insight.score)}`}>
                            {insight.score.toFixed(0)}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{insight.description}</p>
                        
                        {insight.opportunity && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="font-medium text-blue-800 mb-1">Opportunity</h4>
                            <p className="text-sm text-blue-700">{insight.opportunity}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Opportunities */}
          <TabsContent value="opportunities" className="space-y-4">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="momentum-opportunities">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold">Momentum & Growth Opportunities</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {opportunities.filter(o => o.category === 'momentum' || o.category === 'growth').map((opportunity, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                            <Badge className={getRiskColor(opportunity.riskLevel)}>
                              {opportunity.riskLevel.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {opportunity.confidence}%
                            </div>
                            <p className="text-sm text-gray-500">Confidence</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{opportunity.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>Timeframe: {opportunity.timeframe}</span>
                          <span>Category: {opportunity.category}</span>
                        </div>
                        
                        {opportunity.symbols && (
                          <div>
                            <h4 className="font-medium mb-2">Watchlist:</h4>
                            <div className="flex flex-wrap gap-2">
                              {opportunity.symbols.map((symbol, idx) => (
                                <Badge key={idx} variant="outline">{symbol}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="value-opportunities">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Value & Contrarian Opportunities</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {opportunities.filter(o => o.category === 'value' || o.category === 'contrarian').map((opportunity, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                            <Badge className={getRiskColor(opportunity.riskLevel)}>
                              {opportunity.riskLevel.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {opportunity.confidence}%
                            </div>
                            <p className="text-sm text-gray-500">Confidence</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{opportunity.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>Timeframe: {opportunity.timeframe}</span>
                          <span>Category: {opportunity.category}</span>
                        </div>
                        
                        {opportunity.symbols && (
                          <div>
                            <h4 className="font-medium mb-2">Watchlist:</h4>
                            <div className="flex flex-wrap gap-2">
                              {opportunity.symbols.map((symbol, idx) => (
                                <Badge key={idx} variant="outline">{symbol}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Raw Data */}
          <TabsContent value="data" className="space-y-4">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="market-data">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Market Data Summary</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Date</th>
                            <th className="text-right py-2">Turnover (Cr)</th>
                            <th className="text-right py-2">A/D Ratio</th>
                            <th className="text-right py-2">Delivery %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marketData.slice(0, 10).map((data, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{data.date}</td>
                              <td className="text-right py-2">{formatNumber(data.totalTurnover)}</td>
                              <td className="text-right py-2">{data.advanceDeclineRatio.toFixed(2)}</td>
                              <td className="text-right py-2">{data.deliveryPercentage.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security-data">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <LineChart className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Security Data Sample</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Symbol</th>
                            <th className="text-right py-2">Close</th>
                            <th className="text-right py-2">Volume</th>
                            <th className="text-right py-2">Delivery %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {securityData.slice(0, 10).map((data, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{data.symbol}</td>
                              <td className="text-right py-2">₹{data.close.toFixed(2)}</td>
                              <td className="text-right py-2">{formatNumber(data.volume)}</td>
                              <td className="text-right py-2">{data.deliveryPercentage.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-export">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Data Export & Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-medium">Export Options</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export Market Data (CSV)
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export Security Data (CSV)
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export Insights Report (PDF)
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Analysis Tools</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Generate Trend Analysis
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Target className="h-4 w-4 mr-2" />
                            Create Watchlist
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Set Price Alerts
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NSEDataAnalysis;
