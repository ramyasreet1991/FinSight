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
  Zap,
  BarChart3,
  DollarSign,
  Activity,
  Shield
} from 'lucide-react';

interface NiftyMomentumStock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  momentumScore: number;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  targetPrice: number;
  stopLoss: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  sector: string;
  lastUpdated: string;
}

interface PortfolioMetrics {
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  totalMomentumScore: number;
  riskScore: number;
  diversificationScore: number;
}

const NiftyMomentumPortfolio: React.FC = () => {
  const [stocks, setStocks] = useState<NiftyMomentumStock[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: 0,
    totalChange: 0,
    totalChangePercent: 0,
    totalMomentumScore: 0,
    riskScore: 0,
    diversificationScore: 0
  });
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Nifty 50 momentum stocks with mock data
  const niftyStocks: NiftyMomentumStock[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      currentPrice: 2456.50,
      change: 23.40,
      changePercent: 0.96,
      volume: 1250000,
      marketCap: 1660000,
      momentumScore: 85,
      recommendation: 'BUY',
      targetPrice: 2600,
      stopLoss: 2350,
      riskLevel: 'MEDIUM',
      sector: 'Energy',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Ltd',
      currentPrice: 3421.80,
      change: -15.20,
      changePercent: -0.44,
      volume: 890000,
      marketCap: 1250000,
      momentumScore: 78,
      recommendation: 'BUY',
      targetPrice: 3600,
      stopLoss: 3200,
      riskLevel: 'LOW',
      sector: 'IT',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd',
      currentPrice: 1567.30,
      change: 12.80,
      changePercent: 0.82,
      volume: 2100000,
      marketCap: 1150000,
      momentumScore: 82,
      recommendation: 'BUY',
      targetPrice: 1650,
      stopLoss: 1500,
      riskLevel: 'LOW',
      sector: 'Banking',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'INFY',
      name: 'Infosys Ltd',
      currentPrice: 1456.90,
      change: 8.50,
      changePercent: 0.59,
      volume: 1560000,
      marketCap: 610000,
      momentumScore: 75,
      recommendation: 'HOLD',
      targetPrice: 1500,
      stopLoss: 1400,
      riskLevel: 'MEDIUM',
      sector: 'IT',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Ltd',
      currentPrice: 2345.60,
      change: -5.20,
      changePercent: -0.22,
      volume: 450000,
      marketCap: 550000,
      momentumScore: 68,
      recommendation: 'HOLD',
      targetPrice: 2400,
      stopLoss: 2250,
      riskLevel: 'LOW',
      sector: 'FMCG',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'ITC',
      name: 'ITC Ltd',
      currentPrice: 456.80,
      change: 3.20,
      changePercent: 0.71,
      volume: 3200000,
      marketCap: 570000,
      momentumScore: 72,
      recommendation: 'BUY',
      targetPrice: 480,
      stopLoss: 430,
      riskLevel: 'MEDIUM',
      sector: 'FMCG',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'SBIN',
      name: 'State Bank of India',
      currentPrice: 567.40,
      change: 7.80,
      changePercent: 1.39,
      volume: 4500000,
      marketCap: 510000,
      momentumScore: 88,
      recommendation: 'BUY',
      targetPrice: 600,
      stopLoss: 540,
      riskLevel: 'MEDIUM',
      sector: 'Banking',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd',
      currentPrice: 1234.50,
      change: 15.60,
      changePercent: 1.28,
      volume: 1800000,
      marketCap: 690000,
      momentumScore: 91,
      recommendation: 'BUY',
      targetPrice: 1300,
      stopLoss: 1150,
      riskLevel: 'HIGH',
      sector: 'Telecom',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'KOTAKBANK',
      name: 'Kotak Mahindra Bank Ltd',
      currentPrice: 1789.20,
      change: -8.40,
      changePercent: -0.47,
      volume: 650000,
      marketCap: 350000,
      momentumScore: 65,
      recommendation: 'HOLD',
      targetPrice: 1850,
      stopLoss: 1700,
      riskLevel: 'MEDIUM',
      sector: 'Banking',
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: 'LT',
      name: 'Larsen & Toubro Ltd',
      currentPrice: 3456.80,
      change: 45.20,
      changePercent: 1.33,
      volume: 890000,
      marketCap: 480000,
      momentumScore: 87,
      recommendation: 'BUY',
      targetPrice: 3600,
      stopLoss: 3300,
      riskLevel: 'MEDIUM',
      sector: 'Infrastructure',
      lastUpdated: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setStocks(niftyStocks);
    calculateMetrics();
  }, [portfolio]);

  const calculateMetrics = () => {
    const portfolioStocks = stocks.filter(stock => portfolio.includes(stock.symbol));
    
    const totalValue = portfolioStocks.reduce((sum, stock) => sum + stock.currentPrice, 0);
    const totalChange = portfolioStocks.reduce((sum, stock) => sum + stock.change, 0);
    const totalChangePercent = portfolioStocks.length > 0 ? totalChange / totalValue * 100 : 0;
    const totalMomentumScore = portfolioStocks.length > 0 ? 
      portfolioStocks.reduce((sum, stock) => sum + stock.momentumScore, 0) / portfolioStocks.length : 0;
    
    const riskScore = portfolioStocks.length > 0 ? 
      portfolioStocks.reduce((sum, stock) => {
        const riskValue = stock.riskLevel === 'HIGH' ? 3 : stock.riskLevel === 'MEDIUM' ? 2 : 1;
        return sum + riskValue;
      }, 0) / portfolioStocks.length : 0;
    
    const sectors = [...new Set(portfolioStocks.map(stock => stock.sector))];
    const diversificationScore = (sectors.length / 10) * 100; // Assuming 10 sectors max

    setMetrics({
      totalValue,
      totalChange,
      totalChangePercent,
      totalMomentumScore,
      riskScore,
      diversificationScore
    });
  };

  const handleAddToPortfolio = (symbol: string) => {
    if (!portfolio.includes(symbol)) {
      setPortfolio([...portfolio, symbol]);
    }
  };

  const handleRemoveFromPortfolio = (symbol: string) => {
    setPortfolio(portfolio.filter(s => s !== symbol));
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-100 text-green-800';
      case 'SELL': return 'bg-red-100 text-red-800';
      case 'HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const portfolioStocks = stocks.filter(stock => portfolio.includes(stock.symbol));
  const buyRecommendations = stocks.filter(stock => stock.recommendation === 'BUY');
  const highMomentumStocks = stocks.filter(stock => stock.momentumScore >= 80);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nifty Momentum Portfolio</h2>
          <p className="text-gray-600">Curated portfolio of high-momentum Nifty 50 stocks</p>
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

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">₹{metrics.totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Change</p>
              <p className={`text-2xl font-bold ${getChangeColor(metrics.totalChange)}`}>
                {metrics.totalChange >= 0 ? '+' : ''}₹{metrics.totalChange.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Momentum Score</p>
              <p className="text-2xl font-bold">{metrics.totalMomentumScore.toFixed(1)}/100</p>
            </div>
            <Zap className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold">{metrics.riskScore.toFixed(1)}/3</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Current Portfolio */}
      {portfolio.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Portfolio ({portfolio.length} stocks)</h3>
            <Badge className="bg-blue-100 text-blue-800">
              <Target className="h-3 w-3 mr-1" />
              Nifty Momentum
            </Badge>
          </div>
          <div className="space-y-3">
            {portfolioStocks.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold">{stock.symbol}</h4>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <Badge className={getRecommendationColor(stock.recommendation)}>
                    {stock.recommendation}
                  </Badge>
                  <Badge className={getRiskColor(stock.riskLevel)}>
                    {stock.riskLevel} Risk
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">₹{stock.currentPrice.toFixed(2)}</span>
                    <span className={`ml-2 ${getChangeColor(stock.change)}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Momentum: {stock.momentumScore}/100
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveFromPortfolio(stock.symbol)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Stock Selection */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Nifty Stocks ({stocks.length})</TabsTrigger>
          <TabsTrigger value="buy">Buy Recommendations ({buyRecommendations.length})</TabsTrigger>
          <TabsTrigger value="momentum">High Momentum ({highMomentumStocks.length})</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio ({portfolio.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {stocks.map((stock) => (
            <Card key={stock.symbol} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold">{stock.symbol}</h4>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                    <p className="text-xs text-gray-500">{stock.sector}</p>
                  </div>
                  <Badge className={getRecommendationColor(stock.recommendation)}>
                    {stock.recommendation}
                  </Badge>
                  <Badge className={getRiskColor(stock.riskLevel)}>
                    {stock.riskLevel} Risk
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">₹{stock.currentPrice.toFixed(2)}</span>
                    <span className={`ml-2 ${getChangeColor(stock.change)}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Momentum: {stock.momentumScore}/100
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToPortfolio(stock.symbol)}
                    disabled={portfolio.includes(stock.symbol)}
                  >
                    {portfolio.includes(stock.symbol) ? 'Added' : 'Add to Portfolio'}
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Target:</strong> ₹{stock.targetPrice} | <strong>Stop Loss:</strong> ₹{stock.stopLoss}</p>
                <p><strong>Volume:</strong> {stock.volume.toLocaleString()} | <strong>Market Cap:</strong> ₹{stock.marketCap.toLocaleString()} Cr</p>
                <p><strong>Updated:</strong> {new Date(stock.lastUpdated).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="buy" className="space-y-4">
          {buyRecommendations.map((stock) => (
            <Card key={stock.symbol} className="p-4 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold text-green-800">{stock.symbol}</h4>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                    <p className="text-xs text-gray-500">{stock.sector}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    BUY
                  </Badge>
                  <Badge className={getRiskColor(stock.riskLevel)}>
                    {stock.riskLevel} Risk
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">₹{stock.currentPrice.toFixed(2)}</span>
                    <span className={`ml-2 ${getChangeColor(stock.change)}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Momentum: {stock.momentumScore}/100
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToPortfolio(stock.symbol)}
                    disabled={portfolio.includes(stock.symbol)}
                  >
                    {portfolio.includes(stock.symbol) ? 'Added' : 'Add to Portfolio'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="momentum" className="space-y-4">
          {highMomentumStocks.map((stock) => (
            <Card key={stock.symbol} className="p-4 border-yellow-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-semibold text-yellow-800">{stock.symbol}</h4>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                    <p className="text-xs text-gray-500">{stock.sector}</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Zap className="h-3 w-3 mr-1" />
                    High Momentum
                  </Badge>
                  <Badge className={getRecommendationColor(stock.recommendation)}>
                    {stock.recommendation}
                  </Badge>
                  <div className="text-sm">
                    <span className="text-gray-600">₹{stock.currentPrice.toFixed(2)}</span>
                    <span className={`ml-2 ${getChangeColor(stock.change)}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Momentum: {stock.momentumScore}/100
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddToPortfolio(stock.symbol)}
                    disabled={portfolio.includes(stock.symbol)}
                  >
                    {portfolio.includes(stock.symbol) ? 'Added' : 'Add to Portfolio'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {portfolio.length === 0 ? (
            <Card className="p-8 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No stocks in portfolio</h3>
              <p className="text-gray-500">Add Nifty momentum stocks to build your portfolio</p>
            </Card>
          ) : (
            portfolioStocks.map((stock) => (
              <Card key={stock.symbol} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{stock.symbol}</h4>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                      <p className="text-xs text-gray-500">{stock.sector}</p>
                    </div>
                    <Badge className={getRecommendationColor(stock.recommendation)}>
                      {stock.recommendation}
                    </Badge>
                    <Badge className={getRiskColor(stock.riskLevel)}>
                      {stock.riskLevel} Risk
                    </Badge>
                    <div className="text-sm">
                      <span className="text-gray-600">₹{stock.currentPrice.toFixed(2)}</span>
                      <span className={`ml-2 ${getChangeColor(stock.change)}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Momentum: {stock.momentumScore}/100
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveFromPortfolio(stock.symbol)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NiftyMomentumPortfolio;
