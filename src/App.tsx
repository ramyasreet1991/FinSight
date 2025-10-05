import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Portfolio } from './pages/Portfolio'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'
import { TradingDashboard } from './components/TradingDashboard'
import { BacktestEngine } from './components/BacktestEngine'
import FeedIntegrationSimple from './components/FeedIntegrationSimple'
import NiftyMomentumPortfolioSimple from './components/NiftyMomentumPortfolioSimple'
import NewsFeed from './components/NewsFeed'
import TijoriAnalysis from './components/TijoriAnalysis'
import AdvancedAnalytics from './components/AdvancedAnalytics'
import PortfolioManagerSimple from './components/PortfolioManagerSimple'
import IntegrationAnalysisFixed from './components/IntegrationAnalysisFixed'
import EMICalculator from './components/EMICalculator'
import IncomeIdeasFixed from './components/IncomeIdeasFixed'
import TradingNewsRadar from './components/TradingNewsRadar'
import MultibaggerAnalysis from './components/MultibaggerAnalysis'
import LiveMultibaggerAnalysis from './components/LiveMultibaggerAnalysis'
import FinancialBestPracticesAI from './components/FinancialBestPracticesAI'
import NSEDataAnalysis from './components/NSEDataAnalysis'
import DisclaimerPageSimple from './pages/DisclaimerPageSimple'
import { Layout } from './components/Layout'
import DisclaimerBanner from './components/DisclaimerBanner'

function App() {
  return (
    <Router>
      <Layout>
        <DisclaimerBanner />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trading" element={<TradingDashboard />} />
          <Route path="/backtest" element={<BacktestEngine />} />
          <Route path="/feeds" element={<FeedIntegrationSimple />} />
          <Route path="/nifty-momentum" element={<NiftyMomentumPortfolioSimple />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/tijori" element={<TijoriAnalysis />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
          <Route path="/portfolio-manager" element={<PortfolioManagerSimple />} />
          <Route path="/integration-analysis" element={<IntegrationAnalysisFixed />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/income-ideas" element={<IncomeIdeasFixed />} />
          <Route path="/trading-news-radar" element={<TradingNewsRadar />} />
          <Route path="/multibagger-analysis" element={<MultibaggerAnalysis />} />
                 <Route path="/live-multibagger" element={<LiveMultibaggerAnalysis />} />
                 <Route path="/financial-ai" element={<FinancialBestPracticesAI />} />
                 <Route path="/nse-analysis" element={<NSEDataAnalysis />} />
                 <Route path="/disclaimer" element={<DisclaimerPageSimple />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
