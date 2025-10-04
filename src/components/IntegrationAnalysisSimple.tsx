import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target,
  CheckCircle,
  Info,
  Zap,
  Activity,
  PieChart,
  LineChart,
  Filter,
  Search,
  Bell,
  Star,
  DollarSign,
  Percent,
  Calendar,
  Users,
  Building,
  ExternalLink,
  Shield,
  Database,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const IntegrationAnalysisSimple: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('liquide');

  const platformAnalysis = {
    liquide: {
      name: 'Liquide',
      category: 'Investment Platform',
      keyFeatures: [
        'Personalized investment recommendations',
        'Real-time portfolio analysis',
        'AI-powered insights',
        'Risk assessment tools',
        'Goal-based investing'
      ],
      integrationComplexity: 'Medium',
      apiAvailability: 'Limited',
      priority: 'High'
    },
    univest: {
      name: 'Univest',
      category: 'Investment Tracking',
      keyFeatures: [
        'Investment tracking and monitoring',
        'Financial goal setting',
        'Automated alerts and notifications',
        'Performance analytics',
        'Social investing features'
      ],
      integrationComplexity: 'Low',
      apiAvailability: 'Good',
      priority: 'Medium'
    },
    stockedge: {
      name: 'StockEdge',
      category: 'Analytics Platform',
      keyFeatures: [
        'Advanced technical analysis',
        'Fundamental analysis tools',
        'Stock screening and filtering',
        'Custom watchlists',
        'Real-time market data'
      ],
      integrationComplexity: 'High',
      apiAvailability: 'Excellent',
      priority: 'High'
    },
    zerodha: {
      name: 'Zerodha',
      category: 'Trading Platform',
      keyFeatures: [
        'Trading execution',
        'Market research and reports',
        'Educational content',
        'Kite API integration',
        'Pulse news aggregation'
      ],
      integrationComplexity: 'High',
      apiAvailability: 'Excellent',
      priority: 'Critical'
    },
    hdfc: {
      name: 'HDFC Securities',
      category: 'Full-Service Brokerage',
      keyFeatures: [
        'Investment advisory services',
        'Research reports and recommendations',
        'Portfolio management tools',
        'Real-time market updates',
        'Client relationship management'
      ],
      integrationComplexity: 'Medium',
      apiAvailability: 'Limited',
      priority: 'Medium'
    },
    feedly: {
      name: 'Feedly',
      category: 'News Aggregation',
      keyFeatures: [
        'News aggregation from multiple sources',
        'Customizable content feeds',
        'AI-powered content curation',
        'Integration with other platforms',
        'Real-time news updates'
      ],
      integrationComplexity: 'Low',
      apiAvailability: 'Good',
      priority: 'High'
    },
    tijori: {
      name: 'Tijori',
      category: 'Financial Data Platform',
      keyFeatures: [
        'Comprehensive financial data',
        'Company performance metrics',
        'Investment screening tools',
        'Alternative data sources',
        'Event tracking and timelines'
      ],
      integrationComplexity: 'Medium',
      apiAvailability: 'Good',
      priority: 'High'
    }
  };

  const integrationRoadmap = [
    {
      phase: 'Phase 1 - Foundation',
      duration: '4-6 weeks',
      features: [
        'Feedly news integration',
        'Basic Tijori data integration',
        'Portfolio tracking setup',
        'Educational content integration'
      ],
      platforms: ['Feedly', 'Tijori', 'Educational Resources'],
      status: 'In Progress'
    },
    {
      phase: 'Phase 2 - Analytics',
      duration: '6-8 weeks',
      features: [
        'StockEdge analytics integration',
        'Advanced portfolio analytics',
        'Risk assessment tools',
        'Performance tracking'
      ],
      platforms: ['StockEdge', 'Portfolio Analytics'],
      status: 'Planned'
    },
    {
      phase: 'Phase 3 - Trading',
      duration: '8-10 weeks',
      features: [
        'Zerodha Kite integration',
        'Trading execution capabilities',
        'Real-time market data',
        'Order management'
      ],
      platforms: ['Zerodha', 'Market Data Providers'],
      status: 'Planned'
    },
    {
      phase: 'Phase 4 - Intelligence',
      duration: '6-8 weeks',
      features: [
        'Liquide AI recommendations',
        'Univest goal tracking',
        'HDFC advisory integration',
        'Advanced analytics'
      ],
      platforms: ['Liquide', 'Univest', 'HDFC Securities'],
      status: 'Future'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      case 'Future': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integration Analysis</h2>
          <p className="text-gray-600">Analysis of demanding features from financial platforms</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(platformAnalysis).map((platform) => (
              <option key={platform} value={platform}>
                {platformAnalysis[platform as keyof typeof platformAnalysis].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This integration analysis is for educational purposes only. Not financial advice. 
              Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analysis">Platform Analysis</TabsTrigger>
          <TabsTrigger value="roadmap">Integration Roadmap</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Plan</TabsTrigger>
        </TabsList>

        {/* Platform Analysis */}
        <TabsContent value="analysis" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].name} Analysis
              </h3>
              <Badge className={getPriorityColor(platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].priority)}>
                {platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].priority} Priority
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Platform Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Integration Complexity:</span>
                    <Badge className={getComplexityColor(platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].integrationComplexity)}>
                      {platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].integrationComplexity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Availability:</span>
                    <span className="font-medium">{platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].apiAvailability}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Features</h4>
                <ul className="space-y-1">
                  {platformAnalysis[selectedPlatform as keyof typeof platformAnalysis].keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integration Roadmap */}
        <TabsContent value="roadmap" className="space-y-4">
          <div className="space-y-4">
            {integrationRoadmap.map((phase, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{phase.phase}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status}
                    </Badge>
                    <span className="text-sm text-gray-600">{phase.duration}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="space-y-1">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.platforms.map((platform, platformIndex) => (
                        <Badge key={platformIndex} variant="outline" className="bg-gray-50 text-gray-800">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Implementation Plan */}
        <TabsContent value="implementation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Technical Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Database Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  <span className="text-sm">API Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span className="text-sm">Security Implementation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">UI/UX Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                  <span className="text-sm">Mobile Responsiveness</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Implementation Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phase 1 - Foundation</span>
                  <Badge className="bg-blue-100 text-blue-800">4-6 weeks</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phase 2 - Analytics</span>
                  <Badge className="bg-yellow-100 text-yellow-800">6-8 weeks</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phase 3 - Trading</span>
                  <Badge className="bg-orange-100 text-orange-800">8-10 weeks</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phase 4 - Intelligence</span>
                  <Badge className="bg-gray-100 text-gray-800">6-8 weeks</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Key Integration Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-1">Enhanced Analytics</h4>
                <p className="text-sm text-gray-600">Comprehensive analysis tools from multiple sources</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-1">Real-time Data</h4>
                <p className="text-sm text-gray-600">Live market data and news feeds</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-1">Personalized Experience</h4>
                <p className="text-sm text-gray-600">AI-driven recommendations and insights</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationAnalysisSimple;
