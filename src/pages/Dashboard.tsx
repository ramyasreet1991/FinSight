import React from 'react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { TrendingUp, Activity, BarChart3, PieChart } from 'lucide-react'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
              <p className="text-gray-600 mt-2">Real-time market insights and breadth analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Activity className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Research best-practices only—Not investment advice. Not a CA/SEBI-RIA
              </p>
            </div>
          </div>
        </div>

        {/* Market Summary */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Market Summary</h3>
                  <p className="text-sm text-gray-500">Updated 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 text-sm">NIFTY 50</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">24,725.50</div>
                <div className="text-sm text-green-600">+125.30 (+0.51%)</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 text-sm">SENSEX</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">81,220.15</div>
                <div className="text-sm text-green-600">+420.85 (+0.52%)</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 text-sm">BANK NIFTY</span>
                  <TrendingUp className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">52,245.80</div>
                <div className="text-sm text-red-600">-85.20 (-0.16%)</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 text-sm">GOLD</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">₹71,580</div>
                <div className="text-sm text-green-600">+450 (+0.63%)</div>
              </div>
            </div>
          </Card>
        </div>

        {/* KPI Grid */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Market Health Indicators</h2>
            <Badge className="bg-blue-100 text-blue-800">Live</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Market Breadth Score</h4>
                    <p className="text-xs text-gray-500 mt-1">Advance/Decline ratio analysis</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  72/100
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">72</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+5 (+7.5%)</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Delivery Quality</h4>
                    <p className="text-xs text-gray-500 mt-1">Average delivery percentage</p>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">58.3%</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+2.1 (+3.7%)</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Liquidity Concentration</h4>
                    <p className="text-xs text-gray-500 mt-1">Top N securities share</p>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">68.5%</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">-1.2 (-1.7%)</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Retail Participation</h4>
                    <p className="text-xs text-gray-500 mt-1">Internet trading share</p>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">23.4%</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+0.8 (+3.5%)</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Quick Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get instant insights on market breadth, delivery trends, and sector rotation.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Analyze Now
            </button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Set Alerts</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Create custom alerts for price levels, delivery spikes, and breadth changes.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Create Alert
            </button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Portfolio View</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Track your investments with delivery-based insights and risk analysis.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              View Portfolio
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
