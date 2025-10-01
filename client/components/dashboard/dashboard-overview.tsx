"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Activity } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Portfolio Value",
      value: "₹2,45,000",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "Total investment value",
    },
    {
      title: "Active Partnerships",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: Users,
      description: "Current partnerships",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Target,
      description: "IPO allotment success",
    },
    {
      title: "Trust Score",
      value: "96",
      change: "+1",
      changeType: "positive",
      icon: Activity,
      description: "Community trust rating",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <stat.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={stat.changeType === "positive" ? "default" : "destructive"}
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
