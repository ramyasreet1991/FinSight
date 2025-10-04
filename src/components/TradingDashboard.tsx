import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

const tradingStrategies = [
  {
    id: 'momentum-breakout',
    name: 'Momentum Breakout',
    description: 'Identifies stocks breaking out of consolidation patterns',
    performance: '+24.5%',
    winRate: '68%',
    status: 'active',
    risk: 'medium'
  },
  {
    id: 'mean-reversion',
    name: 'Mean Reversion',
    description: 'Trades stocks that have deviated from their average price',
    performance: '+18.2%',
    winRate: '72%',
    status: 'active',
    risk: 'low'
  },
  {
    id: 'scalping',
    name: 'Scalping Strategy',
    description: 'Quick trades for small profits throughout the day',
    performance: '+31.8%',
    winRate: '85%',
    status: 'paused',
    risk: 'high'
  }
]

const marketData = [
  { symbol: 'AAPL', price: 175.43, change: '+2.34', changePercent: '+1.35%', volume: '45.2M' },
  { symbol: 'GOOGL', price: 142.67, change: '-1.23', changePercent: '-0.85%', volume: '23.1M' },
  { symbol: 'MSFT', price: 378.91, change: '+4.56', changePercent: '+1.22%', volume: '18.7M' },
  { symbol: 'TSLA', price: 248.12, change: '-3.45', changePercent: '-1.37%', volume: '67.3M' },
  { symbol: 'NVDA', price: 892.34, change: '+12.78', changePercent: '+1.45%', volume: '89.2M' }
]

function TradingDashboard() {
  const [activeStrategy, setActiveStrategy] = useState<string>('')
  const [isTrading, setIsTrading] = useState(false)

  const startTrading = (strategyId: string) => {
    setActiveStrategy(strategyId)
    setIsTrading(true)
  }

  const stopTrading = () => {
    setActiveStrategy('')
    setIsTrading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
        <p className="text-gray-600">Monitor and control your automated trading strategies.</p>
      </div>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="strategies">Trading Strategies</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="positions">Open Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Trading Strategies Tab */}
        <TabsContent value="strategies" className="space-y-6">
          <div className="grid gap-6">
            {tradingStrategies.map((strategy) => (
              <Card key={strategy.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{strategy.name}</h3>
                      <Badge 
                        className={
                          strategy.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {strategy.status}
                      </Badge>
                      <Badge 
                        className={
                          strategy.risk === 'low' 
                            ? 'bg-blue-100 text-blue-800' 
                            : strategy.risk === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {strategy.risk} risk
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Performance</div>
                        <div className="text-lg font-semibold text-green-600">{strategy.performance}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Win Rate</div>
                        <div className="text-lg font-semibold">{strategy.winRate}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {strategy.status === 'active' ? (
                      <Button
                        onClick={() => stopTrading()}
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    ) : (
                      <Button
                        onClick={() => startTrading(strategy.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                    <Button variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Data Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Live Market Data</h3>
              <div className="space-y-3">
                {marketData.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{stock.symbol[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">Volume: {stock.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${stock.price}</div>
                      <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change} ({stock.changePercent})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Open Positions Tab */}
        <TabsContent value="positions" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Open Positions</h3>
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No open positions</p>
                <p className="text-sm">Start a trading strategy to see positions here</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total P&L</div>
                  <div className="text-2xl font-bold text-green-600">+₹45,230</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Win Rate</div>
                  <div className="text-2xl font-bold">73.5%</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Active Trades</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { TradingDashboard }
