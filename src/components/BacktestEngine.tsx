import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Play,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react'

const backtestResults = [
  {
    strategy: 'Momentum Breakout',
    period: '2023-01-01 to 2023-12-31',
    totalReturn: '+24.5%',
    sharpeRatio: '1.42',
    maxDrawdown: '-8.3%',
    winRate: '68%',
    totalTrades: 156,
    avgTradeReturn: '+1.2%',
    status: 'completed'
  },
  {
    strategy: 'Mean Reversion',
    period: '2023-01-01 to 2023-12-31',
    totalReturn: '+18.2%',
    sharpeRatio: '1.18',
    maxDrawdown: '-5.7%',
    winRate: '72%',
    totalTrades: 89,
    avgTradeReturn: '+0.8%',
    status: 'completed'
  },
  {
    strategy: 'Scalping Strategy',
    period: '2023-01-01 to 2023-12-31',
    totalReturn: '+31.8%',
    sharpeRatio: '2.15',
    maxDrawdown: '-12.1%',
    winRate: '85%',
    totalTrades: 1247,
    avgTradeReturn: '+0.3%',
    status: 'running'
  }
]

const performanceMetrics = [
  { label: 'Total Return', value: '+24.5%', trend: 'up' },
  { label: 'Sharpe Ratio', value: '1.42', trend: 'up' },
  { label: 'Max Drawdown', value: '-8.3%', trend: 'down' },
  { label: 'Win Rate', value: '68%', trend: 'up' },
  { label: 'Total Trades', value: '156', trend: 'neutral' },
  { label: 'Avg Trade Return', value: '+1.2%', trend: 'up' }
]

function BacktestEngine() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedStrategy, setSelectedStrategy] = useState('')

  const startBacktest = (strategy: string) => {
    setSelectedStrategy(strategy)
    setIsRunning(true)
    setProgress(0)
    
    // Simulate backtest progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Backtest Engine</h1>
        <p className="text-gray-600">Test your trading strategies against historical data.</p>
      </div>

      <Tabs defaultValue="run" className="space-y-6">
        <TabsList>
          <TabsTrigger value="run">Run Backtest</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="comparison">Strategy Comparison</TabsTrigger>
        </TabsList>

        {/* Run Backtest Tab */}
        <TabsContent value="run" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configure Backtest</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option>Momentum Breakout</option>
                  <option>Mean Reversion</option>
                  <option>Scalping Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option>Last 6 months</option>
                  <option>Last 1 year</option>
                  <option>Last 2 years</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Capital</label>
                <input 
                  type="number" 
                  defaultValue="100000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option>Conservative</option>
                  <option>Moderate</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
            
            {isRunning && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Running backtest for {selectedStrategy}...</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <Button 
                onClick={() => startBacktest('Momentum Breakout')}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Start Backtest'}
              </Button>
              <Button variant="outline" disabled={isRunning}>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                    <div className={`text-2xl font-bold ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 
                      'text-gray-900'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${
                    metric.trend === 'up' ? 'bg-green-100' : 
                    metric.trend === 'down' ? 'bg-red-100' : 
                    'bg-gray-100'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    ) : (
                      <BarChart3 className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Chart</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>Performance chart will be displayed here</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Strategy Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="space-y-4">
            {backtestResults.map((result, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">{result.strategy}</h3>
                    <Badge 
                      className={
                        result.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">{result.period}</div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Return</div>
                    <div className="text-lg font-semibold text-green-600">{result.totalReturn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sharpe Ratio</div>
                    <div className="text-lg font-semibold">{result.sharpeRatio}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Max Drawdown</div>
                    <div className="text-lg font-semibold text-red-600">{result.maxDrawdown}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Win Rate</div>
                    <div className="text-lg font-semibold">{result.winRate}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { BacktestEngine }
