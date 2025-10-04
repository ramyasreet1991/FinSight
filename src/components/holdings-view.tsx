import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { TrendingUp, TrendingDown, ExternalLink, MoreVertical } from "lucide-react"

const holdings = [
  {
    symbol: "KALYANKJIL",
    name: "Kalyan Jewellers",
    quantity: 200,
    avgPrice: 445.5,
    ltp: 485.2,
    pnl: 7940,
    pnlPercent: 8.91,
    target: 606.5,
    stop: 437.68,
  },
  {
    symbol: "TIINDIA",
    name: "Tube Investments",
    quantity: 30,
    avgPrice: 3280.0,
    ltp: 3420.5,
    pnl: 4215,
    pnlPercent: 4.28,
    target: 4275.63,
    stop: 3078.45,
  },
  {
    symbol: "APLAPOLLO",
    name: "APL Apollo Tubes",
    quantity: 60,
    avgPrice: 1520.0,
    ltp: 1580.3,
    pnl: 3618,
    pnlPercent: 3.97,
    target: 1975.38,
    stop: 1422.27,
  },
]

export function HoldingsView() {
  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Current Holdings</h3>
          <Badge variant="outline" className="font-mono">
            {holdings.length} positions
          </Badge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Stock</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">Qty</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">Avg Price</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">LTP</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">P&L</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">Target</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">Stop</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.symbol} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="p-3">
                  <div>
                    <div className="font-semibold text-sm">{holding.symbol}</div>
                    <div className="text-xs text-muted-foreground">{holding.name}</div>
                  </div>
                </td>
                <td className="p-3 text-right font-mono text-sm">{holding.quantity}</td>
                <td className="p-3 text-right font-mono text-sm">₹{holding.avgPrice.toFixed(2)}</td>
                <td className="p-3 text-right font-mono text-sm font-semibold">₹{holding.ltp.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span
                      className={`font-mono text-sm font-semibold ${
                        holding.pnl >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {holding.pnl >= 0 ? "+" : ""}₹{holding.pnl.toLocaleString("en-IN")}
                    </span>
                    <div className="flex items-center gap-1">
                      {holding.pnl >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className={`text-xs font-medium ${holding.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                        {holding.pnlPercent >= 0 ? "+" : ""}
                        {holding.pnlPercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-right font-mono text-sm text-success">₹{holding.target.toFixed(2)}</td>
                <td className="p-3 text-right font-mono text-sm text-destructive">₹{holding.stop.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Total P&L</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="font-mono font-bold text-success">+₹15,773 (+5.72%)</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
