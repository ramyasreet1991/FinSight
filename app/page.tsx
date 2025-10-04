import { DashboardLayout } from "@/components/dashboard-layout"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { RebalancePreview } from "@/components/rebalance-preview"
import { HoldingsView } from "@/components/holdings-view"
import { ResearchFeed } from "@/components/research-feed"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PortfolioOverview />
        <div className="grid gap-6 lg:grid-cols-2">
          <RebalancePreview />
          <ResearchFeed />
        </div>
        <HoldingsView />
      </div>
    </DashboardLayout>
  )
}
