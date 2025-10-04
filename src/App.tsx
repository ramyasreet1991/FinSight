import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Portfolio } from './pages/Portfolio'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'
import { TradingDashboard } from './components/TradingDashboard'
import { BacktestEngine } from './components/BacktestEngine'
import { FeedIntegration } from './components/FeedIntegration'
import { NiftyMomentumPortfolio } from './components/NiftyMomentumPortfolio'
import DisclaimerPage from './pages/DisclaimerPage'
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
          <Route path="/feeds" element={<FeedIntegration />} />
          <Route path="/nifty-momentum" element={<NiftyMomentumPortfolio />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
