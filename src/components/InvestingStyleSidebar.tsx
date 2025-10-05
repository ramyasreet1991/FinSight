import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Globe,
  DollarSign,
  Coins,
  Activity,
  Newspaper,
  FileText,
  Calculator,
  Target,
  Star,
  Bell,
  Calendar,
  Search,
  Filter,
  Settings,
  ChevronDown,
  ChevronRight,
  Eye,
  Bookmark,
  Users,
  Building,
  Zap,
  Database,
  MessageSquare,
  Radio,
  LineChart,
  Lightbulb,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Play,
  Wallet,
  CreditCard,
  PiggyBank,
  ChartLine,
  TrendingUpIcon,
  Award,
  Shield,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  badge?: string;
  children?: NavigationItem[];
  isExpanded?: boolean;
  isNew?: boolean;
}

interface MarketData {
  nifty50: { price: number; change: number; changePercent: number };
  sensex: { price: number; change: number; changePercent: number };
  bankNifty: { price: number; change: number; changePercent: number };
  gold: { price: number; change: number; changePercent: number };
  crude: { price: number; change: number; changePercent: number };
}

const InvestingStyleSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['markets', 'analysis', 'tools']));
  const [marketData] = useState<MarketData>({
    nifty50: { price: 24725.50, change: 125.30, changePercent: 0.51 },
    sensex: { price: 81220.15, change: 420.85, changePercent: 0.52 },
    bankNifty: { price: 52245.80, change: -85.20, changePercent: -0.16 },
    gold: { price: 71580, change: 450, changePercent: 0.63 },
    crude: { price: 6780, change: -125, changePercent: -1.81 }
  });

  const navigationItems: NavigationItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      href: '/'
    },
    {
      id: 'markets',
      label: 'Markets',
      icon: Globe,
      children: [
        { id: 'stocks', label: 'Stocks', icon: TrendingUp, href: '/portfolio' },
        { id: 'indices', label: 'Indices', icon: BarChart3, href: '/analytics' },
        { id: 'commodities', label: 'Commodities', icon: Coins, href: '/nifty-momentum' },
        { id: 'forex', label: 'Forex', icon: DollarSign, href: '/feeds' },
        { id: 'crypto', label: 'Cryptocurrency', icon: Zap, href: '/trading' },
        { id: 'bonds', label: 'Bonds & Fixed Income', icon: Shield, href: '/backtest' }
      ]
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: FileText,
      children: [
        { id: 'technical', label: 'Technical Analysis', icon: LineChart, href: '/advanced-analytics' },
        { id: 'fundamental', label: 'Fundamental Analysis', icon: Building, href: '/tijori' },
        { id: 'sector', label: 'Sector Analysis', icon: PieChart, href: '/portfolio-manager' },
        { id: 'multibagger', label: 'Multibagger Analysis', icon: Star, href: '/multibagger-analysis' },
        { id: 'live-analysis', label: 'Live Analysis', icon: Activity, href: '/live-multibagger' },
        { id: 'news-radar', label: 'News & Risk Radar', icon: Radio, href: '/trading-news-radar' }
      ]
    },
    {
      id: 'tools',
      label: 'Tools & Calculators',
      icon: Calculator,
      children: [
        { id: 'emi-calculator', label: 'EMI Calculator', icon: Calculator, href: '/emi-calculator' },
        { id: 'financial-ai', label: 'Financial AI Assistant', icon: MessageSquare, href: '/financial-ai' },
        { id: 'nse-analysis', label: 'NSE Data Analysis', icon: Database, href: '/nse-analysis' },
        { id: 'income-ideas', label: 'Income Ideas', icon: Lightbulb, href: '/income-ideas' },
        { id: 'backtest-engine', label: 'Backtest Engine', icon: Play, href: '/backtest' },
        { id: 'integration-analysis', label: 'Integration Analysis', icon: Filter, href: '/integration-analysis' }
      ]
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: PieChart,
      href: '/portfolio',
      badge: 'Active'
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      icon: Eye,
      href: '/portfolio',
      badge: '12'
    },
    {
      id: 'alerts',
      label: 'Price Alerts',
      icon: Bell,
      href: '/portfolio',
      badge: '5'
    },
    {
      id: 'news',
      label: 'News & Insights',
      icon: Newspaper,
      children: [
        { id: 'latest-news', label: 'Latest News', icon: Newspaper, href: '/news' },
        { id: 'market-news', label: 'Market News', icon: TrendingUp, href: '/news' },
        { id: 'company-news', label: 'Company News', icon: Building, href: '/news' },
        { id: 'economic-news', label: 'Economic News', icon: DollarSign, href: '/news' }
      ]
    },
    {
      id: 'education',
      label: 'Education',
      icon: Bookmark,
      children: [
        { id: 'tutorials', label: 'Trading Tutorials', icon: Play, href: '/disclaimer' },
        { id: 'glossary', label: 'Financial Glossary', icon: FileText, href: '/disclaimer' },
        { id: 'webinars', label: 'Webinars', icon: Users, href: '/disclaimer' },
        { id: 'disclaimer', label: 'Disclaimer & Terms', icon: AlertTriangle, href: '/disclaimer' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const renderMarketData = () => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="px-4 py-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Live Market Data
        </h3>
        
        {/* Major Indices */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-700">NIFTY 50</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{formatPrice(marketData.nifty50.price)}</div>
              <div className={`text-xs ${getChangeColor(marketData.nifty50.change)}`}>
                {formatChange(marketData.nifty50.change)} ({marketData.nifty50.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">SENSEX</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{formatPrice(marketData.sensex.price)}</div>
              <div className={`text-xs ${getChangeColor(marketData.sensex.change)}`}>
                {formatChange(marketData.sensex.change)} ({marketData.sensex.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-700">BANK NIFTY</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{formatPrice(marketData.bankNifty.price)}</div>
              <div className={`text-xs ${getChangeColor(marketData.bankNifty.change)}`}>
                {formatChange(marketData.bankNifty.change)} ({marketData.bankNifty.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Commodities */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-gray-700">GOLD</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">₹{formatPrice(marketData.gold.price)}</div>
              <div className={`text-xs ${getChangeColor(marketData.gold.change)}`}>
                {formatChange(marketData.gold.change)} ({marketData.gold.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="font-medium text-gray-700">CRUDE</span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">₹{formatPrice(marketData.crude.price)}</div>
              <div className={`text-xs ${getChangeColor(marketData.crude.change)}`}>
                {formatChange(marketData.crude.change)} ({marketData.crude.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isActive = item.href === location.pathname;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const paddingLeft = level * 16 + 16;

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors`}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.isNew && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isExpanded && (
            <div className="bg-gray-50">
              {item.children?.map((child) => renderNavigationItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href || '#'}
        className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="flex items-center space-x-3">
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          {item.isNew && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        {item.badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            item.badge === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="w-80 bg-white shadow-lg h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinSight</h1>
            <p className="text-sm text-gray-500">Financial Intelligence</p>
          </div>
        </div>
      </div>

      {/* Live Market Data */}
      {renderMarketData()}

      {/* Quick Actions */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navigationItems.map((item) => renderNavigationItem(item))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Help & Support</span>
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <p>© 2024 FinSight</p>
            <p className="mt-1">Educational Purpose Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestingStyleSidebar;
