// Free LLM Service for Financial Best-Practices AI
// This service integrates with free LLM models from OpenRouter and other providers

export interface LLMResponse {
  content: string;
  model: string;
  tokens_used: number;
  response_time_ms: number;
}

export interface FinancialContext {
  userProfile?: {
    age?: number;
    city?: string;
    dependents: number;
    monthly_income: number;
    monthly_expenses: number;
    assets: Record<string, number>;
    liabilities: Array<Record<string, any>>;
  };
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  currentQuery: string;
}

class FreeLLMService {
  private openRouterApiKey = 'sk-or-v1-your-api-key-here'; // Replace with actual key
  private baseUrl = 'https://openrouter.ai/api/v1';
  
  // Free models available on OpenRouter
  private freeModels = [
    'meta-llama/llama-3.2-3b-instruct:free',
    'microsoft/phi-3-mini-128k-instruct:free',
    'google/gemini-flash-1.5:free',
    'mistralai/mistral-7b-instruct:free',
    'meta-llama/llama-3.1-8b-instruct:free'
  ];

  // Financial best-practices prompt template
  private getSystemPrompt(): string {
    return `You are a Financial Best-Practices AI Assistant for Indian users. Your role is to provide educational guidance on personal finance management.

CRITICAL DISCLAIMERS (always include):
• This is best-practices education, NOT financial planning or personalized advice
• You are NOT a CA and NOT SEBI-registered; tax and investment rules can change
• Always encourage users to consult qualified professionals (CA/SEBI-RIA) before acting
• Highlight assumptions/risks and suggest verification with certified advisors

RESPONSE GUIDELINES:
1. Provide India-specific best-practices guidance
2. Use clear, educational language
3. Include relevant disclaimers
4. Suggest professional consultation when appropriate
5. Focus on general principles, not specific recommendations
6. Use bullet points and clear formatting for readability

TOPIC AREAS:
• Emergency fund planning (6-12× expenses)
• Debt management strategies
• Asset allocation principles
• Insurance planning (term life, health)
• Tax optimization (old vs new regime)
• Investment vehicles (MF, FD, equity, gold)
• Risk management
• Goal-based planning

Always end responses with a reminder to consult qualified professionals for personalized advice.`;
  }

  // Generate context-aware financial guidance
  async generateFinancialGuidance(context: FinancialContext): Promise<LLMResponse> {
    const systemPrompt = this.getSystemPrompt();
    
    // Build conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...context.conversationHistory.slice(-6), // Last 6 messages for context
      { role: 'user', content: context.currentQuery }
    ];

    // Add user profile context if available
    if (context.userProfile) {
      const profileContext = this.buildProfileContext(context.userProfile);
      messages.splice(1, 0, { role: 'system', content: profileContext });
    }

