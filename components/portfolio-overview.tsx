"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const portfolioData = [
  { date: "Jan", value: 1000000 },
  { date: "Feb", value: 1050000 },
  { date: "Mar", value: 1020000 },
  { date: "Apr", value: 1080000 },
  { date: "May", value: 1150000 },
  { date: "Jun", value: 1180000 },
]

const stats = [
  {
    label: "Portfolio Value",
    value: "₹11,80,450",
    change: "+18.05%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Today's P&L",
    value: "₹12,340",
    change: "+1.05%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Active Positions",
    value: "18",
    change: "2 near target",
    trend: "neutral",
    icon: Target,
  },
  {
    label: "Risk Level",
    value: "Moderate",
    change: "65% utilized",
    trend: "neutral",
    icon: AlertCircle,
  },
]

export function PortfolioOverview() {
  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold font-mono tracking-tight">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-success"
                        : stat.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Portfolio Performance</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              +18.05% YTD
            </Badge>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Value"]}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  )
}
