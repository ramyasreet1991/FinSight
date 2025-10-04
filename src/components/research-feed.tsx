import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sparkles, ExternalLink, TrendingUp, Clock, Filter } from "lucide-react"

const researchSignals = [
  {
    source: "Liquide",
    symbol: "KALYANKJIL",
    title: "Strong breakout above resistance",
    timestamp: "2 hours ago",
    sentiment: "bullish",
    inMomentum: true,
  },
  {
    source: "Univest",
    symbol: "TIINDIA",
    title: "Sector rotation favoring capital goods",
    timestamp: "4 hours ago",
    sentiment: "bullish",
    inMomentum: true,
  },
  {
    source: "StockEdge",
    symbol: "APLAPOLLO",
    title: "Insider buying detected",
    timestamp: "6 hours ago",
    sentiment: "neutral",
    inMomentum: true,
  },
  {
    source: "Telegram",
    symbol: "DEEPAKFERT",
    title: "Technical setup forming",
    timestamp: "8 hours ago",
    sentiment: "bullish",
    inMomentum: false,
  },
]

export function ResearchFeed() {
  return (
    <Card className="flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Research Signals</h3>
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {researchSignals.map((signal, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {signal.source}
                      </Badge>
                      <span className="font-mono font-semibold text-sm">{signal.symbol}</span>
                      {signal.inMomentum && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          In Strategy
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mt-1 text-foreground">{signal.title}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{signal.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full bg-transparent" size="sm">
          View All Signals
        </Button>
      </div>
    </Card>
  )
}
