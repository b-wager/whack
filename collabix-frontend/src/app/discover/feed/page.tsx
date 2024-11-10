"use client"

import { ArrowLeft, Home, Plus, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Teammate {
  id: string
  name: string
  avatar: string
  matchPercentage: number
  description: string
  preferredRole: string
  availability: number[]
}

const teammates: Teammate[] = [
  {
    id: "1",
    name: "Isabel Braxton",
    avatar: "/placeholder.svg",
    matchPercentage: 74,
    description: "Create an e-commerce website",
    preferredRole: "Front-end",
    availability: [80, 60, 90, 70, 85, 65, 40]
  },
  {
    id: "2",
    name: "Ada Botha",
    avatar: "/placeholder.svg",
    matchPercentage: 69,
    description: "Make a shopping website with various lifestyle tips",
    preferredRole: "Back-end",
    availability: [70, 85, 60, 75, 90, 80, 50]
  }
]

export default function Component() {
  const router = useRouter()

  const handleTeammateClick = (teammateId: string) => {
    router.push(`/discover/feed/detail`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-[#D9D3CC]">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#0D3640]">Find Teammates</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <Badge variant="secondary" className="bg-[#49F292]/10 text-[#0D3640] hover:bg-[#49F292]/20">
            Recommended
          </Badge>
          <Button variant="outline" className="text-[#0D3640] border-[#43D9A2]">
            Submit
          </Button>
        </div>

        {teammates.map((teammate) => (
          <Card 
            key={teammate.id} 
            className="bg-[#49F292]/5 border-none cursor-pointer hover:bg-[#49F292]/10 transition-colors"
            onClick={() => handleTeammateClick(teammate.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teammate.avatar} alt={teammate.name} />
                  <AvatarFallback className="bg-[#43D9A2]">
                    {teammate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0D3640]">{teammate.name}</h3>
                      <p className="text-sm text-[#0D3640]/60">{teammate.matchPercentage}% match</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8 border-[#43D9A2]"
                    >
                      <span className="sr-only">Select teammate</span>
                      <div className="h-3 w-3 rounded-full border-2 border-[#43D9A2]" />
                    </Button>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs font-medium text-[#0D3640]/60">Description:</p>
                      <p className="text-sm text-[#0D3640]">{teammate.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-medium text-[#0D3640]/60">Preferred Role:</p>
                        <p className="text-sm text-[#0D3640]">{teammate.preferredRole}</p>
                      </div>
                      
                      <div className="flex items-end gap-0.5">
                        {teammate.availability.map((value, index) => (
                          <div
                            key={index}
                            className="w-2 bg-[#43D9A2] rounded-t"
                            style={{ height: `${value * 0.4}px` }}
                          />
                        ))}
                      </div>
                    </div>
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
            <Home className="h-6 w-6 text-[#0D3640]" />
          </Button>
          <Button size="icon" className="bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292] rounded-full h-12 w-12">
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6 text-[#0D3640]" />
          </Button>
        </div>
      </nav>
    </div>
  )
}