// Design Tokens for NSE Insights Finance App
export const designTokens = {
  // Layout & Density
  layout: {
    gridColumns: {
      desktop: 12,
      mobile: 4,
      tablet: 8
    },
    containerMaxWidth: '1440px',
    cardPadding: '24px',
    sectionSpacing: '32px'
  },

  // Color System (Finance-safe, calm)
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#2563eb', // Accent blue
      600: '#1d4ed8',
      700: '#1e3a8a', // Primary navy
      800: '#1e40af',
      900: '#1e3a8a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#16a34a',
      600: '#15803d',
      700: '#166534',
      800: '#14532d',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      heading: 'Inter, system-ui, -apple-system, sans-serif',
      body: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },

  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // Component-specific tokens
  components: {
    card: {
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      hoverShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    },
    button: {
      primary: {
        bg: '#2563eb',
        text: '#ffffff',
        hoverBg: '#1d4ed8',
        borderRadius: '8px',
        padding: '12px 24px'
      },
      secondary: {
        bg: '#f1f5f9',
        text: '#475569',
        hoverBg: '#e2e8f0',
        border: '1px solid #cbd5e1'
      }
    }
  },

  // Data formatting
  formatting: {
    currency: {
      locale: 'en-IN',
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    percentage: {
      locale: 'en-IN',
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    },
    number: {
      locale: 'en-IN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  }
};

// Utility functions for applying tokens
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(
    designTokens.formatting.currency.locale,
    designTokens.formatting.currency
  ).format(amount);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat(
    designTokens.formatting.percentage.locale,
    designTokens.formatting.percentage
  ).format(value / 100);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat(
    designTokens.formatting.number.locale,
    designTokens.formatting.number
  ).format(value);
};
