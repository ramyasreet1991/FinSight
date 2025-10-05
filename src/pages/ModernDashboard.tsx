import React from 'react';
import { MarketSummaryCard } from '../components/design-system/MarketSummaryCard';
import { KPICard } from '../components/design-system/KPICard';
import { DisclaimerBanner } from '../components/design-system/DisclaimerBanner';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  Shield, 
  Zap,
  BarChart3,
  PieChart,
  Users,
  Building2
} from 'lucide-react';
import { designTokens } from '../components/design-system/DesignTokens';

const ModernDashboard: React.FC = () => {
  // Mock market data
  const marketData = [
    { name: 'NIFTY 50', value: 24725.50, change: 125.30, changePercent: 0.51, volume: 125000, isLive: true },
    { name: 'SENSEX', value: 81220.15, change: 420.85, changePercent: 0.52, volume: 89000, isLive: true },
    { name: 'BANK NIFTY', value: 52245.80, change: -85.20, changePercent: -0.16, volume: 67000, isLive: true },
    { name: 'NIFTY MIDCAP', value: 45678.90, change: 234.50, changePercent: 0.52, volume: 45000, isLive: true }
  ];

  const kpiData = [
    {
      title: 'Market Breadth Score',
      value: 72,
      unit: 'score',
      change: 5,
      changePercent: 7.5,
      trend: 'up' as const,
      score: 72,
      description: 'Advance/Decline ratio analysis',
      source: 'NSE Official',
      updatedAt: '2m ago',
      icon: BarChart3
    },
    {
      title: 'Delivery Quality',
      value: 58.3,
      unit: '%',
      change: 2.1,
      changePercent: 3.7,
      trend: 'up' as const,
      description: 'Average delivery percentage',
      source: 'NSE Official',
      updatedAt: '1m ago',
      icon: Shield
    },
    {
      title: 'Liquidity Concentration',
      value: 68.5,
      unit: '%',
      change: -1.2,
      changePercent: -1.7,
      trend: 'down' as const,
      description: 'Top N securities share',
      source: 'NSE Official',
      updatedAt: '3m ago',
      icon: Target
    },
    {
      title: 'Retail Participation',
      value: 23.4,
      unit: '%',
      change: 0.8,
      changePercent: 3.5,
      trend: 'up' as const,
      description: 'Internet trading share',
      source: 'NSE Official',
      updatedAt: '5m ago',
      icon: Users
    }
  ];

  const sectorData = [
    { name: 'Auto', performance: 2.3, valuation: 'Fair', leadership: 'Strong' },
    { name: 'Banking', performance: -0.8, valuation: 'Attractive', leadership: 'Weak' },
    { name: 'IT', performance: 1.5, valuation: 'Expensive', leadership: 'Moderate' },
    { name: 'Pharma', performance: 0.9, valuation: 'Fair', leadership: 'Moderate' },
    { name: 'FMCG', performance: -0.2, valuation: 'Fair', leadership: 'Weak' },
    { name: 'Metals', performance: 3.2, valuation: 'Attractive', leadership: 'Strong' }
  ];

  const getSectorColor = (performance: number) => {
    if (performance > 2) return designTokens.colors.success[500];
    if (performance > 0) return designTokens.colors.success[400];
    if (performance > -1) return designTokens.colors.warning[500];
    return designTokens.colors.danger[500];
  };

  const getValuationColor = (valuation: string) => {
    switch (valuation) {
      case 'Attractive': return designTokens.colors.success[500];
      case 'Fair': return designTokens.colors.warning[500];
      case 'Expensive': return designTokens.colors.danger[500];
      default: return designTokens.colors.neutral[500];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: designTokens.typography.fontFamily.heading }}
              >
                Market Overview
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time market insights and breadth analysis
              </p>
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
        <DisclaimerBanner variant="compact" />

        {/* Market Summary */}
        <div className="mb-8">
          <MarketSummaryCard
            title="Market Summary"
            data={marketData}
            showVolume={true}
            lastUpdated="2 minutes ago"
          />
        </div>

        {/* KPI Grid */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <h2 
              className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: designTokens.typography.fontFamily.heading }}
            >
              Market Health Indicators
            </h2>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Live
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                change={kpi.change}
                changePercent={kpi.changePercent}
                trend={kpi.trend}
                score={kpi.score}
                description={kpi.description}
                source={kpi.source}
                updatedAt={kpi.updatedAt}
                icon={kpi.icon}
                variant="score"
              />
            ))}
          </div>
        </div>

        {/* Sector Performance */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <h2 
              className="text-xl font-semibold text-gray-900"
              style={{ fontFamily: designTokens.typography.fontFamily.heading }}
            >
              Sector Performance
            </h2>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              1D Performance
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valuation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leadership
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sectorData.map((sector, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{sector.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {sector.performance > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span 
                            className="font-medium"
                            style={{ color: getSectorColor(sector.performance) }}
                          >
                            {sector.performance > 0 ? '+' : ''}{sector.performance.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getValuationColor(sector.valuation)}20`,
                            color: getValuationColor(sector.valuation)
                          }}
                        >
                          {sector.valuation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{sector.leadership}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Quick Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get instant insights on market breadth, delivery trends, and sector rotation.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Analyze Now
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Set Alerts</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Create custom alerts for price levels, delivery spikes, and breadth changes.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Create Alert
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
