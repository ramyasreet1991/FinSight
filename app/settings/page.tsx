import { DashboardLayout } from "@/components/dashboard-layout"
import { IntegrationsManager } from "@/components/integrations-manager"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your integrations and platform connections</p>
        </div>
        <IntegrationsManager />
      </div>
    </DashboardLayout>
  )
}
