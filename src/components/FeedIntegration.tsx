import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  RefreshCw,
  Filter,
  Bell,
  Eye,
  Target,
  Zap
} from 'lucide-react';

interface StockRecommendation {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  source: string;
  timestamp: string;
  reason: string;
  momentumScore: number;
  niftyIndex: boolean;
}

interface FeedSource {
  name: string;
  icon: string;
  color: string;
  recommendations: StockRecommendation[];
  lastUpdated: string;
  status: 'active' | 'inactive' | 'error';
}

const FeedIntegration: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedSource[]>([
    {
      name: 'Liquide',
      icon: '💧',
      color: 'bg-blue-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'Univest',
      icon: '🎯',
      color: 'bg-green-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'StockEdge',
      icon: '📊',
      color: 'bg-purple-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'Zerodha',
      icon: '📈',
      color: 'bg-orange-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'HDFC Securities',
      icon: '🏦',
      color: 'bg-red-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'MoneyControl',
      icon: '💰',
      color: 'bg-yellow-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'Economic Times',
      icon: '📰',
      color: 'bg-indigo-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    },
    {
      name: 'Investing.com',
      icon: '🌍',
      color: 'bg-teal-500',
      recommendations: [],
      lastUpdated: '',
      status: 'active'
    }
  ]);

  const [niftyMomentumStocks, setNiftyMomentumStocks] = useState<string[]>([
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL',
    'KOTAKBANK', 'LT', 'ASIANPAINT', 'MARUTI', 'AXISBANK', 'NESTLEIND', 'ULTRACEMCO',
    'TITAN', 'WIPRO', 'ONGC', 'NTPC', 'POWERGRID', 'TECHM', 'SUNPHARMA', 'TATAMOTORS',
    'BAJFINANCE', 'HCLTECH', 'DRREDDY', 'JSWSTEEL', 'TATASTEEL', 'COALINDIA', 'GRASIM'
  ]);

  const [monitoringStocks, setMonitoringStocks] = useState<string[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<StockRecommendation[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Mock data generation
  const generateMockRecommendations = (source: string): StockRecommendation[] => {
    const stocks = niftyMomentumStocks.slice(0, 5);
    return stocks.map((symbol, index) => ({
      id: `${source}-${symbol}-${Date.now()}`,
      symbol,
      name: `${symbol} Ltd`,
      currentPrice: 1000 + Math.random() * 2000,
      targetPrice: 1000 + Math.random() * 2000,
      recommendation: ['BUY', 'HOLD', 'SELL'][Math.floor(Math.random() * 3)] as 'BUY' | 'SELL' | 'HOLD',
      confidence: Math.floor(Math.random() * 40) + 60,
      source,
      timestamp: new Date().toISOString(),
      reason: `Strong momentum indicators and technical analysis support`,
      momentumScore: Math.floor(Math.random() * 40) + 60,
      niftyIndex: true
    }));
  };

  useEffect(() => {
    // Simulate fetching data from different sources
    const fetchFeeds = async () => {
      const updatedFeeds = feeds.map(feed => ({
        ...feed,
        recommendations: generateMockRecommendations(feed.name),
        lastUpdated: new Date().toLocaleTimeString(),
        status: 'active' as const
      }));
      setFeeds(updatedFeeds);

      // Combine all recommendations
      const allRecommendations = updatedFeeds.flatMap(feed => feed.recommendations);
      setFilteredRecommendations(allRecommendations);
    };

    fetchFeeds();
    const interval = setInterval(fetchFeeds, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddToMonitoring = (symbol: string) => {
    if (!monitoringStocks.includes(symbol)) {
      setMonitoringStocks([...monitoringStocks, symbol]);
    }
  };

  const handleRemoveFromMonitoring = (symbol: string) => {
    setMonitoringStocks(monitoringStocks.filter(s => s !== symbol));
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-100 text-green-800';
      case 'SELL': return 'bg-red-100 text-red-800';
      case 'HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const buyRecommendations = filteredRecommendations.filter(r => r.recommendation === 'BUY');
  const niftyBuyRecommendations = buyRecommendations.filter(r => r.niftyIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feed Integration</h2>
          <p className="text-gray-600">Real-time recommendations from multiple sources</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`${isMonitoring ? 'bg-green-600' : 'bg-gray-600'} text-white`}
          >
            <Bell className="h-4 w-4 mr-2" />
            {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Feed Sources Status */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Feed Sources Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feeds.map((feed, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
              <div className={`w-3 h-3 rounded-full ${feed.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-2xl">{feed.icon}</span>
              <div>
                <p className="font-medium">{feed.name}</p>
                <p className="text-sm text-gray-500">{feed.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Nifty Momentum Filter */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Nifty Momentum Stocks</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <Target className="h-3 w-3 mr-1" />
            {niftyMomentumStocks.length} Stocks
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {niftyMomentumStocks.slice(0, 10).map((stock, index) => (
            <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-200">
              {stock}
            </Badge>
          ))}
          {niftyMomentumStocks.length > 10 && (
            <Badge variant="outline">+{niftyMomentumStocks.length - 10} more</Badge>
          )}
        </div>
      </Card>

      {/* Monitoring Stocks */}
      {monitoringStocks.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monitoring Stocks</h3>
            <Badge className="bg-green-100 text-green-800">
              <Eye className="h-3 w-3 mr-1" />
              {monitoringStocks.length} Active
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {monitoringStocks.map((stock, index) => (
              <Badge key={index} className="bg-green-100 text-green-800">
                {stock}
                <button
                  onClick={() => handleRemoveFromMonitoring(stock)}
                  className="ml-2 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Recommendations ({filteredRecommendations.length})</TabsTrigger>
          <TabsTrigger value="buy">Buy Signals ({buyRecommendations.length})</TabsTrigger>
          <TabsTrigger value="nifty">Nifty Momentum ({niftyBuyRecommendations.length})</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring ({monitoringStocks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold">{rec.symbol}</h4>
                    <p className="text-sm text-gray-600">{rec.name}</p>
                  </div>
                  <Badge className={getRecommendationColor(rec.recommendation)}>
                    {rec.recommendation}
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">Current: ₹{rec.currentPrice.toFixed(2)}</span>
                    <span className="text-gray-600 ml-2">Target: ₹{rec.targetPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getConfidenceColor(rec.confidence)}>
                    {rec.confidence}% Confidence
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToMonitoring(rec.symbol)}
                    disabled={monitoringStocks.includes(rec.symbol)}
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Source:</strong> {rec.source}</p>
                <p><strong>Reason:</strong> {rec.reason}</p>
                <p><strong>Momentum Score:</strong> {rec.momentumScore}/100</p>
                <p><strong>Updated:</strong> {new Date(rec.timestamp).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="buy" className="space-y-4">
          {buyRecommendations.map((rec) => (
            <Card key={rec.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold text-green-800">{rec.symbol}</h4>
                    <p className="text-sm text-gray-600">{rec.name}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    BUY
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">Current: ₹{rec.currentPrice.toFixed(2)}</span>
                    <span className="text-green-600 ml-2">Target: ₹{rec.targetPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getConfidenceColor(rec.confidence)}>
                    {rec.confidence}% Confidence
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToMonitoring(rec.symbol)}
                    disabled={monitoringStocks.includes(rec.symbol)}
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="nifty" className="space-y-4">
          {niftyBuyRecommendations.map((rec) => (
            <Card key={rec.id} className="p-4 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold text-blue-800">{rec.symbol}</h4>
                    <p className="text-sm text-gray-600">{rec.name}</p>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Nifty Momentum
                    </Badge>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    BUY
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">Current: ₹{rec.currentPrice.toFixed(2)}</span>
                    <span className="text-green-600 ml-2">Target: ₹{rec.targetPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getConfidenceColor(rec.confidence)}>
                    {rec.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Momentum: {rec.momentumScore}/100
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToMonitoring(rec.symbol)}
                    disabled={monitoringStocks.includes(rec.symbol)}
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          {monitoringStocks.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No stocks being monitored</h3>
              <p className="text-gray-500">Add stocks to monitoring to track their performance</p>
            </Card>
          ) : (
            monitoringStocks.map((symbol) => {
              const stockData = filteredRecommendations.find(r => r.symbol === symbol);
              return (
                <Card key={symbol} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-semibold">{symbol}</h4>
                        <p className="text-sm text-gray-600">Being monitored</p>
                      </div>
                      {stockData && (
                        <>
                          <Badge className={getRecommendationColor(stockData.recommendation)}>
                            {stockData.recommendation}
                          </Badge>
                          <div className="text-sm">
                            <span className="text-gray-600">Current: ₹{stockData.currentPrice.toFixed(2)}</span>
                            <span className="text-gray-600 ml-2">Target: ₹{stockData.targetPrice.toFixed(2)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFromMonitoring(symbol)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedIntegration;
