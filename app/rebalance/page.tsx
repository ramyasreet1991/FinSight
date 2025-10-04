import { DashboardLayout } from "@/components/dashboard-layout"
import { RebalancePreview } from "@/components/rebalance-preview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertCircle, Calendar } from "lucide-react"

export default function RebalancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Rebalance Portfolio</h2>
            <p className="text-sm text-muted-foreground mt-1">Review and execute momentum-based rebalancing</p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Rebalance
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Next Rebalance</CardDescription>
              <CardTitle className="text-2xl">5 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Scheduled for Monday, 9:15 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Candidate Stocks</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Based on momentum rank</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Risk Score</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span>Medium</span>
                <AlertCircle className="h-5 w-5 text-warning" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">2 stocks with event risk</p>
            </CardContent>
          </Card>
        </div>

        <RebalancePreview />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rebalance Strategy
            </CardTitle>
            <CardDescription>How momentum-based rebalancing works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">1. Momentum Ranking</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stocks are ranked based on 3-month and 6-month price momentum, with higher ranks indicating stronger
                performance trends.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">2. Research Integration</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Signals from Liquide, Univest, StockEdge, and other platforms are aggregated to provide additional
                conviction.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">3. Risk Management</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Event risk indicators flag stocks with upcoming results, corporate actions, or regulatory events that
                may impact performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
