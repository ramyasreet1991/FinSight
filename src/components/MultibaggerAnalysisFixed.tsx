import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp,
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  DollarSign,
  Shield,
  Zap,
  Award,
  Building,
  Users,
  Globe,
  RefreshCw,
  Download,
  Search,
  Info,
  BookOpen,
  Lightbulb,
  Eye
} from 'lucide-react';

const MultibaggerAnalysisFixed: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('criteria');

  const multibaggerCharacteristics = [
    {
      id: 'growth',
      name: 'Revenue & Profit Growth',
      description: 'Consistent top-line and bottom-line growth over 3+ years',
      detailedExplanation: 'Sustainable growth is the foundation of multibagger stocks. Look for companies that have demonstrated consistent revenue and profit growth over multiple years, ideally 15-25% CAGR.',
      weight: 1.0,
      icon: TrendingUp,
      examples: ['Revenue CAGR > 15% for 3+ years', 'Profit CAGR > 20% for 3+ years', 'Consistent quarterly growth'],
      metrics: ['Revenue CAGR', 'Profit CAGR', 'Quarterly Growth Rate', 'Growth Consistency Score'],
      redFlags: ['Declining revenues', 'Volatile profit margins', 'One-time gains boosting profits']
    },
    {
      id: 'market',
      name: 'Large Addressable Market',
      description: 'Sector growth trends and market expansion potential',
      detailedExplanation: 'Companies operating in large, growing markets have more room to scale. Focus on sectors with structural growth drivers like digital transformation, urbanization, rising incomes.',
      weight: 1.0,
      icon: Globe,
      examples: ['Digital payments (₹50L+ crore market)', 'Electric vehicles (growing 30%+ annually)', 'Healthcare (demographic dividend)'],
      metrics: ['Market Size', 'Market Growth Rate', 'Market Share', 'TAM (Total Addressable Market)'],
      redFlags: ['Declining industry', 'Saturated markets', 'Regulatory headwinds']
    },
    {
      id: 'scalability',
      name: 'Scalability & Operating Leverage',
      description: 'Business can grow margins as it scales',
      detailedExplanation: 'Scalable businesses can increase margins as they grow due to fixed cost leverage, network effects, or operational efficiency.',
      weight: 1.0,
      icon: Zap,
      examples: ['Software companies (high gross margins)', 'Platform businesses (network effects)', 'Asset-light models'],
      metrics: ['Operating Leverage', 'Margin Expansion', 'Fixed vs Variable Costs', 'Scale Benefits'],
      redFlags: ['High variable costs', 'Marginal cost increases', 'Capacity constraints']
    },
    {
      id: 'management',
      name: 'Visionary & Strong Management',
      description: 'Track record of leadership and execution',
      detailedExplanation: 'Quality management is crucial for long-term success. Look for leaders with vision, integrity, and a proven track record of execution.',
      weight: 1.0,
      icon: Users,
      examples: ['Promoter holding > 40%', 'Insider buying activity', 'Track record of value creation', 'Corporate governance ratings'],
      metrics: ['Promoter Holding %', 'Insider Trading Activity', 'Management Tenure', 'Corporate Governance Score'],
      redFlags: ['Frequent promoter selling', 'High management turnover', 'Corporate governance issues']
    },
    {
      id: 'debt',
      name: 'Low or Manageable Debt',
      description: 'Debt/equity ratio and interest coverage',
      detailedExplanation: 'Low debt levels provide financial flexibility and reduce bankruptcy risk. Companies with manageable debt can invest in growth without excessive financial stress.',
      weight: 1.0,
      icon: Shield,
      examples: ['Debt-to-equity < 0.5', 'Interest coverage > 3x', 'Net debt/EBITDA < 2x', 'Cash on books'],
      metrics: ['Debt-to-Equity Ratio', 'Interest Coverage Ratio', 'Net Debt/EBITDA', 'Cash Position'],
      redFlags: ['High debt-to-equity ratio', 'Low interest coverage', 'Rising debt levels']
    }
  ];

  const mockStocks = [
    {
      symbol: 'BALRAMCHIN',
      name: 'Balrampur Chini Mills Ltd',
      currentPrice: 456.50,
      marketCap: '₹9,500 Cr',
      sector: 'Sugar',
      totalScore: 8.0,
      verdict: 'High',
      lastUpdated: '2024-01-15',
      riskLevel: 'Medium'
    },
    {
      symbol: 'TATACHEM',
      name: 'Tata Chemicals Ltd',
      currentPrice: 1245.80,
      marketCap: '₹31,200 Cr',
      sector: 'Chemicals',
      totalScore: 7.0,
      verdict: 'Medium',
      lastUpdated: '2024-01-15',
      riskLevel: 'Low'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Multibagger Analysis</h1>
              <p className="text-gray-600 mt-2">Comprehensive 10-point framework for identifying potential multibagger stocks</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Critical Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Important Investment Disclaimer</h3>
              <div className="text-sm text-red-700 mt-1 space-y-1">
                <p>• This analysis is for <strong>educational purposes only</strong> and not investment advice</p>
                <p>• Past performance does not guarantee future results</p>
                <p>• All investments carry risk of loss</p>
                <p>• Please consult with a qualified financial advisor before making investment decisions</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="criteria">Multibagger Criteria</TabsTrigger>
            <TabsTrigger value="analysis">Stock Analysis</TabsTrigger>
            <TabsTrigger value="screening">Stock Screening</TabsTrigger>
            <TabsTrigger value="education">Education & Resources</TabsTrigger>
          </TabsList>

          {/* Multibagger Criteria */}
          <TabsContent value="criteria" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The 10-Point Multibagger Framework</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our comprehensive framework evaluates stocks across key characteristics that historically 
                identify potential multibagger investments. Each criterion is scored from 0-10 points.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {multibaggerCharacteristics.map((characteristic, index) => (
                <Card key={characteristic.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <characteristic.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{characteristic.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Weight: {characteristic.weight}x
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{characteristic.description}</p>
                      
                      <details className="mb-4">
                        <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                          <Info className="h-4 w-4 inline mr-1" />
                          Detailed Explanation
                        </summary>
                        <p className="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg">
                          {characteristic.detailedExplanation}
                        </p>
                      </details>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            What to Look For:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {characteristic.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-600 mr-2">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <BarChart3 className="h-4 w-4 text-blue-600 mr-1" />
                            Key Metrics:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {characteristic.metrics.map((metric, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                            Red Flags:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {characteristic.redFlags.map((flag, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-600 mr-2">•</span>
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Scoring Guide */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                Scoring Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-600">8-10</span>
                  </div>
                  <h4 className="font-semibold text-green-800">High Potential</h4>
                  <p className="text-sm text-green-600 mt-1">Strong multibagger characteristics across most criteria</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-yellow-600">5-7</span>
                  </div>
                  <h4 className="font-semibold text-yellow-800">Medium Potential</h4>
                  <p className="text-sm text-yellow-600 mt-1">Some multibagger characteristics but mixed signals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-red-600">0-4</span>
                  </div>
                  <h4 className="font-semibold text-red-800">Low Potential</h4>
                  <p className="text-sm text-red-600 mt-1">Limited multibagger characteristics identified</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Stock Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Stock to View Analysis</h3>
              <p className="text-gray-600">Choose a stock from the screening tab to see detailed multibagger analysis</p>
            </div>
          </TabsContent>

          {/* Stock Screening */}
          <TabsContent value="screening" className="space-y-6">
            {/* Stock List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStocks.map((stock) => (
                <Card key={stock.symbol} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">₹{stock.currentPrice}</div>
                      <div className="text-xs text-gray-500">{stock.marketCap}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{stock.sector}</Badge>
                    <Badge className={`${getVerdictColor(stock.verdict)}`}>
                      {stock.verdict} Potential
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Multibagger Score</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(stock.totalScore)}`}>
                      {stock.totalScore}/10
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>Updated: {stock.lastUpdated}</span>
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education & Resources */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Educational Content */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  Learning Resources
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Understanding Multibagger Investing</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Learn the fundamentals of identifying stocks with 10x+ potential returns
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Financial Statement Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Master the art of reading balance sheets, P&L, and cash flow statements
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Risk Management</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential strategies for managing portfolio risk and position sizing
                    </p>
                  </div>
                </div>
              </Card>

              {/* Tools & Calculators */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                  Tools & Calculators
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    CAGR Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Portfolio Allocation Tool
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Price Target Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Risk Assessment Tool
                  </Button>
                </div>
              </Card>
            </div>

            {/* Best Practices */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                Multibagger Investing Best Practices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">✅ Do's</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Invest for the long term (5+ years)</li>
                    <li>• Diversify across sectors and market caps</li>
                    <li>• Focus on business fundamentals</li>
                    <li>• Keep position sizes reasonable</li>
                    <li>• Regular review and rebalancing</li>
                    <li>• Stay updated with quarterly results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">❌ Don'ts</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Don't chase hot tips or rumors</li>
                    <li>• Avoid over-concentration in one stock</li>
                    <li>• Don't ignore risk management</li>
                    <li>• Avoid emotional decision making</li>
                    <li>• Don't invest money you can't afford to lose</li>
                    <li>• Avoid timing the market</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MultibaggerAnalysisFixed;
