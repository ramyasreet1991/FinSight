import React, { useState, useEffect, useRef } from 'react';
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
  Shield,
  ChevronDown,
  MoreHorizontal
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
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Live market data
  const marketData: MarketData[] = [
    { symbol: 'NIFTY 50', value: 24725.50, change: 125.30, changePercent: 0.51 },
    { symbol: 'SENSEX', value: 81220.15, change: 420.85, changePercent: 0.52 },
    { symbol: 'BANK NIFTY', value: 52245.80, change: -85.20, changePercent: -0.16 },
    { symbol: 'GOLD', value: 71580, change: 450, changePercent: 0.63 }
  ];

  // Primary navigation items (always visible)
  const primaryNavItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/',
      description: 'Market overview and insights'
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: PieChart,
      href: '/portfolio',
      description: 'Portfolio management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      description: 'Market analytics'
    },
    {
      id: 'trading',
      label: 'Trading',
      icon: Activity,
      href: '/trading',
      description: 'Trading dashboard'
    },
    {
      id: 'nifty-momentum',
      label: 'Nifty Momentum',
      icon: TrendingUp,
      href: '/nifty-momentum',
      badge: 'Live',
      description: 'Smallcap momentum stocks'
    },
    {
      id: 'multibagger',
      label: 'Multibagger',
      icon: Zap,
      href: '/multibagger-analysis',
      description: 'Growth stock analysis'
    },
    {
      id: 'financial-ai',
      label: 'Financial AI',
      icon: MessageSquare,
      href: '/financial-ai',
      description: 'AI financial guidance'
    }
  ];

  // Secondary navigation items (in dropdown)
  const secondaryNavItems: NavigationItem[] = [
    {
      id: 'nse-analysis',
      label: 'NSE Analysis',
      icon: Database,
      href: '/nse-analysis',
      description: 'Official NSE data'
    },
    {
      id: 'news',
      label: 'News',
      icon: FileText,
      href: '/news',
      description: 'Market news feed'
    },
    {
      id: 'calculators',
      label: 'Calculators',
      icon: Calculator,
      href: '/emi-calculator',
      description: 'Financial calculators'
    },
    {
      id: 'income-ideas',
      label: 'Income Ideas',
      icon: Lightbulb,
      href: '/income-ideas',
      description: 'Business opportunities'
    },
    {
      id: 'backtest',
      label: 'Backtest',
      icon: BarChart3,
      href: '/backtest',
      description: 'Strategy backtesting'
    },
    {
      id: 'feeds',
      label: 'Feed Integration',
      icon: RefreshCw,
      href: '/feeds',
      description: 'Data feed management'
    },
    {
      id: 'tijori',
      label: 'Tijori Analysis',
      icon: Building2,
      href: '/tijori',
      description: 'Fundamental analysis'
    },
    {
      id: 'trading-news-radar',
      label: 'News Radar',
      icon: Bell,
      href: '/trading-news-radar',
      description: 'AI-powered news analysis'
    },
    {
      id: 'live-multibagger',
      label: 'Live Multibagger',
      icon: Activity,
      href: '/live-multibagger',
      description: 'Real-time multibagger analysis'
    },
    {
      id: 'advanced-analytics',
      label: 'Advanced Analytics',
      icon: BarChart3,
      href: '/advanced-analytics',
      description: 'Technical analysis tools'
    },
    {
      id: 'portfolio-manager',
      label: 'Portfolio Manager',
      icon: PieChart,
      href: '/portfolio-manager',
      description: 'Advanced portfolio tools'
    },
    {
      id: 'integration-analysis',
      label: 'Integration Analysis',
      icon: Database,
      href: '/integration-analysis',
      description: 'Platform integrations'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      description: 'App settings'
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
            {/* Primary Navigation Items */}
            {primaryNavItems.map((item) => {
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
            
            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`relative flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  showMoreMenu || secondaryNavItems.some(item => location.pathname === item.href)
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span 
                  className="font-medium"
                  style={{ fontSize: designTokens.typography.fontSize.sm }}
                >
                  More
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {showMoreMenu && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {secondaryNavItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Link
                          key={item.id}
                          to={item.href}
                          onClick={() => setShowMoreMenu(false)}
                          className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                            isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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
