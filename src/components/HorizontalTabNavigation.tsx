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
  const [activeTab, setActiveTab] = useState<string>('dashboard');
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
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: 'Overview',
      children: [
        { id: 'main-dashboard', label: 'Main Dashboard', icon: Home, href: '/', description: 'Overview of all features' },
        { id: 'portfolio', label: 'Portfolio View', icon: PieChart, href: '/portfolio', description: 'Your investment portfolio' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', description: 'Market analytics & insights' },
        { id: 'trading', label: 'Trading Dashboard', icon: Activity, href: '/trading', description: 'Trading interface' },
        { id: 'backtest', label: 'Backtest Engine', icon: Play, href: '/backtest', description: 'Strategy backtesting' },
        { id: 'feed-integration', label: 'Feed Integration', icon: RefreshCw, href: '/feeds', description: 'Data feed management' },
        { id: 'nifty-momentum', label: 'Nifty Momentum', icon: TrendingUp, href: '/nifty-momentum', description: 'Smallcap momentum stocks' },
        { id: 'portfolio-manager', label: 'Portfolio Manager', icon: Users, href: '/portfolio-manager', description: 'Advanced portfolio tools' }
      ]
    },
    {
      id: 'analysis',
      label: 'Analysis Tools',
      icon: FileText,
      badge: 'Pro',
      children: [
        { id: 'advanced-analytics', label: 'Advanced Analytics', icon: LineChart, href: '/advanced-analytics', description: 'Technical analysis tools' },
        { id: 'tijori-analysis', label: 'Tijori Analysis', icon: Building, href: '/tijori', description: 'Fundamental analysis' },
        { id: 'multibagger-analysis', label: 'Multibagger Analysis', icon: Star, href: '/multibagger-analysis', description: 'Growth stock identification' },
        { id: 'live-multibagger', label: 'Live Multibagger', icon: Activity, href: '/live-multibagger', description: 'Real-time multibagger analysis' },
        { id: 'trading-news-radar', label: 'Trading News Radar', icon: Radio, href: '/trading-news-radar', description: 'AI-powered news analysis' },
        { id: 'nse-data-analysis', label: 'NSE Data Analysis', icon: Database, href: '/nse-analysis', description: 'Official NSE data insights' },
        { id: 'integration-analysis', label: 'Integration Analysis', icon: Filter, href: '/integration-analysis', description: 'Platform integrations' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', description: 'Application settings' }
      ]
    },
    {
      id: 'calculators',
      label: 'Calculators',
      icon: Calculator,
      badge: 'Tools',
      children: [
        { id: 'emi-calculator', label: 'EMI Calculator', icon: Calculator, href: '/emi-calculator', description: 'Loan EMI calculations' },
        { id: 'financial-ai', label: 'Financial AI Assistant', icon: MessageSquare, href: '/financial-ai', description: 'AI-powered financial guidance' },
        { id: 'income-ideas', label: 'Income Ideas', icon: Lightbulb, href: '/income-ideas', description: 'Business & investment opportunities' },
        { id: 'tax-calculator', label: 'Tax Calculator', icon: CreditCard, href: '/emi-calculator', description: 'Income tax calculations' },
        { id: 'investment-calculator', label: 'Investment Calculator', icon: Target, href: '/portfolio', description: 'Investment planning tools' },
        { id: 'retirement-calculator', label: 'Retirement Calculator', icon: PiggyBank, href: '/financial-ai', description: 'Retirement planning' },
        { id: 'sip-calculator', label: 'SIP Calculator', icon: TrendingUp, href: '/portfolio', description: 'Systematic investment planning' },
        { id: 'goal-calculator', label: 'Goal Calculator', icon: Award, href: '/financial-ai', description: 'Financial goal planning' }
      ]
    },
    {
      id: 'news',
      label: 'News & Information',
      icon: Newspaper,
      badge: 'Live',
      children: [
        { id: 'news-feed', label: 'News Feed', icon: Newspaper, href: '/news', description: 'Latest financial news' },
        { id: 'market-updates', label: 'Market Updates', icon: TrendingUp, href: '/news', description: 'Market-moving headlines' },
        { id: 'company-announcements', label: 'Company Announcements', icon: Building, href: '/news', description: 'Corporate news' },
        { id: 'economic-indicators', label: 'Economic Indicators', icon: DollarSign, href: '/news', description: 'Economic data & reports' },
        { id: 'sector-news', label: 'Sector News', icon: PieChart, href: '/news', description: 'Industry-specific updates' },
        { id: 'global-markets', label: 'Global Markets', icon: Globe, href: '/news', description: 'International market news' },
        { id: 'earnings-calendar', label: 'Earnings Calendar', icon: Calendar, href: '/news', description: 'Upcoming earnings reports' },
        { id: 'ipo-listings', label: 'IPO & Listings', icon: TrendingUp, href: '/news', description: 'New stock listings' }
      ]
    },
    {
      id: 'portfolio',
      label: 'Portfolio Management',
      icon: PieChart,
      badge: 'Active',
      children: [
        { id: 'my-portfolio', label: 'My Portfolio', icon: PieChart, href: '/portfolio', description: 'View your investments' },
        { id: 'performance-metrics', label: 'Performance Metrics', icon: BarChart3, href: '/analytics', description: 'Portfolio performance analysis' },
        { id: 'transaction-history', label: 'Transaction History', icon: Activity, href: '/portfolio', description: 'Buy/sell history' },
        { id: 'dividend-tracking', label: 'Dividend Tracking', icon: DollarSign, href: '/portfolio', description: 'Dividend income tracking' },
        { id: 'tax-reports', label: 'Tax Reports', icon: FileText, href: '/portfolio', description: 'Capital gains & tax reports' },
        { id: 'financial-goals', label: 'Financial Goals', icon: Target, href: '/financial-ai', description: 'Goal-based investing' },
        { id: 'portfolio-rebalancing', label: 'Portfolio Rebalancing', icon: RefreshCw, href: '/portfolio', description: 'Rebalancing tools' },
        { id: 'risk-assessment', label: 'Risk Assessment', icon: AlertTriangle, href: '/advanced-analytics', description: 'Portfolio risk analysis' }
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: Bookmark,
      children: [
        { id: 'disclaimer', label: 'Disclaimer & Terms', icon: AlertTriangle, href: '/disclaimer', description: 'Legal information & disclaimers' },
        { id: 'trading-tutorials', label: 'Trading Tutorials', icon: Play, href: '/disclaimer', description: 'Learn trading basics' },
        { id: 'educational-webinars', label: 'Educational Webinars', icon: Users, href: '/disclaimer', description: 'Live educational sessions' },
        { id: 'financial-glossary', label: 'Financial Glossary', icon: FileText, href: '/disclaimer', description: 'Financial terms dictionary' },
        { id: 'research-reports', label: 'Research Reports', icon: FileText, href: '/disclaimer', description: 'In-depth market research' },
        { id: 'online-courses', label: 'Online Courses', icon: Award, href: '/disclaimer', description: 'Structured learning paths' },
        { id: 'faq', label: 'FAQ', icon: MessageSquare, href: '/disclaimer', description: 'Frequently asked questions' },
        { id: 'help-support', label: 'Help & Support', icon: ExternalLink, href: '/disclaimer', description: 'Customer support' }
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
