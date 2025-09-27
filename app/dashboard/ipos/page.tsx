import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { IPODiscovery } from "@/components/ipos/ipo-discovery"

export default function IPOsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <IPODiscovery />
          </div>
        </main>
      </div>
    </div>
  )
}
