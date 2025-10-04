import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const NiftyMomentumPortfolioSimple: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nifty Smallcap 250 Momentum Quality 100</h2>
          <p className="text-gray-600">Curated portfolio of high-momentum small-cap stocks from NIFTY Smallcap250 Momentum Quality 100 Index</p>
        </div>
        <Button variant="outline">
          Refresh
        </Button>
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
              This portfolio is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">₹1,25,000</p>
            </div>
            <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">₹</span>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Change</p>
              <p className="text-2xl font-bold text-green-600">+₹2,450</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">↗</span>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Momentum Score</p>
              <p className="text-2xl font-bold">82.5/100</p>
            </div>
            <div className="h-8 w-8 bg-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">⚡</span>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold">2.1/3</p>
            </div>
            <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🛡</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Portfolio */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Current Portfolio (5 stocks)</h3>
          <Badge className="bg-blue-100 text-blue-800">
            Smallcap Momentum Quality
          </Badge>
        </div>
        <div className="space-y-3">
          {[
            { symbol: 'BALRAMCHIN', name: 'Balrampur Chini Mills Ltd', price: 456.50, change: '+23.40', changePercent: 5.41, recommendation: 'BUY', risk: 'HIGH' },
            { symbol: 'BATAINDIA', name: 'Bata India Ltd', price: 1821.80, change: '+15.20', changePercent: 0.84, recommendation: 'BUY', risk: 'MEDIUM' },
            { symbol: 'BHEL', name: 'Bharat Heavy Electricals Ltd', price: 267.30, change: '+12.80', changePercent: 5.03, recommendation: 'BUY', risk: 'HIGH' },
            { symbol: 'COALINDIA', name: 'Coal India Ltd', price: 456.90, change: '+8.50', changePercent: 1.90, recommendation: 'HOLD', risk: 'MEDIUM' },
            { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', price: 3856.80, change: '+3.20', changePercent: 0.08, recommendation: 'BUY', risk: 'MEDIUM' }
          ].map((stock, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <h4 className="font-semibold">{stock.symbol}</h4>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <Badge className={stock.recommendation === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {stock.recommendation}
                </Badge>
                <Badge className={stock.risk === 'LOW' ? 'bg-green-100 text-green-800' : stock.risk === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                  {stock.risk} Risk
                </Badge>
                <div className="text-sm">
                  <span className="text-gray-600">₹{stock.price.toFixed(2)}</span>
                  <span className={`ml-2 ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  Momentum: {Math.floor(Math.random() * 40) + 60}/100
                </Badge>
                <Button size="sm" variant="outline">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Available Stocks */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Available Smallcap Momentum Quality Stocks</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {['BALRAMCHIN', 'BATAINDIA', 'BHEL', 'COALINDIA', 'DIVISLAB', 'EICHERMOT', 'GAIL', 'HINDALCO', 'INDUSINDBK', 'JSWSTEEL', 'LUPIN', 'MARUTI', 'NTPC', 'ONGC', 'POWERGRID', 'SUNPHARMA', 'TATAMOTORS', 'TATASTEEL', 'TECHM', 'ULTRACEMCO', 'WIPRO', 'ZEEL'].map((symbol, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-medium">{symbol}</span>
                <Button size="sm" variant="outline">
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NiftyMomentumPortfolioSimple;
