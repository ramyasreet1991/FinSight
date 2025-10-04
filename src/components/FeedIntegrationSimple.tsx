import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const FeedIntegrationSimple: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feed Integration</h2>
          <p className="text-gray-600">Real-time recommendations from multiple sources</p>
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
              This feed integration is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Feed Sources Status */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Feed Sources Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Liquide', icon: '💧', status: 'active' },
            { name: 'Univest', icon: '🎯', status: 'active' },
            { name: 'StockEdge', icon: '📊', status: 'active' },
            { name: 'Zerodha', icon: '📈', status: 'active' },
            { name: 'HDFC Securities', icon: '🏦', status: 'active' },
            { name: 'MoneyControl', icon: '💰', status: 'active' },
            { name: 'Economic Times', icon: '📰', status: 'active' },
            { name: 'Investing.com', icon: '🌍', status: 'active' }
          ].map((feed, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
              <div className={`w-3 h-3 rounded-full ${feed.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-2xl">{feed.icon}</span>
              <div>
                <p className="font-medium">{feed.name}</p>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sample Recommendations */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Sample Recommendations</h3>
        <div className="space-y-3">
          {[
            { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.50, change: '+23.40', recommendation: 'BUY', source: 'Liquide' },
            { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', price: 3421.80, change: '-15.20', recommendation: 'HOLD', source: 'StockEdge' },
            { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1567.30, change: '+12.80', recommendation: 'BUY', source: 'Zerodha' }
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
                <div className="text-sm">
                  <span className="text-gray-600">₹{stock.price.toFixed(2)}</span>
                  <span className={`ml-2 ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{stock.source}</Badge>
                <Button size="sm">Monitor</Button>
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
            30 Stocks
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'KOTAKBANK', 'LT'].map((stock, index) => (
            <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-200">
              {stock}
            </Badge>
          ))}
          <Badge variant="outline">+20 more</Badge>
        </div>
      </Card>
    </div>
  );
};

export default FeedIntegrationSimple;
