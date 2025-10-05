import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Building2, 
  TrendingUp, 
  FileText, 
  Bell, 
  BookOpen,
  Activity,
  PieChart,
  Calculator,
  MessageSquare,
  Database,
  Lightbulb,
  Settings,
  Search,
  RefreshCw,
  TrendingDown,
  Globe,
  DollarSign,
  Coins,
  Zap,
  Target,
  Shield
} from 'lucide-react';
import { designTokens, formatCurrency, formatPercentage } from './DesignTokens';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: string;
  description?: string;
}

interface MarketData {
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

const ModernNavigation: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Live market data
  const marketData: MarketData[] = [
    { symbol: 'NIFTY 50', value: 24725.50, change: 125.30, changePercent: 0.51 },
    { symbol: 'SENSEX', value: 81220.15, change: 420.85, changePercent: 0.52 },
    { symbol: 'BANK NIFTY', value: 52245.80, change: -85.20, changePercent: -0.16 },
    { symbol: 'GOLD', value: 71580, change: 450, changePercent: 0.63 }
  ];

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Market',
      icon: Home,
      href: '/',
      description: 'Market overview and insights'
    },
    {
      id: 'sectors',
      label: 'Sectors',
      icon: Building2,
      href: '/portfolio-manager',
      badge: 'Live',
      description: 'Sector performance analysis'
    },
    {
      id: 'stocks',
      label: 'Stocks',
      icon: TrendingUp,
      href: '/portfolio',
      description: 'Individual stock analysis'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      href: '/nse-analysis',
      description: 'NSE data reports'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: Bell,
      href: '/portfolio',
      badge: '5',
      description: 'Price and delivery alerts'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      href: '/disclaimer',
      description: 'Educational resources'
    }
  ];

  const getChangeColor = (change: number) => {
    return change >= 0 ? designTokens.colors.success[600] : designTokens.colors.danger[600];
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ borderRadius: designTokens.borderRadius.xl }}
                >
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 
                    className="text-2xl font-bold text-gray-900"
                    style={{ fontFamily: designTokens.typography.fontFamily.heading }}
                  >
                    FinSight
                  </h1>
                  <p className="text-sm text-gray-500">NSE Market Insights</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks, sectors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    fontSize: designTokens.typography.fontSize.sm,
                    borderRadius: designTokens.borderRadius.lg
                  }}
                />
              </div>
              <button 
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ borderRadius: designTokens.borderRadius.lg }}
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Data */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live Market Data</span>
            </div>
            
            <div className="flex items-center space-x-6">
              {marketData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">{item.symbol}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {formatCurrency(item.value)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(item.change)}
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getChangeColor(item.change) }}
                    >
                      {formatPercentage(item.changePercent)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === '/' && location.pathname === '/');
              
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`relative flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span 
                    className="font-medium"
                    style={{ fontSize: designTokens.typography.fontSize.sm }}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.badge === 'Live' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                      style={{ borderRadius: designTokens.borderRadius.full }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Research Disclaimer */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800 font-medium">
              Research best-practices only—Not investment advice. Not a CA/SEBI-RIA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernNavigation;
