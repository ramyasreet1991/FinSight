import React from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { designTokens, formatCurrency, formatPercentage, formatNumber } from './DesignTokens';

interface MarketData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volume?: number;
  isLive?: boolean;
}

interface MarketSummaryCardProps {
  title: string;
  data: MarketData[];
  showVolume?: boolean;
  lastUpdated?: string;
}

export const MarketSummaryCard: React.FC<MarketSummaryCardProps> = ({
  title,
  data,
  showVolume = false,
  lastUpdated
}) => {
  const getChangeColor = (change: number) => {
    if (change > 0) return designTokens.colors.success[600];
    if (change < 0) return designTokens.colors.danger[600];
    return designTokens.colors.neutral[600];
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
      style={{
        padding: designTokens.components.card.padding,
        borderRadius: designTokens.components.card.borderRadius,
        boxShadow: designTokens.components.card.shadow
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900" style={{ fontSize: designTokens.typography.fontSize.lg }}>
              {title}
            </h3>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Updated {lastUpdated}
              </p>
            )}
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-medium">LIVE</span>
        </div>
      </div>

      {/* Market Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div 
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700 text-sm">{item.name}</span>
              <div className="flex items-center space-x-1">
                {getChangeIcon(item.change)}
                <span 
                  className="text-xs font-medium"
                  style={{ color: getChangeColor(item.change) }}
                >
                  {formatPercentage(item.changePercent)}
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(item.value)}
            </div>
            
            <div className="flex items-center justify-between">
              <span 
                className="text-sm font-medium"
                style={{ color: getChangeColor(item.change) }}
              >
                {item.change > 0 ? '+' : ''}{formatCurrency(Math.abs(item.change))}
              </span>
              
              {showVolume && item.volume && (
                <span className="text-xs text-gray-500">
                  Vol: {formatNumber(item.volume)}L
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
