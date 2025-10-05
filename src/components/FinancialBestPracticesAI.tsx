import React, { useState, useEffect } from 'react';
import { freeLLMService, FinancialContext } from '../lib/freeLLMService';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Brain,
  Calculator,
  TrendingUp,
  Shield,
  Target,
  DollarSign,
  Users,
  Home,
  Car,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  RefreshCw,
  Send,
  Lightbulb,
  BookOpen,
  Info,
  ExternalLink
} from 'lucide-react';

interface FinancialProfile {
  age?: number;
  city?: string;
  dependents: number;
  goals: string[];
  risk_profile: 'conservative' | 'balanced' | 'growth';
  tax_regime: 'old' | 'new' | 'unknown';
  monthly_income: number;
  monthly_expenses: number;
  emis_total: number;
  investible_surplus: number;
  savings_rate_pct: number;
  assets: {
    bank_fd: number;
    debt_funds_bonds: number;
    equity_mf_stocks: number;
    epf: number;
    nps: number;
    gold: number;
    real_estate_equity: number;
    other: number;
  };
  liabilities: Array<{
    type: 'home' | 'personal' | 'LAS' | 'gold' | 'cc';
    outstanding: number;
    roi_pct: number;
    emi: number;
    tenure_months_left: number;
    prepayment_penalty_pct: number;
  }>;
  risk_cover: {
    term_life_sum_assured: number;
    health_cover_base: number;
    health_cover_topup: number;
    other: string;
  };
  emergency_fund_months: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const FinancialBestPracticesAI: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [financialProfile, setFinancialProfile] = useState<FinancialProfile>({
    dependents: 0,
    goals: [],
    risk_profile: 'balanced',
    tax_regime: 'unknown',
    monthly_income: 0,
    monthly_expenses: 0,
    emis_total: 0,
    investible_surplus: 0,
    savings_rate_pct: 0,
    assets: {
      bank_fd: 0,
      debt_funds_bonds: 0,
      equity_mf_stocks: 0,
      epf: 0,
      nps: 0,
      gold: 0,
      real_estate_equity: 0,
      other: 0
    },
    liabilities: [],
    risk_cover: {
      term_life_sum_assured: 0,
      health_cover_base: 0,
      health_cover_topup: 0,
      other: ''
    },
    emergency_fund_months: 0
  });
  const [showProfileForm, setShowProfileForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      content: `Hi! I can share **finance best-practices** (not advice). 

**⚠️ IMPORTANT DISCLAIMER:**
• This is **best-practices education**, **not** financial planning or personalized advice
• I am **not a CA** and **not SEBI-registered**; tax and investment rules can change
• Always consult qualified professionals before making financial decisions

Let's start with some quick details to tailor the guidance:

1. **Age, city, dependents**; top 2-3 goals + timelines
2. **Monthly take-home** & core expenses  
3. **Assets** (bank/FD, EPF/NPS, MF/stocks, gold, real estate)
4. **Loans** (type, outstanding, interest %, EMI, tenure left)
5. **Emergency fund** (months), term life sum assured, health cover (₹)
6. **Tax regime** (old/new) & risk comfort (low/med/high)

Would you prefer a **quick start** or a **deeper** best-practices walkthrough?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (content: string, type: 'user' | 'ai', isTyping: boolean = false) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Build financial context
      const context: FinancialContext = {
        userProfile: financialProfile,
        conversationHistory: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        currentQuery: userMessage
      };

      // Use free LLM service for response generation
      const llmResponse = await freeLLMService.generateFinancialGuidance(context);
      
      return llmResponse.content;
    } catch (error) {
      console.error('LLM Service Error:', error);
      
      // Fallback to quick response for common queries
      return freeLLMService.getQuickResponse(userMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = addMessage(inputMessage, 'user');
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await generateAIResponse(inputMessage);
      
      // Remove typing indicator and add AI response
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id + '_typing'));
      addMessage(aiResponse, 'ai');
    } catch (error) {
      addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateMetrics = () => {
    const totalAssets = Object.values(financialProfile.assets).reduce((sum, val) => sum + val, 0);
    const totalLiabilities = financialProfile.liabilities.reduce((sum, liab) => sum + liab.outstanding, 0);
    const netWorth = totalAssets - totalLiabilities;
    const dtiRatio = financialProfile.monthly_income > 0 ? 
      (financialProfile.emis_total / financialProfile.monthly_income) * 100 : 0;
    const emergencyFundTarget = financialProfile.monthly_expenses * 6;
    const termLifeTarget = financialProfile.monthly_income * 12 * 10; // 10x annual income

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      dtiRatio,
      emergencyFundTarget,
      termLifeTarget,
      savingsRate: financialProfile.monthly_income > 0 ? 
        (financialProfile.investible_surplus / financialProfile.monthly_income) * 100 : 0
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Best-Practices AI</h1>
              <p className="text-gray-600 mt-2">Educational guidance for personal finance management in India</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowProfileForm(!showProfileForm)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Complete Profile
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
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
              <h3 className="text-sm font-medium text-red-800">Important Legal Disclaimer</h3>
              <div className="text-sm text-red-700 mt-1 space-y-1">
                <p>• This is <strong>best-practices education only</strong>, <strong>NOT</strong> financial planning or personalized advice</p>
                <p>• I am <strong>NOT a CA</strong> and <strong>NOT SEBI-registered</strong>; tax and investment rules can change</p>
                <p>• Always consult qualified professionals (CA/SEBI-RIA) before making financial decisions</p>
                <p>• Highlight assumptions/risks and verify with certified advisors</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="profile">Financial Profile</TabsTrigger>
            <TabsTrigger value="analysis">Best-Practices Analysis</TabsTrigger>
            <TabsTrigger value="resources">Resources & Tools</TabsTrigger>
          </TabsList>

          {/* AI Chat */}
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Financial Best-Practices AI Assistant</h3>
                    <p className="text-sm text-gray-600">Ask questions about personal finance best practices</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="prose prose-sm max-w-none">
                            {message.content.split('\n').map((line, index) => {
                              // Handle empty lines
                              if (line.trim() === '') {
                                return <br key={index} />;
                              }
                              
                              // Handle markdown-style bold text
                              const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                              
                              // Handle bullet points
                              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                return (
                                  <div key={index} className="flex items-start mb-1">
                                    <span className="mr-2">•</span>
                                    <span 
                                      dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[•\-]\s*/, '') }}
                                      className="flex-1"
                                    />
                                  </div>
                                );
                              }
                              
                              // Handle regular paragraphs
                              return (
                                <p key={index} className="mb-2 last:mb-0">
                                  <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
                                </p>
                              );
                            })}
                          </div>
                          <div className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about financial best practices..."
                        className="flex-1 min-h-[60px]"
                        disabled={isLoading}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        size="lg"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Quick Questions</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setInputMessage("What should be my emergency fund target?")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Emergency Fund
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setInputMessage("How to prioritize debt repayment?")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Debt Strategy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setInputMessage("What's a good asset allocation?")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Asset Allocation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setInputMessage("How much insurance do I need?")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Insurance Planning
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Best-Practice Ranges</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Emergency Fund:</span>
                      <span className="font-medium">6-12× expenses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term Life:</span>
                      <span className="font-medium">10-15× income</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Savings Rate:</span>
                      <span className="font-medium">30-50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DTI Ratio:</span>
                      <span className="font-medium">&lt;36%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Financial Profile */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Financial Profile</h3>
              
              {showProfileForm ? (
                <div className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Basic Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={financialProfile.age || ''}
                            onChange={(e) => setFinancialProfile(prev => ({...prev, age: parseInt(e.target.value)}))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={financialProfile.city || ''}
                            onChange={(e) => setFinancialProfile(prev => ({...prev, city: e.target.value}))}
                            placeholder="e.g., Mumbai"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dependents">Dependents</Label>
                          <Input
                            id="dependents"
                            type="number"
                            value={financialProfile.dependents}
                            onChange={(e) => setFinancialProfile(prev => ({...prev, dependents: parseInt(e.target.value)}))}
                          />
                        </div>
                      </div>
                      <Button onClick={() => setCurrentStep(2)}>Next: Income & Expenses</Button>
                    </div>
                  )}

                  {/* Step 2: Income & Expenses */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Income & Expenses</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="monthly_income">Monthly Take-home Income</Label>
                          <Input
                            id="monthly_income"
                            type="number"
                            value={financialProfile.monthly_income || ''}
                            onChange={(e) => setFinancialProfile(prev => ({...prev, monthly_income: parseInt(e.target.value)}))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="monthly_expenses">Monthly Core Expenses</Label>
                          <Input
                            id="monthly_expenses"
                            type="number"
                            value={financialProfile.monthly_expenses || ''}
                            onChange={(e) => setFinancialProfile(prev => ({...prev, monthly_expenses: parseInt(e.target.value)}))}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                        <Button onClick={() => setCurrentStep(3)}>Next: Assets</Button>
                      </div>
                    </div>
                  )}

                  {/* Quick Save Button */}
                  <div className="flex justify-end">
                    <Button onClick={() => setShowProfileForm(false)}>
                      Save Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Complete Your Financial Profile</h4>
                  <p className="text-gray-600 mb-4">
                    Get personalized best-practice recommendations based on your financial situation
                  </p>
                  <Button onClick={() => setShowProfileForm(true)}>
                    Start Profile Setup
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Analysis */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Net Worth</span>
                    <span className="text-lg font-bold">{formatCurrency(metrics.netWorth)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Savings Rate</span>
                    <span className="text-lg font-bold">{metrics.savingsRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">DTI Ratio</span>
                    <span className={`text-lg font-bold ${metrics.dtiRatio > 36 ? 'text-red-600' : 'text-green-600'}`}>
                      {metrics.dtiRatio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Emergency Fund Gap</span>
                    <span className="text-lg font-bold">
                      {formatCurrency(Math.max(0, metrics.emergencyFundTarget - (financialProfile.assets.bank_fd + financialProfile.assets.debt_funds_bonds)))}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Best-Practice Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Emergency Fund</p>
                      <p className="text-sm text-gray-600">Build 6-12× monthly expenses</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Insurance Coverage</p>
                      <p className="text-sm text-gray-600">Term life: 10-15× annual income</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Asset Allocation</p>
                      <p className="text-sm text-gray-600">Diversify across equity, debt, gold</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Regular Review</p>
                      <p className="text-sm text-gray-600">Annual portfolio rebalancing</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Educational Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">SEBI Investor Education</p>
                      <p className="text-sm text-gray-600">Official investor protection guidelines</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Calculator className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Tax Calculator Tools</p>
                      <p className="text-sm text-gray-600">Income tax and LTCG calculators</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium">Mutual Fund Research</p>
                      <p className="text-sm text-gray-600">AMFI and fund house resources</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Professional Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Users className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium">SEBI Registered Advisors</p>
                      <p className="text-sm text-gray-600">Find certified investment advisors</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-medium">CA Services</p>
                      <p className="text-sm text-gray-600">Chartered Accountant consultation</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <div className="flex-1">
                      <p className="font-medium">Insurance Advisors</p>
                      <p className="text-sm text-gray-600">Licensed insurance professionals</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialBestPracticesAI;
