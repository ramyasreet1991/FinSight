import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Radio,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Bell,
  Settings,
  Upload,
  Download,
  Search,
  Filter,
  Target,
  Shield,
  Zap,
  Eye,
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Info,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Users,
  Globe,
  Smartphone,
  Bot,
  Send,
  RefreshCw
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  symbol: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Earnings' | 'Pledges' | 'Bulk Deals' | 'Management' | 'Litigation' | 'Market' | 'Regulatory';
  confidence: number;
  explanation: string;
  priceImpact?: {
    direction: 'Up' | 'Down' | 'Neutral';
    magnitude: number;
    timeframe: string;
  };
  riskFlag: boolean;
  clusterId: string;
}

interface RiskFlag {
  id: string;
  symbol: string;
  type: 'High Volume' | 'Price Drop' | 'News Sentiment' | 'Sector Risk' | 'Technical';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface PortfolioAlert {
  id: string;
  symbol: string;
  type: 'Earnings Alert' | 'Pledge Change' | 'Bulk Deal' | 'Management Change' | 'Litigation';
  message: string;
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
  delivered: boolean;
}

const TradingNewsRadar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('news');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [riskFlags, setRiskFlags] = useState<RiskFlag[]>([]);
  const [portfolioAlerts, setPortfolioAlerts] = useState<PortfolioAlert[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'BALRAMCHIN Reports Q3 Earnings Beat',
        summary: 'Sugar producer reports 15% YoY revenue growth with strong domestic demand',
        source: 'Economic Times',
        publishedAt: '2024-01-15T09:30:00Z',
        symbol: 'BALRAMCHIN',
        impact: 'High',
        category: 'Earnings',
        confidence: 85,
        explanation: 'Strong earnings beat indicates robust demand in sugar sector. Positive for stock price in short term.',
        priceImpact: {
          direction: 'Up',
          magnitude: 8.5,
          timeframe: '1-3 days'
        },
        riskFlag: false,
        clusterId: 'earnings_balramchin_q3'
      },
      {
        id: '2',
        title: 'Promoter Pledge Increased in BATAINDIA',
        summary: 'Promoter increases pledge to 12% of total shares, raising concerns about liquidity',
        source: 'Business Standard',
        publishedAt: '2024-01-15T08:45:00Z',
        symbol: 'BATAINDIA',
        impact: 'Medium',
        category: 'Pledges',
        confidence: 92,
        explanation: 'Increased promoter pledge may indicate funding pressure. Historically, high pledges precede price volatility.',
        priceImpact: {
          direction: 'Down',
          magnitude: 5.2,
          timeframe: '1-2 weeks'
        },
        riskFlag: true,
        clusterId: 'pledge_bataindia_jan'
      },
      {
        id: '3',
        title: 'Bulk Deal Alert: BHEL',
        summary: 'Large institutional investor sells 2.5% stake worth ₹450Cr in BHEL',
        source: 'Moneycontrol',
        publishedAt: '2024-01-15T07:20:00Z',
        symbol: 'BHEL',
        impact: 'High',
        category: 'Bulk Deals',
        confidence: 78,
        explanation: 'Large institutional exit suggests reduced confidence in near-term prospects. May trigger further selling pressure.',
        priceImpact: {
          direction: 'Down',
          magnitude: 6.8,
          timeframe: '2-5 days'
        },
        riskFlag: true,
        clusterId: 'bulk_bhel_jan15'
      },
      {
        id: '4',
        title: 'COALINDIA Management Change',
        summary: 'New CMD appointed with focus on renewable energy transition',
        source: 'Hindu Business Line',
        publishedAt: '2024-01-15T06:15:00Z',
        symbol: 'COALINDIA',
        impact: 'Medium',
        category: 'Management',
        confidence: 88,
        explanation: 'Leadership change with renewable focus may indicate strategic pivot. Positive long-term but uncertain short-term impact.',
        priceImpact: {
          direction: 'Neutral',
          magnitude: 2.1,
          timeframe: '1-4 weeks'
        },
        riskFlag: false,
        clusterId: 'mgmt_coalindia_cmd'
      },
      {
        id: '5',
        title: 'DIVISLAB Faces Regulatory Inquiry',
        summary: 'SEBI initiates inquiry into related party transactions',
        source: 'Financial Express',
        publishedAt: '2024-01-15T05:30:00Z',
        symbol: 'DIVISLAB',
        impact: 'High',
        category: 'Litigation',
        confidence: 95,
        explanation: 'Regulatory inquiry creates uncertainty and may impact investor sentiment. Historical precedent shows 10-15% price impact.',
        priceImpact: {
          direction: 'Down',
          magnitude: 12.3,
          timeframe: '1-2 weeks'
        },
        riskFlag: true,
        clusterId: 'litigation_divislab_sebi'
      }
    ];

    const mockRiskFlags: RiskFlag[] = [
      {
        id: '1',
        symbol: 'BATAINDIA',
        type: 'Price Drop',
        severity: 'High',
        message: 'Stock down 8% in last 3 days with increased promoter pledge',
        timestamp: '2024-01-15T09:00:00Z',
        resolved: false
      },
      {
        id: '2',
        symbol: 'BHEL',
        type: 'High Volume',
        severity: 'Medium',
        message: 'Unusual volume spike detected (3x average) with bulk deal activity',
        timestamp: '2024-01-15T08:30:00Z',
        resolved: false
      },
      {
        id: '3',
        symbol: 'DIVISLAB',
        type: 'News Sentiment',
        severity: 'Critical',
        message: 'Negative news sentiment detected with regulatory inquiry announcement',
        timestamp: '2024-01-15T07:45:00Z',
        resolved: false
      }
    ];

    const mockAlerts: PortfolioAlert[] = [
      {
        id: '1',
        symbol: 'BALRAMCHIN',
        type: 'Earnings Alert',
        message: 'Q3 earnings beat expectations by 15%',
        priority: 'High',
        timestamp: '2024-01-15T09:30:00Z',
        delivered: true
      },
      {
        id: '2',
        symbol: 'BATAINDIA',
        type: 'Pledge Change',
        message: 'Promoter pledge increased to 12% - risk flag triggered',
        priority: 'High',
        timestamp: '2024-01-15T08:45:00Z',
        delivered: true
      },
      {
        id: '3',
        symbol: 'BHEL',
        type: 'Bulk Deal',
        message: 'Large institutional exit: 2.5% stake sold',
        priority: 'Medium',
        timestamp: '2024-01-15T07:20:00Z',
        delivered: true
      }
    ];

    setNewsItems(mockNews);
    setRiskFlags(mockRiskFlags);
    setPortfolioAlerts(mockAlerts);
  }, []);

  const symbols = ['all', 'BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB'];
  const categories = ['all', 'Earnings', 'Pledges', 'Bulk Deals', 'Management', 'Litigation', 'Market', 'Regulatory'];

  const filteredNews = newsItems.filter(item => {
    const symbolMatch = selectedSymbol === 'all' || item.symbol === selectedSymbol;
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const riskMatch = riskFilter === 'all' || 
      (riskFilter === 'risk' && item.riskFlag) ||
      (riskFilter === 'safe' && !item.riskFlag);
    return symbolMatch && categoryMatch && riskMatch;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-200 text-red-900';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceImpactColor = (direction: string) => {
    switch (direction) {
      case 'Up': return 'text-green-600';
      case 'Down': return 'text-red-600';
      case 'Neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trading News & Risk Radar</h1>
              <p className="text-gray-600 mt-2">AI-powered news clustering, risk flags, and portfolio alerts</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import Portfolio
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Bot className="h-4 w-4 mr-2" />
                Telegram Setup
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
                This trading news radar is for educational purposes only. Not financial advice. 
                Always verify information and consult a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-blue-600">{portfolioAlerts.filter(a => !a.delivered).length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Risk Flags</p>
                <p className="text-2xl font-bold text-red-600">{riskFlags.filter(r => !r.resolved).length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">News Items</p>
                <p className="text-2xl font-bold text-green-600">{newsItems.length}</p>
              </div>
              <Radio className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Confidence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(newsItems.reduce((acc, item) => acc + item.confidence, 0) / newsItems.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {symbols.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol === 'all' ? 'All Symbols' : symbol}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Filter</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Items</option>
                <option value="risk">Risk Flags Only</option>
                <option value="safe">Safe Items Only</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button className="w-full" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="news">News Radar</TabsTrigger>
            <TabsTrigger value="alerts">Portfolio Alerts</TabsTrigger>
            <TabsTrigger value="risks">Risk Flags</TabsTrigger>
            <TabsTrigger value="backtest">Backtest View</TabsTrigger>
          </TabsList>

          {/* News Radar */}
          <TabsContent value="news" className="space-y-4">
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <Card key={news.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={getImpactColor(news.impact)}>
                          {news.impact} Impact
                        </Badge>
                        <Badge variant="outline">
                          {news.category}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {news.symbol}
                        </Badge>
                        {news.riskFlag && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Risk
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                      <p className="text-gray-600 mb-3">{news.summary}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{formatTimestamp(news.publishedAt)}</span>
                        <span>•</span>
                        <span>Confidence: {news.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">AI Explanation</h4>
                        <p className="text-sm text-gray-700">{news.explanation}</p>
                      </div>
                      {news.priceImpact && (
                        <div>
                          <h4 className="font-semibold mb-2">Price Impact</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getPriceImpactColor(news.priceImpact.direction)}`}>
                              {news.priceImpact.direction} {news.priceImpact.magnitude}%
                            </span>
                            <span className="text-sm text-gray-500">
                              in {news.priceImpact.timeframe}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Alerts */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-4">
              {portfolioAlerts.map((alert) => (
                <Card key={alert.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.delivered ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {alert.symbol}
                          </Badge>
                          <Badge className={getImpactColor(alert.priority)}>
                            {alert.priority} Priority
                          </Badge>
                          <Badge variant="outline">
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="font-medium mt-1">{alert.message}</p>
                        <p className="text-sm text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.delivered ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Delivered
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Risk Flags */}
          <TabsContent value="risks" className="space-y-4">
            <div className="space-y-4">
              {riskFlags.map((risk) => (
                <Card key={risk.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        risk.resolved ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {risk.symbol}
                          </Badge>
                          <Badge className={getRiskSeverityColor(risk.severity)}>
                            {risk.severity}
                          </Badge>
                          <Badge variant="outline">
                            {risk.type}
                          </Badge>
                        </div>
                        <p className="font-medium mt-1">{risk.message}</p>
                        <p className="text-sm text-gray-500">{formatTimestamp(risk.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {risk.resolved ? (
                        <Badge className="bg-green-100 text-green-800">
                          Resolved
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Backtest View */}
          <TabsContent value="backtest" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Event Impact Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Historical Event Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Earnings Beat</span>
                      <span className="text-sm font-medium text-green-600">+5.2% avg (1D)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Pledge Increase</span>
                      <span className="text-sm font-medium text-red-600">-3.8% avg (1W)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Bulk Deal (Sell)</span>
                      <span className="text-sm font-medium text-red-600">-4.5% avg (3D)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Regulatory Inquiry</span>
                      <span className="text-sm font-medium text-red-600">-8.2% avg (2W)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Signal Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Accuracy Rate</span>
                      <span className="text-sm font-medium text-blue-600">78.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">False Positives</span>
                      <span className="text-sm font-medium text-yellow-600">12.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Missed Signals</span>
                      <span className="text-sm font-medium text-orange-600">9.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingNewsRadar;
