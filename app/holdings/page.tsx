import { DashboardLayout } from "@/components/dashboard-layout"
import { HoldingsView } from "@/components/holdings-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

export default function HoldingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Holdings</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your current positions and performance</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Holdings</CardDescription>
              <CardTitle className="text-2xl">15</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across all positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Invested Value</CardDescription>
              <CardTitle className="text-2xl">₹8.5L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Total capital deployed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Current Value</CardDescription>
              <CardTitle className="text-2xl">₹9.8L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15.3% overall
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's P&L</CardDescription>
              <CardTitle className="text-2xl text-success">+₹12.4K</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +1.27%
              </p>
            </CardContent>
          </Card>
        </div>

        <HoldingsView />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Best performing stocks this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "IRCTC", return: "+28.5%" },
                  { name: "ZOMATO", return: "+24.2%" },
                  { name: "POLICYBZR", return: "+19.8%" },
                ].map((stock) => (
                  <div key={stock.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stock.name}</span>
                    <span className="text-sm text-success flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stock.return}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Underperformers</CardTitle>
              <CardDescription>Stocks to watch or rebalance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "PAYTM", return: "-8.2%" },
                  { name: "NYKAA", return: "-5.4%" },
                  { name: "CARTRADE", return: "-3.1%" },
                ].map((stock) => (
                  <div key={stock.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stock.name}</span>
                    <span className="text-sm text-destructive flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {stock.return}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
