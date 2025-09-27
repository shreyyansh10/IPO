"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Brain, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react"

interface IPO {
  id: number
  name: string
  sector: string
  priceRange: string
  openDate: string
  closeDate: string
  listingDate: string
  status: "upcoming" | "live" | "closed" | "listed"
  subscriptionRatio: number | null
  gmp: string
  lotSize: number
  minInvestment: string
  marketCap: string
  aiPrediction: {
    openingPrice: string
    confidence: number
    allotmentChance: number
  }
  description: string
  logo: string
  isBookmarked: boolean
  listingPrice?: string
  currentPrice?: string
  listingGain?: string
}

interface IPOCardProps {
  ipo: IPO
}

export function IPOCard({ ipo }: IPOCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(ipo.isBookmarked)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      case "live":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
      case "closed":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
      case "listed":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={ipo.logo || "/placeholder.svg"} alt={ipo.name} />
                <AvatarFallback>{ipo.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{ipo.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ipo.sector}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${getStatusColor(ipo.status)}`}>
                {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsBookmarked(!isBookmarked)} className="p-1 h-auto">
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-blue-600" />
                ) : (
                  <Bookmark className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Price and Investment Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-500 dark:text-slate-400">Price Range</div>
              <div className="font-semibold text-slate-900 dark:text-white">{ipo.priceRange}</div>
            </div>
            <div>
              <div className="text-slate-500 dark:text-slate-400">Min Investment</div>
              <div className="font-semibold text-slate-900 dark:text-white">{ipo.minInvestment}</div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Calendar className="w-3 h-3" />
              <span>Open: {formatDate(ipo.openDate)}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <span>Close: {formatDate(ipo.closeDate)}</span>
            </div>
          </div>

          {/* Subscription ratio for live/closed IPOs */}
          {ipo.subscriptionRatio && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Subscription</span>
                <span className="font-semibold text-slate-900 dark:text-white">{ipo.subscriptionRatio}x</span>
              </div>
              <Progress value={Math.min(ipo.subscriptionRatio * 20, 100)} className="h-2" />
            </div>
          )}

          {/* AI Predictions */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Brain className="w-3 h-3 text-purple-600" />
              AI Predictions
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-500 dark:text-slate-400">Opening Price</div>
                <div className="font-semibold text-slate-900 dark:text-white">{ipo.aiPrediction.openingPrice}</div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400">Confidence</div>
                <div className="font-semibold text-emerald-600">{ipo.aiPrediction.confidence}%</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Allotment Chance</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {ipo.aiPrediction.allotmentChance}%
                </span>
              </div>
              <Progress value={ipo.aiPrediction.allotmentChance} className="h-1.5" />
            </div>
          </div>

          {/* GMP and Market Cap */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-500 dark:text-slate-400">GMP</div>
              <div className="font-semibold text-emerald-600">{ipo.gmp}</div>
            </div>
            <div>
              <div className="text-slate-500 dark:text-slate-400">Market Cap</div>
              <div className="font-semibold text-slate-900 dark:text-white">{ipo.marketCap}</div>
            </div>
          </div>

          {/* Listed IPO performance */}
          {ipo.status === "listed" && ipo.listingGain && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Listing Performance</span>
                <span className="font-semibold text-emerald-600">{ipo.listingGain}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Listed at {ipo.listingPrice} • Current: {ipo.currentPrice}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{ipo.description}</p>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={ipo.status === "closed" || ipo.status === "listed"}
            >
              {ipo.status === "upcoming"
                ? "Set Reminder"
                : ipo.status === "live"
                  ? "Apply Now"
                  : ipo.status === "closed"
                    ? "Closed"
                    : "View Details"}
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
