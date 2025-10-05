import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { designTokens } from './DesignTokens';

interface DisclaimerBannerProps {
  variant?: 'full' | 'compact' | 'inline';
  position?: 'top' | 'bottom' | 'floating';
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  variant = 'compact',
  position = 'top'
}) => {
  const getBannerStyle = () => {
    const baseStyle = {
      padding: designTokens.spacing.md,
      borderRadius: designTokens.borderRadius.md,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      lineHeight: designTokens.typography.lineHeight.normal
    };

    switch (variant) {
      case 'full':
        return {
          ...baseStyle,
          backgroundColor: designTokens.colors.warning[50],
          border: `1px solid ${designTokens.colors.warning[200]}`,
          color: designTokens.colors.warning[800]
        };
      case 'compact':
        return {
          ...baseStyle,
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
          backgroundColor: designTokens.colors.neutral[50],
          border: `1px solid ${designTokens.colors.neutral[200]}`,
          color: designTokens.colors.neutral[700]
        };
      case 'inline':
        return {
          ...baseStyle,
          padding: designTokens.spacing.sm,
          backgroundColor: 'transparent',
          color: designTokens.colors.neutral[600]
        };
      default:
        return baseStyle;
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'full':
        return <AlertTriangle className="h-5 w-5" />;
      case 'compact':
        return <Shield className="h-4 w-4" />;
      case 'inline':
        return <Info className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getMessage = () => {
    switch (variant) {
      case 'full':
        return (
          <div className="space-y-2">
            <p className="font-semibold">Important Disclaimer</p>
            <p>
              This application provides research best-practices only. This is not investment advice. 
              We are not a CA or SEBI-registered investment advisor. All data is for educational purposes. 
              Please consult qualified professionals before making investment decisions.
            </p>
          </div>
        );
      case 'compact':
        return (
          <div className="flex items-center space-x-2">
            <span>Research best-practices only—Not investment advice. Not a CA/SEBI-RIA</span>
          </div>
        );
      case 'inline':
        return (
          <span className="text-sm">
            Research only. Not investment advice. Consult professionals before investing.
          </span>
        );
      default:
        return <span>Research best-practices only—Not investment advice</span>;
    }
  };

  const containerClass = () => {
    switch (position) {
      case 'top':
        return 'mb-6';
      case 'bottom':
        return 'mt-6';
      case 'floating':
        return 'fixed top-4 left-4 right-4 z-50 max-w-4xl mx-auto';
      default:
        return 'mb-4';
    }
  };

  return (
    <div className={containerClass()}>
      <div 
        className="flex items-start space-x-3"
        style={getBannerStyle()}
      >
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          {getMessage()}
        </div>
      </div>
    </div>
  );
};
