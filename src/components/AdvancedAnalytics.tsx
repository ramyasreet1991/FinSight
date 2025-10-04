import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Activity,
  PieChart,
  LineChart,
  Filter,
  Search,
  Bell,
  Star
} from 'lucide-react';

const AdvancedAnalytics: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('BALRAMCHIN');
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [analysisType, setAnalysisType] = useState<string>('technical');

  const stocks = ['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO'];

  // Mock technical analysis data
  const technicalIndicators = {
    'BALRAMCHIN': {
      rsi: 65.2,
      macd: { signal: 'BUY', value: 2.45 },
      bollinger: { position: 'Upper', value: 1.2 },
      movingAverages: {
        sma20: 445.30,
        sma50: 432.15,
        sma200: 398.75
      },
      support: 420.50,
      resistance: 485.75,
      trend: 'BULLISH'
    }
  };

  // Mock fundamental analysis data
  const fundamentalMetrics = {
    'BALRAMCHIN': {
      pe: 15.2,
      pb: 2.1,
      roe: 18.5,
      roa: 12.3,
      debtToEquity: 0.8,
      currentRatio: 1.4,
      quickRatio: 0.9,
      revenueGrowth: 12.5,
      profitGrowth: 15.2,
      marketCap: 12500,
      sectorRank: 3,
      industryRank: 8
    }
  };

  // Mock screening criteria
  const screeningCriteria = [
    { name: 'High Momentum', criteria: 'Price > SMA(20) AND RSI > 60', count: 45 },
    { name: 'Value Stocks', criteria: 'PE < 20 AND PB < 3', count: 32 },
    { name: 'Growth Stocks', criteria: 'Revenue Growth > 15%', count: 28 },
    { name: 'Quality Stocks', criteria: 'ROE > 15% AND Debt/Equity < 1', count: 38 },
    { name: 'Dividend Stocks', criteria: 'Dividend Yield > 3%', count: 25 }
  ];

  // Mock alerts and notifications
  const alerts = [
    {
      id: 1,
      type: 'PRICE_ALERT',
      stock: 'BALRAMCHIN',
      message: 'Price crossed above ₹460',
      timestamp: new Date().toISOString(),
      priority: 'HIGH'
    },
    {
      id: 2,
      type: 'VOLUME_ALERT',
      stock: 'BATAINDIA',
      message: 'Unusual volume spike detected',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      priority: 'MEDIUM'
    },
    {
      id: 3,
      type: 'NEWS_ALERT',
      stock: 'BHEL',
      message: 'Positive news: New order worth ₹500Cr',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      priority: 'HIGH'
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'BULLISH': return 'text-green-600';
      case 'BEARISH': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive analysis tools from integrated platforms</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {stocks.map((stock) => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1D">1 Day</option>
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This advanced analytics dashboard is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Screening Results</p>
              <p className="text-2xl font-bold text-green-600">168</p>
            </div>
            <Filter className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Watchlist</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio Score</p>
              <p className="text-2xl font-bold text-orange-600">85/100</p>
            </div>
            <Target className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="technical" className="space-y-4">
        <TabsList>
          <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
          <TabsTrigger value="fundamental">Fundamental Analysis</TabsTrigger>
          <TabsTrigger value="screening">Stock Screening</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>

        {/* Technical Analysis */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Technical Indicators</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">RSI (14)</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.rsi || 0}</span>
                    <Badge className={technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.rsi > 70 ? 'bg-red-100 text-red-800' : technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.rsi < 30 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.rsi > 70 ? 'Overbought' : technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.rsi < 30 ? 'Oversold' : 'Neutral'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MACD</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.macd?.value || 0}</span>
                    <Badge className={technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.macd?.signal === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.macd?.signal || 'NEUTRAL'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bollinger Bands</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.bollinger?.value || 0}</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.bollinger?.position || 'Middle'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend</span>
                  <Badge className={technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.trend === 'BULLISH' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.trend || 'NEUTRAL'}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Moving Averages</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMA (20)</span>
                  <span className="font-medium">₹{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.movingAverages?.sma20 || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMA (50)</span>
                  <span className="font-medium">₹{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.movingAverages?.sma50 || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMA (200)</span>
                  <span className="font-medium">₹{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.movingAverages?.sma200 || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Support</span>
                  <span className="font-medium text-green-600">₹{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.support || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Resistance</span>
                  <span className="font-medium text-red-600">₹{technicalIndicators[selectedStock as keyof typeof technicalIndicators]?.resistance || 0}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Fundamental Analysis */}
        <TabsContent value="fundamental" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Valuation Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">P/E Ratio</span>
                  <span className="font-medium">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.pe || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">P/B Ratio</span>
                  <span className="font-medium">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.pb || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ROE</span>
                  <span className="font-medium text-green-600">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.roe || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ROA</span>
                  <span className="font-medium text-green-600">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.roa || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Debt/Equity</span>
                  <span className="font-medium">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.debtToEquity || 0}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Growth & Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Growth</span>
                  <span className="font-medium text-green-600">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.revenueGrowth || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Growth</span>
                  <span className="font-medium text-green-600">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.profitGrowth || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-medium">₹{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.marketCap || 0}Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sector Rank</span>
                  <span className="font-medium">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.sectorRank || 0}/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Industry Rank</span>
                  <span className="font-medium">{fundamentalMetrics[selectedStock as keyof typeof fundamentalMetrics]?.industryRank || 0}/20</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Stock Screening */}
        <TabsContent value="screening" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Stock Screening Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screeningCriteria.map((criteria, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{criteria.name}</h4>
                    <Badge className="bg-blue-100 text-blue-800">{criteria.count} stocks</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{criteria.criteria}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    View Results
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Alerts & Notifications */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Alerts</h3>
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${alert.priority === 'HIGH' ? 'bg-red-500' : alert.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <div>
                      <p className="font-medium">{alert.stock}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
