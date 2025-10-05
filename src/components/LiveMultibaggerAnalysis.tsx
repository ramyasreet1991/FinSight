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
  ExternalLink,
  Radio,
  Clock,
  Database,
  Upload,
  Settings
} from 'lucide-react';
import { nseDataProvider, NSEStock, MultibaggerScore } from '../lib/nseDataProvider';

const LiveMultibaggerAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('live-analysis');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedVerdict, setSelectedVerdict] = useState<string>('all');
  const [stocks, setStocks] = useState<NSEStock[]>([]);
  const [scores, setScores] = useState<MultibaggerScore[]>([]);
  const [selectedStock, setSelectedStock] = useState<MultibaggerScore | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  const multibaggerCharacteristics = [
    { id: 'growth', name: 'Revenue & Profit Growth', icon: TrendingUp },
    { id: 'market', name: 'Large Addressable Market', icon: Globe },
    { id: 'scalability', name: 'Scalability & Operating Leverage', icon: Zap },
    { id: 'management', name: 'Visionary & Strong Management', icon: Users },
    { id: 'debt', name: 'Low or Manageable Debt', icon: Shield },
    { id: 'cashflow', name: 'Positive Cash Flow & Reinvestment', icon: DollarSign },
    { id: 'moat', name: 'Competitive Advantage / Economic Moat', icon: Building },
    { id: 'valuation', name: 'Undervaluation / Mispricing', icon: Target },
    { id: 'marketcap', name: 'Market Cap Potential', icon: BarChart3 },
    { id: 'momentum', name: 'Price Momentum / Market Recognition', icon: Activity }
  ];

  const sectors = ['all', 'Sugar', 'Footwear', 'Power Equipment', 'Mining', 'Pharmaceuticals', 'Automobiles', 'Oil & Gas', 'Metals', 'Banking', 'Steel'];
  const verdicts = ['all', 'High', 'Medium', 'Low'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadData();
      }, 300000); // Refresh every 5 minutes
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await nseDataProvider.refreshData();
      setStocks(data.stocks);
      setScores(data.scores);
      setLastUpdated(data.lastUpdated);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredScores = scores.filter(score => {
    const stock = stocks.find(s => s.symbol === score.symbol);
    if (!stock) return false;
    
    const sectorMatch = selectedSector === 'all' || stock.sector === selectedSector;
    const verdictMatch = selectedVerdict === 'all' || score.verdict === selectedVerdict;
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
    return new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    });
  };

  const exportData = async () => {
    try {
      const csvData = await nseDataProvider.exportToCSV();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nifty-smallcap-momentum-multibagger-analysis-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Multibagger Analysis</h1>
              <p className="text-gray-600 mt-2">Real-time analysis of Nifty Smallcap250 Momentum Quality 100 stocks</p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {formatTimestamp(lastUpdated)}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? 'bg-green-100 text-green-800' : ''}
              >
                <Radio className="h-4 w-4 mr-2" />
                {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={loadData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Now'}
              </Button>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
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
                This live multibagger analysis is for educational purposes only. Data is sourced from NSE indices and news feeds. 
                Not financial advice. Always conduct your own research and consult a qualified financial advisor.
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
                  {scores.filter(s => s.verdict === 'High').length}
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
                  {scores.filter(s => s.verdict === 'Medium').length}
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
                  {scores.filter(s => s.verdict === 'Low').length}
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
                  {scores.length > 0 ? (scores.reduce((acc, s) => acc + s.totalScore, 0) / scores.length).toFixed(1) : '0.0'}
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
            <TabsTrigger value="live-analysis">Live Analysis</TabsTrigger>
            <TabsTrigger value="news-feed">News Feed</TabsTrigger>
            <TabsTrigger value="portfolio-view">Portfolio View</TabsTrigger>
          </TabsList>

          {/* Live Analysis */}
          <TabsContent value="live-analysis" className="space-y-4">
            <div className="space-y-4">
              {filteredScores.map((score) => {
                const stock = stocks.find(s => s.symbol === score.symbol);
                if (!stock) return null;

                return (
                  <Card key={score.symbol} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{score.symbol}</h3>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {stock.sector}
                          </Badge>
                          <Badge className={getVerdictColor(score.verdict)}>
                            {score.verdict} Potential
                          </Badge>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {score.confidence}% Confidence
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{stock.name}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>Price: {formatCurrency(stock.currentPrice || 0)}</span>
                          <span>•</span>
                          <span>Market Cap: {stock.marketCap}</span>
                          <span>•</span>
                          <span>Weight: {stock.weight}%</span>
                          {stock.change !== undefined && (
                            <>
                              <span>•</span>
                              <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent?.toFixed(2)}%)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(score.totalScore)} px-3 py-1 rounded-lg`}>
                          {score.totalScore}/10
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Multibagger Score</p>
                      </div>
                    </div>

                    {/* Characteristics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                      {multibaggerCharacteristics.map((char) => {
                        const IconComponent = char.icon;
                        const charScore = score.scores[char.id as keyof typeof score.scores];
                        return (
                          <div key={char.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <IconComponent className="h-4 w-4 text-gray-600" />
                              {getScoreIcon(charScore)}
                            </div>
                            <h4 className="font-medium text-sm mb-1">{char.name}</h4>
                            <p className="text-xs text-gray-600">
                              {charScore === 1 ? 'Strong' : charScore === 0.5 ? 'Moderate' : 'Weak'}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Updated: {formatTimestamp(score.lastUpdated)}
                        </span>
                        <span className="text-sm text-gray-600">
                          News Items: {score.newsItems.length}
                        </span>
                      </div>
                      <Button 
                        onClick={() => setSelectedStock(score)}
                        variant="outline" 
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* News Feed */}
          <TabsContent value="news-feed" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Latest News & Announcements</h3>
              <div className="space-y-4">
                {scores.flatMap(score => score.newsItems).slice(0, 20).map((news, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {news.symbol}
                          </Badge>
                          <Badge variant="outline">
                            {news.category}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800">
                            {news.source}
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-1">{news.title}</h4>
                        <p className="text-sm text-gray-600">
                          Published: {formatTimestamp(news.published)}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={news.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Portfolio View */}
          <TabsContent value="portfolio-view" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sector Analysis</h3>
                <div className="space-y-3">
                  {sectors.slice(1).map((sector) => {
                    const sectorStocks = stocks.filter(s => s.sector === sector);
                    const sectorScores = scores.filter(s => {
                      const stock = stocks.find(st => st.symbol === s.symbol);
                      return stock?.sector === sector;
                    });
                    const avgScore = sectorScores.length > 0 
                      ? sectorScores.reduce((acc, s) => acc + s.totalScore, 0) / sectorScores.length 
                      : 0;
                    
                    if (sectorStocks.length === 0) return null;
                    
                    return (
                      <div key={sector} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{sector}</span>
                          <p className="text-sm text-gray-600">{sectorStocks.length} stocks</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${getScoreColor(avgScore)}`}>
                            {avgScore.toFixed(1)}/10
                          </span>
                          <p className="text-xs text-gray-500">Avg Score</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {scores
                    .sort((a, b) => b.totalScore - a.totalScore)
                    .slice(0, 5)
                    .map((score, index) => {
                      const stock = stocks.find(s => s.symbol === score.symbol);
                      if (!stock) return null;
                      
                      return (
                        <div key={score.symbol} className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <span className="font-medium">{score.symbol}</span>
                              <p className="text-sm text-gray-600">{stock.sector}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-lg font-bold ${getScoreColor(score.totalScore)}`}>
                              {score.totalScore}/10
                            </span>
                            <Badge className={getVerdictColor(score.verdict)} size="sm">
                              {score.verdict}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Detailed Stock View */}
        {selectedStock && (
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">{selectedStock.symbol} - Live Analysis</h3>
                <p className="text-gray-600">
                  {stocks.find(s => s.symbol === selectedStock.symbol)?.name}
                </p>
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
                    const charScore = selectedStock.scores[char.id as keyof typeof selectedStock.scores];
                    return (
                      <div key={char.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">{char.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getScoreIcon(charScore)}
                            <span className="text-sm font-medium">
                              {charScore}/1 ({Math.round(charScore * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Latest News</h4>
                <div className="space-y-3">
                  {selectedStock.newsItems.map((news, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{news.title}</h5>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" size="sm">{news.category}</Badge>
                            <Badge variant="outline" size="sm">{news.source}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {formatTimestamp(news.published)}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={news.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveMultibaggerAnalysis;
