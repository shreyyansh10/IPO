"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function IPOFilters() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [investmentRange, setInvestmentRange] = useState([10000, 100000])
  const [hasAIPredictions, setHasAIPredictions] = useState(false)
  const [highGMP, setHighGMP] = useState(false)
  const [oversubscribed, setOversubscribed] = useState(false)

  const sectors = [
    "Technology",
    "Healthcare",
    "Financial Services",
    "Renewable Energy",
    "Education",
    "Logistics",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Telecommunications",
  ]

  const statuses = [
    { value: "upcoming", label: "Upcoming" },
    { value: "live", label: "Live" },
    { value: "closed", label: "Closed" },
    { value: "listed", label: "Listed" },
  ]

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]))
  }

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const clearAllFilters = () => {
    setSelectedSectors([])
    setSelectedStatuses([])
    setPriceRange([0, 1000])
    setInvestmentRange([10000, 100000])
    setHasAIPredictions(false)
    setHighGMP(false)
    setOversubscribed(false)
  }

  const activeFiltersCount =
    selectedSectors.length +
    selectedStatuses.length +
    (hasAIPredictions ? 1 : 0) +
    (highGMP ? 1 : 0) +
    (oversubscribed ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Filter header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-900 dark:text-white">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sector filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sector</Label>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSectors.includes(sector) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSector(sector)}
                className="text-xs h-7"
              >
                {sector}
                {selectedSectors.includes(sector) && <X className="w-3 h-3 ml-1" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Status filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</Label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox
                  id={status.value}
                  checked={selectedStatuses.includes(status.value)}
                  onCheckedChange={() => toggleStatus(status.value)}
                />
                <Label htmlFor={status.value} className="text-sm text-slate-600 dark:text-slate-400">
                  {status.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price range filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price Range (₹)</Label>
          <div className="space-y-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={50} className="w-full" />
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Investment range filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Min Investment (₹)</Label>
          <div className="space-y-2">
            <Slider
              value={investmentRange}
              onValueChange={setInvestmentRange}
              max={100000}
              min={10000}
              step={5000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>₹{investmentRange[0].toLocaleString()}</span>
              <span>₹{investmentRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced filters */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ai-predictions"
              checked={hasAIPredictions}
              onCheckedChange={() => setHasAIPredictions(!hasAIPredictions)}
            />
            <Label htmlFor="ai-predictions" className="text-sm text-slate-600 dark:text-slate-400">
              Has AI Predictions
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="high-gmp" checked={highGMP} onCheckedChange={() => setHighGMP(!highGMP)} />
            <Label htmlFor="high-gmp" className="text-sm text-slate-600 dark:text-slate-400">
              High GMP (&gt;₹50)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="oversubscribed"
              checked={oversubscribed}
              onCheckedChange={() => setOversubscribed(!oversubscribed)}
            />
            <Label htmlFor="oversubscribed" className="text-sm text-slate-600 dark:text-slate-400">
              Oversubscribed (&gt;2x)
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
