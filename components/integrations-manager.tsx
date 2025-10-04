"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  XCircle,
  Settings,
  TrendingUp,
  Newspaper,
  BarChart3,
  Briefcase,
  Zap,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"

interface Integration {
  id: string
  name: string
  description: string
  category: "broker" | "research" | "advisory" | "data"
  icon: React.ReactNode
  status: "connected" | "disconnected" | "error"
  features: string[]
  isPremium: boolean
  webhookUrl?: string
  apiKey?: string
  lastSync?: string
}

const integrations: Integration[] = [
  {
    id: "zerodha",
    name: "Zerodha Kite",
    description: "Execute trades and sync portfolio positions",
    category: "broker",
    icon: <TrendingUp className="h-5 w-5" />,
    status: "connected",
    features: ["Order execution", "Portfolio sync", "Real-time positions", "Margin data"],
    isPremium: false,
    lastSync: "2 minutes ago",
  },
  {
    id: "liquide",
    name: "Liquide",
    description: "Small-cap research and momentum signals",
    category: "research",
    icon: <Newspaper className="h-5 w-5" />,
    status: "connected",
    features: ["Research reports", "Price targets", "Event tracking", "Momentum alerts"],
    isPremium: true,
    lastSync: "5 minutes ago",
  },
  {
    id: "univest",
    name: "Univest",
    description: "AI-powered stock research and recommendations",
    category: "research",
    icon: <BarChart3 className="h-5 w-5" />,
    status: "connected",
    features: ["AI analysis", "Sector insights", "Earnings coverage", "Technical signals"],
    isPremium: true,
    lastSync: "10 minutes ago",
  },
  {
    id: "stockedge",
    name: "StockEdge",
    description: "Technical analysis and market scans",
    category: "research",
    icon: <BarChart3 className="h-5 w-5" />,
    status: "connected",
    features: ["Technical scans", "Chart patterns", "Insider trading", "Bulk deals"],
    isPremium: false,
    lastSync: "15 minutes ago",
  },
  {
    id: "smallcase",
    name: "Smallcase",
    description: "Thematic portfolios and model strategies",
    category: "advisory",
    icon: <Briefcase className="h-5 w-5" />,
    status: "disconnected",
    features: ["Thematic baskets", "Rebalancing alerts", "Performance tracking"],
    isPremium: false,
  },
  {
    id: "tijori",
    name: "Tijori Finance",
    description: "Free research and stock analysis",
    category: "advisory",
    icon: <Newspaper className="h-5 w-5" />,
    status: "disconnected",
    features: ["Free reports", "Fundamental analysis", "Valuation metrics"],
    isPremium: false,
  },
  {
    id: "screener",
    name: "Screener.in",
    description: "Fundamental data and screening",
    category: "data",
    icon: <BarChart3 className="h-5 w-5" />,
    status: "disconnected",
    features: ["Financial data", "Custom screens", "Peer comparison"],
    isPremium: false,
  },
  {
    id: "tickertape",
    name: "Tickertape",
    description: "Stock screener and portfolio analytics",
    category: "data",
    icon: <BarChart3 className="h-5 w-5" />,
    status: "disconnected",
    features: ["Advanced screener", "Portfolio analytics", "Market insights"],
    isPremium: false,
  },
]

export function IntegrationsManager() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const totalCount = integrations.length

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{connectedCount}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Zap className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Live</p>
              <p className="text-xs text-muted-foreground">Auto-sync enabled</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Integrations List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="broker">Broker</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="advisory">Advisory</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConfigure={() => {
                setSelectedIntegration(integration)
                setIsConfiguring(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="broker" className="space-y-3">
          {integrations
            .filter((i) => i.category === "broker")
            .map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={() => {
                  setSelectedIntegration(integration)
                  setIsConfiguring(true)
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="research" className="space-y-3">
          {integrations
            .filter((i) => i.category === "research")
            .map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={() => {
                  setSelectedIntegration(integration)
                  setIsConfiguring(true)
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="advisory" className="space-y-3">
          {integrations
            .filter((i) => i.category === "advisory")
            .map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={() => {
                  setSelectedIntegration(integration)
                  setIsConfiguring(true)
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="data" className="space-y-3">
          {integrations
            .filter((i) => i.category === "data")
            .map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConfigure={() => {
                  setSelectedIntegration(integration)
                  setIsConfiguring(true)
                }}
              />
            ))}
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>{selectedIntegration?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedIntegration?.status === "disconnected" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Enter your API key" type="password" />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from {selectedIntegration.name} dashboard
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" placeholder="Enter your API secret" type="password" />
                </div>

                <Button className="w-full">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Connect Integration
                </Button>
              </>
            ) : (
              <>
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  {selectedIntegration?.lastSync && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Sync</span>
                      <span className="text-sm text-muted-foreground">{selectedIntegration.lastSync}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-sync</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features Enabled</Label>
                  <div className="space-y-2">
                    {selectedIntegration?.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm">{feature}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function IntegrationCard({
  integration,
  onConfigure,
}: {
  integration: Integration
  onConfigure: () => void
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            integration.status === "connected" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {integration.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold">{integration.name}</h3>
              {integration.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              )}
              {integration.status === "connected" && (
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              )}
              {integration.status === "error" && (
                <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {integration.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-transparent">
                {feature}
              </Badge>
            ))}
            {integration.features.length > 3 && (
              <Badge variant="outline" className="text-xs bg-transparent">
                +{integration.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Last Sync */}
          {integration.lastSync && <p className="text-xs text-muted-foreground">Last synced {integration.lastSync}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onConfigure}>
            <Settings className="h-4 w-4 mr-2" />
            {integration.status === "connected" ? "Configure" : "Connect"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
