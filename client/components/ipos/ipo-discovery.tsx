"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { IPOFilters } from "./ipo-filters"
import { IPOCard } from "./ipo-card"
import { IPOListView } from "./ipo-list-view"
import { Search, Grid, List, Filter, SortAsc } from "lucide-react"

export function IPODiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("opening-date")

  // Mock IPO data
  const ipos = [
    {
      id: 1,
      name: "TechCorp Solutions",
      sector: "Technology",
      priceRange: "₹450-500",
      openDate: "2025-01-15",
      closeDate: "2025-01-17",
      listingDate: "2025-01-22",
      status: "upcoming",
      subscriptionRatio: null,
      gmp: "₹75",
      lotSize: 30,
      minInvestment: "₹15,000",
      marketCap: "₹2,400 Cr",
      aiPrediction: {
        openingPrice: "₹520-540",
        confidence: 85,
        allotmentChance: 72,
      },
      description: "Leading software solutions provider with strong growth prospects",
      logo: "/placeholder.svg?key=techcorp",
      isBookmarked: false,
    },
    {
      id: 2,
      name: "GreenEnergy Ltd",
      sector: "Renewable Energy",
      priceRange: "₹280-320",
      openDate: "2025-01-10",
      closeDate: "2025-01-12",
      listingDate: "2025-01-17",
      status: "live",
      subscriptionRatio: 2.4,
      gmp: "₹45",
      lotSize: 50,
      minInvestment: "₹16,000",
      marketCap: "₹1,800 Cr",
      aiPrediction: {
        openingPrice: "₹340-360",
        confidence: 78,
        allotmentChance: 45,
      },
      description: "Solar and wind energy solutions with government backing",
      logo: "/placeholder.svg?key=greenenergy",
      isBookmarked: true,
    },
    {
      id: 3,
      name: "FinTech Innovations",
      sector: "Financial Services",
      priceRange: "₹600-650",
      openDate: "2025-01-08",
      closeDate: "2025-01-10",
      listingDate: "2025-01-15",
      status: "closed",
      subscriptionRatio: 8.7,
      gmp: "₹120",
      lotSize: 25,
      minInvestment: "₹16,250",
      marketCap: "₹3,200 Cr",
      aiPrediction: {
        openingPrice: "₹750-780",
        confidence: 92,
        allotmentChance: 12,
      },
      description: "Digital banking and payment solutions platform",
      logo: "/placeholder.svg?key=fintech",
      isBookmarked: false,
    },
    {
      id: 4,
      name: "HealthTech Systems",
      sector: "Healthcare",
      priceRange: "₹380-420",
      openDate: "2025-01-20",
      closeDate: "2025-01-22",
      listingDate: "2025-01-27",
      status: "upcoming",
      subscriptionRatio: null,
      gmp: "₹60",
      lotSize: 40,
      minInvestment: "₹16,800",
      marketCap: "₹2,100 Cr",
      aiPrediction: {
        openingPrice: "₹460-480",
        confidence: 81,
        allotmentChance: 68,
      },
      description: "AI-powered healthcare diagnostics and telemedicine",
      logo: "/placeholder.svg?key=healthtech",
      isBookmarked: true,
    },
    {
      id: 5,
      name: "EduTech Platform",
      sector: "Education",
      priceRange: "₹220-250",
      openDate: "2025-01-25",
      closeDate: "2025-01-27",
      listingDate: "2025-02-01",
      status: "upcoming",
      subscriptionRatio: null,
      gmp: "₹35",
      lotSize: 60,
      minInvestment: "₹15,000",
      marketCap: "₹1,500 Cr",
      aiPrediction: {
        openingPrice: "₹270-290",
        confidence: 76,
        allotmentChance: 85,
      },
      description: "Online learning platform with personalized AI tutoring",
      logo: "/placeholder.svg?key=edutech",
      isBookmarked: false,
    },
    {
      id: 6,
      name: "LogiTech Supply",
      sector: "Logistics",
      priceRange: "₹350-400",
      openDate: "2025-01-05",
      closeDate: "2025-01-07",
      listingDate: "2025-01-12",
      status: "listed",
      subscriptionRatio: 5.2,
      gmp: "₹80",
      lotSize: 35,
      minInvestment: "₹14,000",
      marketCap: "₹1,900 Cr",
      aiPrediction: {
        openingPrice: "₹420-440",
        confidence: 88,
        allotmentChance: 25,
      },
      description: "Last-mile delivery and supply chain management",
      logo: "/placeholder.svg?key=logitech",
      isBookmarked: false,
      listingPrice: "₹435",
      currentPrice: "₹465",
      listingGain: "+16.25%",
    },
  ]

  const filteredIPOs = ipos.filter(
    (ipo) =>
      ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.sector.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const statusCounts = {
    all: ipos.length,
    upcoming: ipos.filter((ipo) => ipo.status === "upcoming").length,
    live: ipos.filter((ipo) => ipo.status === "live").length,
    closed: ipos.filter((ipo) => ipo.status === "closed").length,
    listed: ipos.filter((ipo) => ipo.status === "listed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Discover IPOs</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find and analyze upcoming IPO opportunities with AI-powered insights
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="p-4 text-center hover:shadow-md transition-shadow duration-200">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{count}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
              {status === "all" ? "Total IPOs" : `${status} IPOs`}
            </div>
          </Card>
        ))}
      </div>

      {/* Search and filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search IPOs by name or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <SortAsc className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
          >
            <IPOFilters />
          </motion.div>
        )}
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredIPOs.length} of {ipos.length} IPOs
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            AI Predictions Enabled
          </Badge>
        </div>
      </div>

      {/* IPO Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIPOs.map((ipo, index) => (
            <motion.div
              key={ipo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <IPOCard ipo={ipo} />
            </motion.div>
          ))}
        </div>
      ) : (
        <IPOListView ipos={filteredIPOs} />
      )}
    </div>
  )
}
