"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, Shield, MessageSquare, Search, Plus, IndianRupee, IdCard, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Partner {
  id: string
  name: string
  avatar: string
  investmentRange: string
  sectors: string[]
  experience: string
  successRate: number
  trustScore: number
  location: string
  description: string
  activePartnerships: number
}

interface Partnership {
  id: string
  name: string
  description: string
  targetAmount: string
  currentAmount: string
  partners: Partner[]
  status: "forming" | "active" | "completed"
  sector: string
  riskLevel: "low" | "medium" | "high"
  expectedReturns: string
}

interface PartnershipRequest {
  id: string
  from: string
  type: "investment" | "pan"
  ipoName: string
  totalNeeded?: number
  requestedFromYou?: number
  panOwner?: "me" | "partner"
  message?: string
  status: "pending" | "accepted" | "declined"
  steps?: Array<{ label: string; completed: boolean }>
}

export function PartnershipHub() {
  const [activeTab, setActiveTab] = useState("create")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [requestType, setRequestType] = useState("investment")
  const [offerAmount, setOfferAmount] = useState<number>(0)
  const [totalNeeded, setTotalNeeded] = useState<number>(0)
  const [selectedIPO, setSelectedIPO] = useState<string>("")
  const partnerRequests: PartnershipRequest[] = [
    {
      id: "r1",
      from: "Rajesh Kumar",
      type: "investment",
      ipoName: "TechCorp Solutions",
      totalNeeded: 15000,
      requestedFromYou: 8000,
      panOwner: "partner",
      message: "Looking to co-invest. I can apply with my PAN.",
      status: "pending",
      steps: [
        { label: "Accepted by you", completed: false },
        { label: "Provide PAN to partner", completed: false },
        { label: "Partner applies for IPO", completed: false },
        { label: "Payment settled", completed: false },
      ],
    },
    {
      id: "r2",
      from: "Priya Sharma",
      type: "pan",
      ipoName: "GreenEnergy Ltd",
      panOwner: "me",
      message: "PAN-only request. I will fund and apply.",
      status: "pending",
      steps: [
        { label: "Accept PAN request", completed: false },
        { label: "Share PAN securely", completed: false },
        { label: "Application submitted", completed: false },
      ],
    },
  ]

  const mockPartners: Partner[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      avatar: "/professional-indian-man.png",
      investmentRange: "₹5L - ₹50L",
      sectors: ["Technology", "Healthcare"],
      experience: "8 years",
      successRate: 85,
      trustScore: 92,
      location: "Mumbai",
      description: "Experienced tech investor with focus on emerging startups and IPO opportunities.",
      activePartnerships: 3,
    },
    {
      id: "2",
      name: "Priya Sharma",
      avatar: "/professional-indian-woman.png",
      investmentRange: "₹10L - ₹1Cr",
      sectors: ["Finance", "Real Estate"],
      experience: "12 years",
      successRate: 78,
      trustScore: 88,
      location: "Delhi",
      description: "Strategic investor specializing in financial services and real estate IPOs.",
      activePartnerships: 5,
    },
  ]

  const mockPartnerships: Partnership[] = [
    {
      id: "1",
      name: "Tech IPO Collective",
      description: "Focused on upcoming technology IPOs with high growth potential",
      targetAmount: "₹2 Crores",
      currentAmount: "₹1.2 Crores",
      partners: [mockPartners[0], mockPartners[1]],
      status: "forming",
      sector: "Technology",
      riskLevel: "medium",
      expectedReturns: "15-25%",
    },
  ]

  // Hardcoded IPO -> total needed mapping (frontend only; to be fetched later from backend)
  const ipoAmounts: Record<string, number> = {
    "TechCorp Solutions": 15000,
    "GreenEnergy Ltd": 16000,
    "FinTech Innovations": 16250,
  }

  const handleSelectIPO = (value: string) => {
    setSelectedIPO(value)
    const nameMap: Record<string, string> = {
      techcorp: "TechCorp Solutions",
      greenenergy: "GreenEnergy Ltd",
      fintech: "FinTech Innovations",
    }
    const friendly = nameMap[value] || value
    setTotalNeeded(ipoAmounts[friendly] || 0)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Partnership</TabsTrigger>
          <TabsTrigger value="requests-received">Requests Received</TabsTrigger>
          <TabsTrigger value="accepted">Accepted Requests</TabsTrigger>
          <TabsTrigger value="discover">Discover Partners</TabsTrigger>
        </TabsList>

        {/* Create Partnership - compact row, no scroll */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor="ipo">Select IPO</Label>
                  <Select onValueChange={handleSelectIPO}>
                    <SelectTrigger id="ipo">
                      <SelectValue placeholder="Choose IPO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                      <SelectItem value="greenenergy">GreenEnergy Ltd</SelectItem>
                      <SelectItem value="fintech">FinTech Innovations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Partnership Type</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">Investment Partnership</SelectItem>
                      <SelectItem value="pan">PAN Account Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Total Needed (₹)</Label>
                  <Input value={totalNeeded ? totalNeeded.toString() : ""} readOnly placeholder="Select IPO to auto-fill" />
                </div>
              </div>

              {requestType === "investment" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>Your Offer (₹)</Label>
                    <Input type="number" value={offerAmount || ""} onChange={(e) => setOfferAmount(Number(e.target.value))} />
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <div className="text-sm text-slate-600">
                      Expected From Partner: <span className="font-semibold">₹{Math.max((totalNeeded || 0) - (offerAmount || 0), 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button size="sm">Create Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discover partners */}
        <TabsContent value="discover" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners by name, location, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                        <AvatarFallback>
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <CardDescription>
                          {partner.location} • {partner.experience}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{partner.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Investment Range:</span>
                        <span className="font-medium">{partner.investmentRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">{partner.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Trust Score:</span>
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3 text-blue-600" />
                          <span className="font-medium text-blue-600">{partner.trustScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {partner.sectors.map((sector) => (
                        <Badge key={sector} variant="secondary" className="text-xs">
                          {sector}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Requests received - show steps only after accepted */}
        <TabsContent value="requests-received" className="space-y-4">
          {partnerRequests.map((req) => (
            <Card key={req.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{req.from}</CardTitle>
                    <CardDescription>
                      {req.type === "investment" ? "Investment Partnership" : "PAN Holder Partnership"} • {req.ipoName}
                    </CardDescription>
                  </div>
                  <Badge>{req.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {req.type === "investment" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2"><IndianRupee className="h-4 w-4" />Total Needed: ₹{req.totalNeeded?.toLocaleString()}</div>
                    <div className="flex items-center gap-2"><IndianRupee className="h-4 w-4" />Requested From You: ₹{req.requestedFromYou?.toLocaleString()}</div>
                    <div className="flex items-center gap-2"><IdCard className="h-4 w-4" />PAN Owner: {req.panOwner === "me" ? "You" : req.from}</div>
                  </div>
                )}
                {req.type === "pan" && (
                  <div className="text-sm flex items-center gap-2"><IdCard className="h-4 w-4" />PAN Owner: {req.panOwner === "me" ? "You" : req.from}</div>
                )}
                {req.status === "accepted" && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs text-slate-500">Progress</div>
                    <div className="grid gap-1">
                      {req.steps?.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${s.completed ? "text-emerald-600" : "text-slate-300"}`} />
                          <span className={s.completed ? "text-slate-700" : "text-slate-500"}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Accept</Button>
                  <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requests-sent" className="space-y-4">
          {[1,2].map((id) => (
            <Card key={id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/professional-indian-woman.png" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Priya Sharma</CardTitle>
                      <CardDescription>PAN Account Partnership</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {/* Accepted requests */}
        <TabsContent value="accepted" className="space-y-4">
          {partnerRequests
            .filter((r) => r.status === "accepted")
            .map((req) => (
              <Card key={req.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{req.from}</CardTitle>
                      <CardDescription>
                        {req.type === "investment" ? "Investment Partnership" : "PAN Holder Partnership"} • {req.ipoName}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Accepted</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {req.type === "investment" ? (
                    <div className="grid gap-1">
                      {req.steps?.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${s.completed ? "text-emerald-600" : "text-slate-300"}`} />
                          <span className={s.completed ? "text-slate-700" : "text-slate-500"}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600">IPO Application Status: Awaiting submission</div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        
      </Tabs>
    </div>
  )
}
