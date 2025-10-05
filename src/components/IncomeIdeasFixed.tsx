import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Lightbulb, 
  DollarSign, 
  TrendingUp,
  Clock,
  Users,
  Target,
  BookOpen,
  Laptop,
  Smartphone,
  Camera,
  PenTool,
  ShoppingCart,
  Car,
  Home,
  Briefcase,
  Star,
  CheckCircle,
  Info,
  ExternalLink,
  Calendar,
  MapPin,
  Zap,
  BarChart3,
  PieChart
} from 'lucide-react';

interface IncomeIdea {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeToStart: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  potentialIncome: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: string[];
  steps: string[];
  resources: {
    name: string;
    url: string;
    type: 'Documentation' | 'Course' | 'Tool' | 'Community';
  }[];
  pros: string[];
  cons: string[];
  marketSize: string;
  competition: 'Low' | 'Medium' | 'High';
  scalability: 'Low' | 'Medium' | 'High';
}

const IncomeIdeasFixed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('online');
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

  const incomeIdeas: IncomeIdea[] = [
    {
      id: 'freelance-writing',
      title: 'Freelance Writing',
      category: 'online',
      icon: PenTool,
      description: 'Write content for blogs, websites, marketing materials, and publications',
      budget: { min: 0, max: 500, currency: 'USD' },
      timeToStart: '1-2 weeks',
      skillLevel: 'Beginner',
      potentialIncome: { min: 500, max: 5000, currency: 'USD' },
      requirements: ['Writing skills', 'Computer with internet', 'Portfolio samples'],
      steps: [
        'Create writing samples and portfolio',
        'Join freelance platforms (Upwork, Fiverr, Freelancer)',
        'Set up profiles on content platforms',
        'Start with small projects to build reputation',
        'Develop niche expertise',
        'Scale up to higher-paying clients'
      ],
      resources: [
        { name: 'Grammarly', url: 'https://grammarly.com', type: 'Tool' },
        { name: 'Upwork', url: 'https://upwork.com', type: 'Platform' },
        { name: 'Fiverr', url: 'https://fiverr.com', type: 'Platform' },
        { name: 'Medium Partner Program', url: 'https://medium.com', type: 'Platform' }
      ],
      pros: ['Flexible schedule', 'Low startup cost', 'Scalable', 'Remote work'],
      cons: ['Inconsistent income', 'Competition', 'Client management', 'No benefits'],
      marketSize: 'Large and growing',
      competition: 'High',
      scalability: 'High'
    },
    {
      id: 'online-tutoring',
      title: 'Online Tutoring',
      category: 'online',
      icon: BookOpen,
      description: 'Teach subjects online to students worldwide',
      budget: { min: 100, max: 1000, currency: 'USD' },
      timeToStart: '2-4 weeks',
      skillLevel: 'Intermediate',
      potentialIncome: { min: 1000, max: 8000, currency: 'USD' },
      requirements: ['Subject expertise', 'Teaching ability', 'Computer with camera', 'Stable internet'],
      steps: [
        'Identify your teaching subjects',
        'Create lesson plans and materials',
        'Set up online teaching platform',
        'Market your services',
        'Build student base',
        'Develop advanced courses'
      ],
      resources: [
        { name: 'Zoom', url: 'https://zoom.us', type: 'Tool' },
        { name: 'Udemy', url: 'https://udemy.com', type: 'Platform' },
        { name: 'Coursera', url: 'https://coursera.org', type: 'Platform' },
        { name: 'Khan Academy', url: 'https://khanacademy.org', type: 'Documentation' }
      ],
      pros: ['High earning potential', 'Flexible hours', 'Global reach', 'Scalable'],
      cons: ['Time-intensive', 'Student management', 'Platform fees', 'Competition'],
      marketSize: 'Very large',
      competition: 'High',
      scalability: 'Very High'
    },
    {
      id: 'e-commerce',
      title: 'E-commerce Store',
      category: 'online',
      icon: ShoppingCart,
      description: 'Sell products online through your own store or marketplace',
      budget: { min: 500, max: 10000, currency: 'USD' },
      timeToStart: '1-3 months',
      skillLevel: 'Intermediate',
      potentialIncome: { min: 1000, max: 50000, currency: 'USD' },
      requirements: ['Product sourcing', 'Website development', 'Marketing skills', 'Customer service'],
      steps: [
        'Research profitable products',
        'Find suppliers or manufacturers',
        'Create online store',
        'Set up payment processing',
        'Launch marketing campaigns',
        'Optimize for conversions'
      ],
      resources: [
        { name: 'Shopify', url: 'https://shopify.com', type: 'Platform' },
        { name: 'WooCommerce', url: 'https://woocommerce.com', type: 'Tool' },
        { name: 'Amazon FBA', url: 'https://amazon.com', type: 'Platform' },
        { name: 'Google Ads', url: 'https://ads.google.com', type: 'Tool' }
      ],
      pros: ['High profit margins', 'Scalable', 'Passive income potential', 'Global reach'],
      cons: ['High competition', 'Inventory management', 'Marketing costs', 'Customer service'],
      marketSize: 'Massive',
      competition: 'Very High',
      scalability: 'Very High'
    },
    {
      id: 'photography',
      title: 'Photography Services',
      category: 'creative',
      icon: Camera,
      description: 'Offer photography services for events, portraits, and commercial use',
      budget: { min: 1000, max: 5000, currency: 'USD' },
      timeToStart: '1-2 months',
      skillLevel: 'Intermediate',
      potentialIncome: { min: 2000, max: 15000, currency: 'USD' },
      requirements: ['Photography skills', 'Professional camera', 'Editing software', 'Portfolio'],
      steps: [
        'Learn photography fundamentals',
        'Invest in quality equipment',
        'Build portfolio with free shoots',
        'Create business website',
        'Market to local businesses',
        'Develop specialized services'
      ],
      resources: [
        { name: 'Adobe Lightroom', url: 'https://adobe.com', type: 'Tool' },
        { name: 'Canon/Nikon', url: 'https://canon.com', type: 'Tool' },
        { name: 'Photography courses', url: 'https://skillshare.com', type: 'Course' },
        { name: 'Instagram', url: 'https://instagram.com', type: 'Platform' }
      ],
      pros: ['Creative work', 'High per-project income', 'Flexible schedule', 'Portfolio building'],
      cons: ['Equipment costs', 'Weather dependent', 'Client management', 'Seasonal work'],
      marketSize: 'Large',
      competition: 'High',
      scalability: 'Medium'
    },
    {
      id: 'food-delivery',
      title: 'Food Delivery Service',
      category: 'service',
      icon: Car,
      description: 'Start a food delivery service or join existing platforms',
      budget: { min: 0, max: 2000, currency: 'USD' },
      timeToStart: '1-2 weeks',
      skillLevel: 'Beginner',
      potentialIncome: { min: 1000, max: 4000, currency: 'USD' },
      requirements: ['Vehicle', 'Smartphone', 'Valid license', 'Time flexibility'],
      steps: [
        'Sign up with delivery platforms',
        'Get necessary permits',
        'Optimize delivery routes',
        'Build customer relationships',
        'Consider starting own service',
        'Scale with multiple platforms'
      ],
      resources: [
        { name: 'Uber Eats', url: 'https://ubereats.com', type: 'Platform' },
        { name: 'DoorDash', url: 'https://doordash.com', type: 'Platform' },
        { name: 'Grubhub', url: 'https://grubhub.com', type: 'Platform' },
        { name: 'Local permits', url: 'https://sba.gov', type: 'Documentation' }
      ],
      pros: ['Flexible schedule', 'Immediate start', 'No experience needed', 'Cash tips'],
      cons: ['Vehicle wear', 'Fuel costs', 'Weather dependent', 'Platform fees'],
      marketSize: 'Very large',
      competition: 'High',
      scalability: 'Low'
    },
    {
      id: 'real-estate',
      title: 'Real Estate Investment',
      category: 'investment',
      icon: Home,
      description: 'Invest in rental properties for passive income',
      budget: { min: 20000, max: 200000, currency: 'USD' },
      timeToStart: '3-6 months',
      skillLevel: 'Advanced',
      potentialIncome: { min: 5000, max: 50000, currency: 'USD' },
      requirements: ['Significant capital', 'Market knowledge', 'Property management', 'Legal compliance'],
      steps: [
        'Research local real estate market',
        'Secure financing options',
        'Find suitable properties',
        'Conduct property inspections',
        'Negotiate purchase terms',
        'Manage rental operations'
      ],
      resources: [
        { name: 'Zillow', url: 'https://zillow.com', type: 'Platform' },
        { name: 'BiggerPockets', url: 'https://biggerpockets.com', type: 'Community' },
        { name: 'Real estate courses', url: 'https://udemy.com', type: 'Course' },
        { name: 'Local MLS', url: 'https://realtor.com', type: 'Platform' }
      ],
      pros: ['Passive income', 'Property appreciation', 'Tax benefits', 'Inflation hedge'],
      cons: ['High capital requirement', 'Market risk', 'Property management', 'Illiquid'],
      marketSize: 'Massive',
      competition: 'Medium',
      scalability: 'High'
    },
    {
      id: 'consulting',
      title: 'Business Consulting',
      category: 'professional',
      icon: Briefcase,
      description: 'Provide expert advice to businesses in your area of expertise',
      budget: { min: 0, max: 2000, currency: 'USD' },
      timeToStart: '1-3 months',
      skillLevel: 'Advanced',
      potentialIncome: { min: 3000, max: 20000, currency: 'USD' },
      requirements: ['Industry expertise', 'Business acumen', 'Communication skills', 'Network'],
      steps: [
        'Identify your expertise area',
        'Build professional network',
        'Create service offerings',
        'Develop pricing structure',
        'Market to target clients',
        'Deliver exceptional results'
      ],
      resources: [
        { name: 'LinkedIn', url: 'https://linkedin.com', type: 'Platform' },
        { name: 'Consulting courses', url: 'https://coursera.org', type: 'Course' },
        { name: 'Industry associations', url: 'https://sba.gov', type: 'Community' },
        { name: 'Business plan templates', url: 'https://sba.gov', type: 'Documentation' }
      ],
      pros: ['High hourly rates', 'Flexible schedule', 'Intellectual work', 'Scalable'],
      cons: ['Requires expertise', 'Client acquisition', 'Project-based income', 'Competition'],
      marketSize: 'Large',
      competition: 'Medium',
      scalability: 'High'
    }
  ];

  const categories = [
    { id: 'online', name: 'Online Business', icon: Laptop },
    { id: 'creative', name: 'Creative Services', icon: Camera },
    { id: 'service', name: 'Service Business', icon: Car },
    { id: 'investment', name: 'Investment', icon: TrendingUp },
    { id: 'professional', name: 'Professional Services', icon: Briefcase }
  ];

  const filteredItems = incomeIdeas.filter(item => item.category === selectedCategory);

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Very High': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScalabilityColor = (scalability: string) => {
    switch (scalability) {
      case 'Low': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-green-100 text-green-800';
      case 'Very High': return 'bg-green-200 text-green-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetails = (ideaId: string) => {
    console.log('View Details clicked for:', ideaId);
    setSelectedIdea(ideaId);
  };

  const handleCloseDetails = () => {
    console.log('Close Details clicked');
    setSelectedIdea(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Income Generation Ideas</h1>
          <p className="text-gray-600 mt-2">Explore various ways to generate additional income</p>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
              <p className="text-sm text-yellow-700 mt-1">
                These income ideas are for educational purposes only. Not financial advice. 
                Research thoroughly and consult professionals before starting any business.
              </p>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Income Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((idea) => {
            const IconComponent = idea.icon;
            return (
              <Card key={idea.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{idea.title}</h3>
                      <p className="text-sm text-gray-600">{idea.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Budget Required</span>
                    <span className="font-medium">
                      {formatCurrency(idea.budget.min, idea.budget.currency)} - {formatCurrency(idea.budget.max, idea.budget.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Potential Income</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(idea.potentialIncome.min, idea.potentialIncome.currency)} - {formatCurrency(idea.potentialIncome.max, idea.potentialIncome.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time to Start</span>
                    <span className="font-medium">{idea.timeToStart}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Skill Level</span>
                    <Badge className={getSkillLevelColor(idea.skillLevel)}>
                      {idea.skillLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Competition</span>
                    <Badge className={getCompetitionColor(idea.competition)}>
                      {idea.competition}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scalability</span>
                    <Badge className={getScalabilityColor(idea.scalability)}>
                      {idea.scalability}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleViewDetails(idea.id)}
                    className="w-full"
                    variant="outline"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed View */}
        {selectedIdea && (
          <Card className="p-6">
            {(() => {
              const idea = incomeIdeas.find(i => i.id === selectedIdea);
              if (!idea) {
                console.log('Idea not found:', selectedIdea);
                return <div>Idea not found</div>;
              }
              const IconComponent = idea.icon;
              
              return (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="text-xl font-bold">{idea.title}</h3>
                        <p className="text-gray-600">{idea.description}</p>
                      </div>
                    </div>
                    <Button onClick={handleCloseDetails} variant="outline">
                      Close
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget Required:</span>
                          <span className="font-medium">
                            {formatCurrency(idea.budget.min, idea.budget.currency)} - {formatCurrency(idea.budget.max, idea.budget.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Potential Income:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(idea.potentialIncome.min, idea.potentialIncome.currency)} - {formatCurrency(idea.potentialIncome.max, idea.potentialIncome.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time to Start:</span>
                          <span className="font-medium">{idea.timeToStart}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skill Level:</span>
                          <Badge className={getSkillLevelColor(idea.skillLevel)}>
                            {idea.skillLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-1">
                        {idea.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Implementation Steps</h4>
                    <ol className="space-y-2">
                      {idea.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Pros</h4>
                      <ul className="space-y-1">
                        {idea.pros.map((pro, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Cons</h4>
                      <ul className="space-y-1">
                        {idea.cons.map((con, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Info className="h-4 w-4 text-red-600" />
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Resources & Tools</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {idea.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h5 className="font-medium">{resource.name}</h5>
                            <p className="text-sm text-gray-600">{resource.type}</p>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}
      </div>
    </div>
  );
};

export default IncomeIdeasFixed;
