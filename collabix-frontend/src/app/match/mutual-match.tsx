"use client"

import { useState } from "react"
import { ArrowLeft, Users, UserPlus, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MatchedPartner {
  id: string
  name: string
  avatar: string
  matchPercentage: number
  description: string
  preferredRole: string
}

const matchedPartners: MatchedPartner[] = [
  {
    id: "1",
    name: "Isabel Braxton",
    avatar: "/placeholder.svg",
    matchPercentage: 74,
    description: "Create an e-commerce website",
    preferredRole: "Front-end Developer"
  },
  {
    id: "2",
    name: "Ada Botha",
    avatar: "/placeholder.svg",
    matchPercentage: 69,
    description: "Make a shopping website with various lifestyle tips",
    preferredRole: "Back-end Developer"
  },
  {
    id: "3",
    name: "Leo Zhang",
    avatar: "/placeholder.svg",
    matchPercentage: 82,
    description: "Develop a mobile app for local event discovery",
    preferredRole: "Mobile Developer"
  }
]

export default function Component() {
  const [invitedPartners, setInvitedPartners] = useState<string[]>([])

  const handleInvite = (partnerId: string) => {
    setInvitedPartners(prev => [...prev, partnerId])
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-[#D9D3CC]">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#0D3640]">Mutual Matches</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <Card className="bg-[#49F292]/10 border-[#43D9A2]">
          <CardContent className="flex items-center gap-4 py-4">
            <Users className="h-6 w-6 text-[#43D9A2]" />
            <p className="text-[#0D3640]">
              Great news! You have mutual matches. Invite them to your group or add them to your shortlist.
            </p>
          </CardContent>
        </Card>

        {matchedPartners.map((partner) => (
          <Card key={partner.id} className="bg-white border-2 border-[#43D9A2]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={partner.avatar} alt={partner.name} />
                  <AvatarFallback className="bg-[#43D9A2]">
                    {partner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0D3640]">{partner.name}</h3>
                      <p className="text-sm text-[#0D3640]/60">{partner.matchPercentage}% match</p>
                    </div>
                    <Badge variant="secondary" className="bg-[#F28B50] text-white">
                      Matched
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs font-medium text-[#0D3640]/60">Description:</p>
                      <p className="text-sm text-[#0D3640]">{partner.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-[#0D3640]/60">Preferred Role:</p>
                      <p className="text-sm text-[#0D3640]">{partner.preferredRole}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={() => handleInvite(partner.id)}
                      disabled={invitedPartners.includes(partner.id)}
                      className={`w-full ${
                        invitedPartners.includes(partner.id)
                          ? "bg-[#49F292] text-[#0D3640]"
                          : "bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]"
                      }`}
                    >
                      {invitedPartners.includes(partner.id) ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Invited to Group
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" /> Invite to Group
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#D9D3CC] bg-white px-6 py-2">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6 text-[#0D3640]" />
            <span className="sr-only">Matches</span>
          </Button>
          <Button size="icon" className="bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292] rounded-full h-12 w-12">
            <UserPlus className="h-6 w-6" />
            <span className="sr-only">Invite to Group</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6 text-[#0D3640]" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}