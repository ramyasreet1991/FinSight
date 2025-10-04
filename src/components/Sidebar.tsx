import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  PieChart,
  BarChart3,
  Settings,
  TrendingUp,
  DollarSign,
  Target,
  Wallet,
  Activity,
  Play,
  Rss,
  Zap,
  AlertTriangle,
  Newspaper,
  Building
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Trading', href: '/trading', icon: Activity },
  { name: 'Backtest', href: '/backtest', icon: Play },
  { name: 'Feed Integration', href: '/feeds', icon: Rss },
  { name: 'Smallcap Momentum', href: '/nifty-momentum', icon: Zap },
  { name: 'News Feed', href: '/news', icon: Newspaper },
  { name: 'Tijori Analysis', href: '/tijori', icon: Building },
  { name: 'Disclaimer', href: '/disclaimer', icon: AlertTriangle },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">FinSight</h1>
        </div>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Financial Goals</span>
          </div>
          <p className="text-xs opacity-90">Track your progress towards financial freedom</p>
        </div>
      </div>
    </div>
  )
}
