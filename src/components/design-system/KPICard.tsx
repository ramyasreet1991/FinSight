import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Shield, Zap } from 'lucide-react';
import { designTokens, formatPercentage } from './DesignTokens';

interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'neutral';
  score?: number; // 0-100 score
  description?: string;
  source?: string;
  updatedAt?: string;
  icon?: React.ComponentType<any>;
  variant?: 'default' | 'score' | 'trend';
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit = '',
  change,
  changePercent,
  trend = 'neutral',
  score,
  description,
  source,
  updatedAt,
  icon: Icon,
  variant = 'default'
}) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return designTokens.colors.success[600];
      case 'down': return designTokens.colors.danger[600];
      default: return designTokens.colors.neutral[600];
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return designTokens.colors.success[500];
    if (score >= 60) return designTokens.colors.warning[500];
    return designTokens.colors.danger[500];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const formatValue = (val: number, unit: string) => {
    if (unit === '%') return `${val.toFixed(1)}%`;
    if (unit === 'score') return `${val}/100`;
    return val.toLocaleString('en-IN');
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
      style={{
        padding: designTokens.components.card.padding,
        borderRadius: designTokens.components.card.borderRadius,
        boxShadow: designTokens.components.card.shadow
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg transition-colors group-hover:bg-blue-50"
            style={{ backgroundColor: designTokens.colors.neutral[50] }}
          >
            {Icon ? (
              <Icon className="h-5 w-5 text-blue-600" />
            ) : (
              <Target className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        
        {variant === 'score' && score !== undefined && (
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: getScoreColor(score) }}
          >
            {score}/100
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatValue(value, unit)}
        </div>
        
        {(change !== undefined || changePercent !== undefined) && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {getTrendIcon(trend)}
              <span 
                className="text-sm font-medium"
                style={{ color: getTrendColor(trend) }}
              >
                {change !== undefined && `${change > 0 ? '+' : ''}${change.toFixed(1)}`}
                {changePercent !== undefined && ` (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%)`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <Shield className="h-3 w-3" />
          <span>{source || 'NSE Official'}</span>
        </div>
        {updatedAt && (
          <span>{updatedAt}</span>
        )}
      </div>
    </div>
  );
};
