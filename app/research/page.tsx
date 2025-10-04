import { DashboardLayout } from "@/components/dashboard-layout"
import { ResearchFeed } from "@/components/research-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Bell, TrendingUp, Newspaper, FileText } from "lucide-react"

export default function ResearchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Research Hub</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Aggregated insights from Liquide, Univest, StockEdge, and more
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Signals</CardDescription>
              <CardTitle className="text-2xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">From all platforms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Buy Recommendations</CardDescription>
              <CardTitle className="text-2xl text-success">18</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">High conviction calls</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Sell/Exit Signals</CardDescription>
              <CardTitle className="text-2xl text-destructive">6</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Risk management alerts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Signals</TabsTrigger>
            <TabsTrigger value="momentum">Momentum</TabsTrigger>
            <TabsTrigger value="news">News & Filings</TabsTrigger>
            <TabsTrigger value="research">Third-Party</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ResearchFeed />
          </TabsContent>

          <TabsContent value="momentum" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Momentum Signals
                </CardTitle>
                <CardDescription>Stocks showing strong price momentum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "IRCTC", rank: 1, momentum: "+42.5%", period: "3M" },
                    { name: "ZOMATO", rank: 2, momentum: "+38.2%", period: "3M" },
                    { name: "POLICYBZR", rank: 3, momentum: "+35.8%", period: "3M" },
                  ].map((stock) => (
                    <div key={stock.name} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {stock.rank}
                        </div>
                        <div>
                          <p className="font-medium">{stock.name}</p>
                          <p className="text-xs text-muted-foreground">{stock.period} momentum</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-success">{stock.momentum}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Latest News & Filings
                </CardTitle>
                <CardDescription>Corporate actions and regulatory updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      stock: "IRCTC",
                      title: "Q3 Results Announced",
                      time: "2 hours ago",
                      type: "Results",
                    },
                    {
                      stock: "ZOMATO",
                      title: "Board Meeting Scheduled",
                      time: "5 hours ago",
                      type: "Corporate Action",
                    },
                    {
                      stock: "POLICYBZR",
                      title: "Insider Trading Disclosure",
                      time: "1 day ago",
                      type: "Filing",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{item.stock}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <ResearchFeed />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
