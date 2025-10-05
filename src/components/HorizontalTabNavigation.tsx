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
  Award,
  Shield,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';

interface TabGroup {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isActive?: boolean;
  children: TabItem[];
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: string;
  isNew?: boolean;
  description?: string;
}

interface MarketData {
  nifty50: { price: number; change: number; changePercent: number };
  sensex: { price: number; change: number; changePercent: number };
  bankNifty: { price: number; change: number; changePercent: number };
  gold: { price: number; change: number; changePercent: number };
  crude: { price: number; change: number; changePercent: number };
}

const HorizontalTabNavigation: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('markets');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const [marketData] = useState<MarketData>({
    nifty50: { price: 24725.50, change: 125.30, changePercent: 0.51 },
    sensex: { price: 81220.15, change: 420.85, changePercent: 0.52 },
    bankNifty: { price: 52245.80, change: -85.20, changePercent: -0.16 },
    gold: { price: 71580, change: 450, changePercent: 0.63 },
    crude: { price: 6780, change: -125, changePercent: -1.81 }
  });

  const tabGroups: TabGroup[] = [
    {
      id: 'markets',
      label: 'Markets',
      icon: Globe,
      badge: 'Live',
      children: [
        { id: 'stocks', label: 'Stocks', icon: TrendingUp, href: '/portfolio', description: 'Individual stock analysis' },
        { id: 'indices', label: 'Indices', icon: BarChart3, href: '/analytics', description: 'Market indices tracking' },
        { id: 'commodities', label: 'Commodities', icon: Coins, href: '/nifty-momentum', description: 'Gold, Oil, Silver prices' },
        { id: 'forex', label: 'Forex', icon: DollarSign, href: '/feeds', description: 'Currency exchange rates' },
        { id: 'crypto', label: 'Cryptocurrency', icon: Zap, href: '/trading', description: 'Digital currency markets', isNew: true },
        { id: 'bonds', label: 'Bonds & Fixed Income', icon: Shield, href: '/backtest', description: 'Government & corporate bonds' },
        { id: 'futures', label: 'Futures & Options', icon: Target, href: '/trading', description: 'Derivatives trading' },
        { id: 'sectors', label: 'Sector Analysis', icon: PieChart, href: '/portfolio-manager', description: 'Industry sector performance' }
      ]
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: FileText,
      badge: 'Pro',
      children: [
        { id: 'technical', label: 'Technical Analysis', icon: LineChart, href: '/advanced-analytics', description: 'Charts, indicators & patterns' },
        { id: 'fundamental', label: 'Fundamental Analysis', icon: Building, href: '/tijori', description: 'Financial statements & ratios' },
        { id: 'multibagger', label: 'Multibagger Analysis', icon: Star, href: '/multibagger-analysis', description: 'Growth stock identification' },
        { id: 'live-analysis', label: 'Live Analysis', icon: Activity, href: '/live-multibagger', description: 'Real-time market analysis' },
        { id: 'news-radar', label: 'News & Risk Radar', icon: Radio, href: '/trading-news-radar', description: 'AI-powered news analysis' },
        { id: 'nse-analysis', label: 'NSE Data Analysis', icon: Database, href: '/nse-analysis', description: 'Official NSE data insights' },
        { id: 'screener', label: 'Stock Screener', icon: Filter, href: '/integration-analysis', description: 'Advanced stock filtering' },
        { id: 'backtest', label: 'Backtesting Engine', icon: Play, href: '/backtest', description: 'Strategy performance testing' }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: Calculator,
      badge: '12',
      children: [
        { id: 'emi-calculator', label: 'EMI Calculator', icon: Calculator, href: '/emi-calculator', description: 'Loan EMI calculations' },
        { id: 'financial-ai', label: 'Financial AI Assistant', icon: MessageSquare, href: '/financial-ai', description: 'AI-powered financial guidance' },
        { id: 'income-ideas', label: 'Income Ideas', icon: Lightbulb, href: '/income-ideas', description: 'Business & investment opportunities' },
        { id: 'portfolio-tracker', label: 'Portfolio Tracker', icon: PieChart, href: '/portfolio', description: 'Investment portfolio monitoring' },
        { id: 'watchlist', label: 'Watchlist', icon: Eye, href: '/portfolio', description: 'Track favorite stocks', badge: '12' },
        { id: 'alerts', label: 'Price Alerts', icon: Bell, href: '/portfolio', description: 'Custom price notifications', badge: '5' },
        { id: 'currency-converter', label: 'Currency Converter', icon: DollarSign, href: '/feeds', description: 'Real-time currency rates' },
        { id: 'tax-calculator', label: 'Tax Calculator', icon: CreditCard, href: '/emi-calculator', description: 'Income tax calculations' }
      ]
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      badge: 'Live',
      children: [
        { id: 'latest-news', label: 'Latest News', icon: Newspaper, href: '/news', description: 'Breaking financial news' },
        { id: 'market-news', label: 'Market News', icon: TrendingUp, href: '/news', description: 'Market-moving headlines' },
        { id: 'company-news', label: 'Company News', icon: Building, href: '/news', description: 'Corporate announcements' },
        { id: 'economic-news', label: 'Economic News', icon: DollarSign, href: '/news', description: 'Economic indicators & reports' },
        { id: 'sector-news', label: 'Sector News', icon: PieChart, href: '/news', description: 'Industry-specific updates' },
        { id: 'global-news', label: 'Global Markets', icon: Globe, href: '/news', description: 'International market news' },
        { id: 'earnings', label: 'Earnings Calendar', icon: Calendar, href: '/news', description: 'Upcoming earnings reports' },
        { id: 'ipo-news', label: 'IPO & Listings', icon: TrendingUp, href: '/news', description: 'New stock listings' }
      ]
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: PieChart,
      badge: 'Active',
      children: [
        { id: 'my-portfolio', label: 'My Portfolio', icon: PieChart, href: '/portfolio', description: 'View your investments' },
        { id: 'performance', label: 'Performance', icon: BarChart3, href: '/analytics', description: 'Portfolio performance metrics' },
        { id: 'transactions', label: 'Transactions', icon: Activity, href: '/portfolio', description: 'Buy/sell history' },
        { id: 'dividends', label: 'Dividends', icon: DollarSign, href: '/portfolio', description: 'Dividend tracking' },
        { id: 'tax-report', label: 'Tax Reports', icon: FileText, href: '/portfolio', description: 'Capital gains & tax reports' },
        { id: 'goals', label: 'Financial Goals', icon: Target, href: '/financial-ai', description: 'Goal-based investing' },
        { id: 'rebalancing', label: 'Rebalancing', icon: RefreshCw, href: '/portfolio', description: 'Portfolio rebalancing tools' },
        { id: 'risk-analysis', label: 'Risk Analysis', icon: AlertTriangle, href: '/advanced-analytics', description: 'Portfolio risk assessment' }
      ]
    },
    {
      id: 'education',
      label: 'Education',
      icon: Bookmark,
      children: [
        { id: 'tutorials', label: 'Trading Tutorials', icon: Play, href: '/disclaimer', description: 'Learn trading basics' },
        { id: 'webinars', label: 'Webinars', icon: Users, href: '/disclaimer', description: 'Live educational sessions' },
        { id: 'glossary', label: 'Financial Glossary', icon: FileText, href: '/disclaimer', description: 'Financial terms dictionary' },
        { id: 'research-reports', label: 'Research Reports', icon: FileText, href: '/disclaimer', description: 'In-depth market research' },
        { id: 'courses', label: 'Online Courses', icon: Award, href: '/disclaimer', description: 'Structured learning paths' },
        { id: 'disclaimer', label: 'Disclaimer & Terms', icon: AlertTriangle, href: '/disclaimer', description: 'Legal information' },
        { id: 'faq', label: 'FAQ', icon: MessageSquare, href: '/disclaimer', description: 'Frequently asked questions' },
        { id: 'support', label: 'Help & Support', icon: ExternalLink, href: '/disclaimer', description: 'Customer support' }
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
      <div className="px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Live Market Data</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">NIFTY 50</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="text-sm font-bold text-gray-900">{formatPrice(marketData.nifty50.price)}</div>
            <div className={`text-xs ${getChangeColor(marketData.nifty50.change)}`}>
              {formatChange(marketData.nifty50.change)} ({marketData.nifty50.changePercent.toFixed(2)}%)
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">SENSEX</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-sm font-bold text-gray-900">{formatPrice(marketData.sensex.price)}</div>
            <div className={`text-xs ${getChangeColor(marketData.sensex.change)}`}>
              {formatChange(marketData.sensex.change)} ({marketData.sensex.changePercent.toFixed(2)}%)
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">BANK NIFTY</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="text-sm font-bold text-gray-900">{formatPrice(marketData.bankNifty.price)}</div>
            <div className={`text-xs ${getChangeColor(marketData.bankNifty.change)}`}>
              {formatChange(marketData.bankNifty.change)} ({marketData.bankNifty.changePercent.toFixed(2)}%)
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">GOLD</span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="text-sm font-bold text-gray-900">₹{formatPrice(marketData.gold.price)}</div>
            <div className={`text-xs ${getChangeColor(marketData.gold.change)}`}>
              {formatChange(marketData.gold.change)} ({marketData.gold.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    const activeTabGroup = tabGroups.find(group => group.id === activeTab);
    if (!activeTabGroup) return null;

    return (
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
            {activeTabGroup.children.map((item) => {
              const isActive = item.href === location.pathname;
              const isExpanded = expandedItems.has(item.id);
              
              return (
                <div key={item.id} className="group">
                  <Link
                    to={item.href}
                    className={`block p-4 rounded-lg border-2 transition-all duration-200 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{item.label}</h3>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.badge === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {item.isNew && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FinSight</h1>
                <p className="text-sm text-gray-500">Financial Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search stocks, news..." 
                  className="bg-transparent text-sm focus:outline-none w-48"
                />
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Data */}
      {renderMarketData()}

      {/* Horizontal Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === group.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <group.icon className="h-4 w-4" />
                <span className="font-medium">{group.label}</span>
                {group.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    group.badge === 'Live' || group.badge === 'Pro'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {group.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default HorizontalTabNavigation;
