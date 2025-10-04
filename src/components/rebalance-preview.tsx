import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ExternalLink, AlertTriangle, CheckCircle2, Calendar, ArrowRight } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

const candidates = [
  {
    symbol: "KALYANKJIL",
    name: "Kalyan Jewellers",
    rank: 1,
    momentum: 42.5,
    price: 485.2,
    target: 606.5,
    stop: 437.68,
    badges: ["52W High", "Above MA200", "Bulk Deal"],
    eventRisk: null,
  },
  {
    symbol: "TIINDIA",
    name: "Tube Investments",
    rank: 2,
    momentum: 38.2,
    price: 3420.5,
    target: 4275.63,
    stop: 3078.45,
    badges: ["Above MA200", "Insider Buy"],
    eventRisk: null,
  },
  {
    symbol: "APLAPOLLO",
    name: "APL Apollo Tubes",
    rank: 3,
    momentum: 35.8,
    price: 1580.3,
    target: 1975.38,
    stop: 1422.27,
    badges: ["52W High", "Above MA200"],
    eventRisk: "Results Today",
  },
]

export function RebalancePreview() {
  return (
    <Card className="flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Next Rebalance</h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Due in 5 days</p>
            </div>
          </div>
          <Button size="sm">
            Preview Full List
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {candidates.map((stock) => (
            <div
              key={stock.symbol}
              className="p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        #{stock.rank}
                      </Badge>
                      <h4 className="font-semibold text-sm truncate">{stock.symbol}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{stock.name}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {stock.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs px-2 py-0 h-5">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-success" />
                      {badge}
                    </Badge>
                  ))}
                  {stock.eventRisk && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0 h-5 bg-warning/10 text-warning border-warning/20"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {stock.eventRisk}
                    </Badge>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-mono font-semibold">₹{stock.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-mono font-semibold text-success">₹{stock.target}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stop</p>
                    <p className="font-mono font-semibold text-destructive">₹{stock.stop}</p>
                  </div>
                </div>

                {/* Momentum Score */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${stock.momentum}%` }} />
                  </div>
                  <span className="text-xs font-mono font-semibold text-primary">{stock.momentum}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
