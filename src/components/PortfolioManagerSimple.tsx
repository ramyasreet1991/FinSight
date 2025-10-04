import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Target,
  DollarSign,
  BarChart3,
  Star,
  Plus
} from 'lucide-react';

const PortfolioManagerSimple: React.FC = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('main');

  const portfolios = [
    { id: 'main', name: 'Main Portfolio', value: 125000, change: 2.5, stocks: 8 },
    { id: 'momentum', name: 'Momentum Portfolio', value: 85000, change: 4.2, stocks: 5 },
    { id: 'value', name: 'Value Portfolio', value: 95000, change: 1.8, stocks: 6 }
  ];

  const portfolioHoldings = [
    { symbol: 'BALRAMCHIN', name: 'Balrampur Chini Mills', quantity: 100, avgPrice: 420, currentPrice: 456.50, value: 45650, change: 8.7, weight: 36.5 },
    { symbol: 'BATAINDIA', name: 'Bata India Ltd', quantity: 50, avgPrice: 1750, currentPrice: 1821.80, value: 91090, change: 4.1, weight: 72.9 },
    { symbol: 'BHEL', name: 'Bharat Heavy Electricals', quantity: 200, avgPrice: 250, currentPrice: 267.30, value: 53460, change: 6.9, weight: 42.8 },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', quantity: 150, avgPrice: 420, currentPrice: 456.90, value: 68535, change: 8.8, weight: 54.8 },
    { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories', quantity: 25, avgPrice: 3600, currentPrice: 3856.80, value: 96420, change: 7.1, weight: 77.1 }
  ];

  const performanceMetrics = {
    totalValue: 305000,
    totalChange: 3.2,
    dayChange: 1.2,
    weekChange: 2.8,
    monthChange: 3.2,
    yearChange: 15.6,
    sharpeRatio: 1.45,
    maxDrawdown: -8.2,
    winRate: 68.5
  };

  const sectorAllocation = [
    { sector: 'Sugar', value: 45650, percentage: 15.0, color: 'bg-yellow-500' },
    { sector: 'Footwear', value: 91090, percentage: 29.9, color: 'bg-blue-500' },
    { sector: 'Power Equipment', value: 53460, percentage: 17.5, color: 'bg-green-500' },
    { sector: 'Mining', value: 68535, percentage: 22.5, color: 'bg-red-500' },
    { sector: 'Pharmaceuticals', value: 96420, percentage: 31.6, color: 'bg-purple-500' }
  ];

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeBgColor = (change: number) => {
    return change >= 0 ? 'bg-green-100' : 'bg-red-100';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Manager</h2>
          <p className="text-gray-600">Comprehensive portfolio tracking and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPortfolio}
            onChange={(e) => setSelectedPortfolio(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>{portfolio.name}</option>
            ))}
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
              This portfolio manager is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">{formatCurrency(performanceMetrics.totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Change</p>
              <p className={`text-2xl font-bold ${getChangeColor(performanceMetrics.totalChange)}`}>
                {formatPercentage(performanceMetrics.totalChange)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.winRate}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sharpe Ratio</p>
              <p className="text-2xl font-bold text-orange-600">{performanceMetrics.sharpeRatio}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>

        {/* Holdings */}
        <TabsContent value="holdings" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Portfolio Holdings</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </Button>
            </div>
            <div className="space-y-3">
              {portfolioHoldings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{holding.symbol}</h4>
                      <p className="text-sm text-gray-600">{holding.name}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Qty: {holding.quantity}</p>
                      <p className="text-gray-600">Avg: ₹{holding.avgPrice}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Current: ₹{holding.currentPrice}</p>
                      <p className="text-gray-600">Value: {formatCurrency(holding.value)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getChangeBgColor(holding.change)} ${getChangeColor(holding.change)}`}>
                      {formatPercentage(holding.change)}
                    </Badge>
                    <Badge variant="outline">
                      {holding.weight.toFixed(1)}%
                    </Badge>
                    <Button size="sm" variant="outline">
                      Trade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Day Change</span>
                  <span className={`font-medium ${getChangeColor(performanceMetrics.dayChange)}`}>
                    {formatPercentage(performanceMetrics.dayChange)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Week Change</span>
                  <span className={`font-medium ${getChangeColor(performanceMetrics.weekChange)}`}>
                    {formatPercentage(performanceMetrics.weekChange)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Month Change</span>
                  <span className={`font-medium ${getChangeColor(performanceMetrics.monthChange)}`}>
                    {formatPercentage(performanceMetrics.monthChange)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Year Change</span>
                  <span className={`font-medium ${getChangeColor(performanceMetrics.yearChange)}`}>
                    {formatPercentage(performanceMetrics.yearChange)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sharpe Ratio</span>
                  <span className="font-medium text-green-600">{performanceMetrics.sharpeRatio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Max Drawdown</span>
                  <span className="font-medium text-red-600">{formatPercentage(performanceMetrics.maxDrawdown)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-medium text-green-600">{performanceMetrics.winRate}%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Allocation */}
        <TabsContent value="allocation" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
            <div className="space-y-3">
              {sectorAllocation.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${sector.color}`}></div>
                    <span className="font-medium">{sector.sector}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{formatCurrency(sector.value)}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${sector.color}`}
                        style={{ width: `${sector.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{sector.percentage}%</span>
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

export default PortfolioManagerSimple;
