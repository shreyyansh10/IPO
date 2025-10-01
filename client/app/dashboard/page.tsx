import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <PortfolioSummary />
                <RecentActivity />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