    return this.callOpenRouter(messages);
  }

  // Build user profile context for personalized guidance
  private buildProfileContext(profile: any): string {
    return `USER FINANCIAL PROFILE CONTEXT:
Age: ${profile.age || 'Not specified'}
City: ${profile.city || 'Not specified'}
Dependents: ${profile.dependents || 0}
Monthly Income: ₹${profile.monthly_income || 0}
Monthly Expenses: ₹${profile.monthly_expenses || 0}
Assets: ${JSON.stringify(profile.assets || {})}
Liabilities: ${JSON.stringify(profile.liabilities || [])}

Use this context to provide more relevant guidance while maintaining that this is educational best-practices only.`;
  }

  // Call OpenRouter API with free models
  private async callOpenRouter(messages: any[]): Promise<LLMResponse> {
    const startTime = Date.now();
    
    try {
      // Try free models in order of preference
      for (const model of this.freeModels) {
        try {
          const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.openRouterApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://finsight-app.com',
              'X-Title': 'FinSight Financial AI'
            },
            body: JSON.stringify({
              model: model,
              messages: messages,
              max_tokens: 1000,
              temperature: 0.7,
              top_p: 0.9,
              frequency_penalty: 0.1,
              presence_penalty: 0.1
            })
          });

          if (response.ok) {
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            
            return {
              content: data.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
              model: model,
              tokens_used: data.usage?.total_tokens || 0,
              response_time_ms: responseTime
            };
          }
        } catch (error) {
          console.warn(`Model ${model} failed, trying next:`, error);
          continue;
        }
      }
      
      // If all free models fail, return fallback response
      return this.getFallbackResponse(context.currentQuery);
      
    } catch (error) {
      console.error('LLM Service Error:', error);
      return this.getFallbackResponse(context.currentQuery);
    }
  }

  // Fallback response when all LLM services fail
  private getFallbackResponse(query: string): LLMResponse {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('emergency fund')) {
      return {
        content: `**Emergency Fund Best-Practices:**

**Target:** 6-12× monthly expenses
• **Minimum:** 6 months of core expenses
• **Recommended:** 12 months for stability
• **Storage:** High-yield savings account or liquid funds

**Building Strategy:**
• Start with 1 month, build gradually
• Automate monthly transfers
• Don't invest emergency fund in volatile assets

**⚠️ DISCLAIMER:** This is educational guidance only. Consult a financial advisor for personalized advice.`,
        model: 'fallback',
        tokens_used: 0,
        response_time_ms: 100
      };
    }

    if (lowerQuery.includes('debt') || lowerQuery.includes('loan')) {
      return {
        content: `**Debt Management Best-Practices:**

**Priority Order:**
1. **High-interest debt** (credit cards, personal loans)
2. **Medium-interest debt** (home loans, car loans)
3. **Low-interest debt** (education loans)

**Strategies:**
• **Avalanche Method:** Pay highest interest first
• **Snowball Method:** Pay smallest balance first
• **DTI Ratio:** Keep below 36%

**⚠️ DISCLAIMER:** This is educational guidance only. Consult a financial advisor for personalized debt management strategies.`,
        model: 'fallback',
        tokens_used: 0,
        response_time_ms: 100
      };
    }

    if (lowerQuery.includes('investment') || lowerQuery.includes('asset allocation')) {
      return {
        content: `**Asset Allocation Best-Practices:**

**Risk-Based Allocation:**
• **Conservative:** Equity 20-35% | Debt 55-70% | Gold 5-10%
• **Balanced:** Equity 45-60% | Debt 30-45% | Gold 5-10%
• **Growth:** Equity 70-85% | Debt 10-25% | Gold 5-10%

**Investment Vehicles:**
• **Equity:** Index funds, ETFs, direct stocks
• **Debt:** FD, liquid funds, debt mutual funds
• **Gold:** Gold ETF, SGB, physical gold

**⚠️ DISCLAIMER:** This is educational guidance only. Consult a SEBI-registered investment advisor for personalized portfolio recommendations.`,
        model: 'fallback',
        tokens_used: 0,
        response_time_ms: 100
      };
    }

    // Default response
    return {
      content: `**Financial Best-Practices Guidance:**

Based on your query about "${query}", here are some general principles:

**Key Areas to Consider:**
• Emergency fund (6-12× expenses)
• Insurance coverage (term life, health)
• Debt management (DTI < 36%)
• Asset allocation (diversify across equity, debt, gold)
• Regular review and rebalancing

**Next Steps:**
1. Assess your current financial position
2. Set clear financial goals
3. Create a budget and savings plan
4. Consult qualified professionals for personalized advice

**⚠️ DISCLAIMER:** This is educational guidance only. Not financial advice. Always consult a CA/SEBI-registered advisor before making financial decisions.`,
      model: 'fallback',
      tokens_used: 0,
      response_time_ms: 100
    };
  }

  // Quick response for common queries
  getQuickResponse(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('insurance')) {
      return `**Insurance Best-Practices:**

• **Term Life:** 10-15× annual income
• **Health Cover:** ₹10-20L+ (top-up if metro)
• **Critical Illness:** Additional coverage
• **Review annually**

⚠️ Consult insurance advisors for personalized recommendations.`;
    }

    if (lowerQuery.includes('tax')) {
      return `**Tax Optimization Best-Practices:**

• **Compare regimes:** Old vs New tax regime
• **Section 80C:** ₹1.5L deduction options
• **ELSS funds:** Tax-saving mutual funds
• **HRA/Home loan:** Maximize deductions

⚠️ Consult a CA for tax planning strategies.`;
    }

    return `I understand you're asking about "${query}". Please provide more specific details about your situation for better guidance.

**Quick Topics I can help with:**
• Emergency fund planning
• Debt management strategies  
• Asset allocation principles
• Insurance planning
• Tax optimization

⚠️ This is educational guidance only. Consult qualified professionals for personalized advice.`;
  }

  // Get available free models
  getAvailableModels(): string[] {
    return this.freeModels;
  }

  // Health check for LLM service
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.openRouterApiKey}`,
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const freeLLMService = new FreeLLMService();
export default freeLLMService;
