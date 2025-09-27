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
import { Users, TrendingUp, Shield, MessageSquare, Search, Plus } from "lucide-react"
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

export function PartnershipHub() {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")

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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover Partners</TabsTrigger>
          <TabsTrigger value="partnerships">My Partnerships</TabsTrigger>
          <TabsTrigger value="create">Create Partnership</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

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

        <TabsContent value="partnerships" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPartnerships.map((partnership) => (
              <Card key={partnership.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{partnership.name}</CardTitle>
                    <Badge variant={partnership.status === "active" ? "default" : "secondary"}>
                      {partnership.status}
                    </Badge>
                  </div>
                  <CardDescription>{partnership.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Target Amount:</span>
                      <p className="font-medium">{partnership.targetAmount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Amount:</span>
                      <p className="font-medium text-green-600">{partnership.currentAmount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Returns:</span>
                      <p className="font-medium">{partnership.expectedReturns}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk Level:</span>
                      <Badge
                        variant={
                          partnership.riskLevel === "low"
                            ? "default"
                            : partnership.riskLevel === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {partnership.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Partners:</span>
                    <div className="flex -space-x-2">
                      {partnership.partners.map((partner) => (
                        <Avatar key={partner.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                          <AvatarFallback className="text-xs">
                            {partner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Partnership</CardTitle>
              <CardDescription>Set up a new investment partnership to collaborate with other investors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="partnership-name">Partnership Name</Label>
                    <Input id="partnership-name" placeholder="e.g., Tech IPO Collective" />
                  </div>
                  <div>
                    <Label htmlFor="target-amount">Target Investment Amount</Label>
                    <Input id="target-amount" placeholder="e.g., ₹50 Lakhs" />
                  </div>
                  <div>
                    <Label htmlFor="sector">Primary Sector</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expected-returns">Expected Returns</Label>
                    <Input id="expected-returns" placeholder="e.g., 15-25%" />
                  </div>
                  <div>
                    <Label htmlFor="min-investment">Minimum Investment per Partner</Label>
                    <Input id="min-investment" placeholder="e.g., ₹5 Lakhs" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Partnership Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your partnership goals, strategy, and what you're looking for in partners..."
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Partnership
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Partnership Requests</h3>
            <p className="text-muted-foreground">Partnership requests and invitations will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
