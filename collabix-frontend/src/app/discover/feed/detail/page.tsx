"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Code, BookOpen, ThumbsUp, Users, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Skill {
  name: string
  level: number
}

interface Interest {
  name: string
  relevance: number
}

interface Partner {
  id: string
  name: string
  avatar: string
  major: string
  compatibilityScore: number
  description: string
  skills: Skill[]
  interests: Interest[]
  availability: number[]
  goals: string[]
}

const partner: Partner = {
  id: "1",
  name: "Isabel Braxton",
  avatar: "/placeholder.svg",
  major: "Computer Science",
  compatibilityScore: 74,
  description: "Passionate about creating intuitive and efficient e-commerce solutions. Looking for a team to build an innovative online shopping experience.",
  skills: [
    { name: "React", level: 80 },
    { name: "Node.js", level: 70 },
    { name: "UI/UX Design", level: 85 },
    { name: "GraphQL", level: 60 },
  ],
  interests: [
    { name: "E-commerce", relevance: 90 },
    { name: "Web Performance", relevance: 85 },
    { name: "User Experience", relevance: 95 },
    { name: "Mobile-First Design", relevance: 80 },
  ],
  availability: [80, 60, 90, 70, 85, 65, 40],
  goals: [
    "Build a scalable e-commerce platform",
    "Implement cutting-edge UX design principles",
    "Optimize for mobile and desktop experiences",
    "Integrate secure payment gateways",
  ],
}

export default function Component() {
  const [isInterested, setIsInterested] = useState(false)
  const [isMutualInterest, setIsMutualInterest] = useState(false)
  const router = useRouter()

  const handleChoosePartner = () => {
    setIsInterested(true)
    // Simulating a mutual interest after a short delay
    setTimeout(() => {
      setIsMutualInterest(true)
      router.push('/match')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white p-4 max-w-2xl mx-auto">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#0D3640]">Partner Profile</h1>
      </header>

      <Card className="bg-white border-2 border-[#43D9A2] shadow-lg mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={partner.avatar} alt={partner.name} />
            <AvatarFallback className="bg-[#43D9A2] text-[#0D3640] text-2xl">
              {partner.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-[#0D3640]">{partner.name}</CardTitle>
            <p className="text-[#0D3640]/60">{partner.major}</p>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-[#49F292] text-[#0D3640]">
                {partner.compatibilityScore}% Match
              </Badge>
              {isMutualInterest && (
                <Badge variant="secondary" className="ml-2 bg-[#F28B50] text-white">
                  Mutual Interest
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#0D3640] mb-2">About</h2>
            <p className="text-[#0D3640]/80">{partner.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0D3640] mb-2">Skills</h2>
            <div className="space-y-2">
              {partner.skills.map((skill) => (
                <div key={skill.name} className="flex items-center">
                  <span className="w-24 text-sm text-[#0D3640]">{skill.name}</span>
                  <Progress value={skill.level} className="flex-1 h-2 bg-[#D9D3CC]">
                    <div className="h-full bg-[#43D9A2] rounded-full" style={{ width: `${skill.level}%` }} />
                  </Progress>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0D3640] mb-2">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {partner.interests.map((interest) => (
                <Badge key={interest.name} variant="secondary" className="bg-[#49F292]/20 text-[#0D3640]">
                  {interest.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0D3640] mb-2">Availability</h2>
            <div className="flex items-end gap-1 h-20">
              {partner.availability.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-[#43D9A2] rounded-t"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#0D3640]/60 mt-1">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0D3640] mb-2">Project Goals</h2>
            <ul className="list-disc list-inside space-y-1 text-[#0D3640]/80">
              {partner.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]"
            onClick={handleChoosePartner}
            disabled={isInterested}
          >
            {isInterested ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Interest Sent
              </>
            ) : (
              <>
                <ThumbsUp className="mr-2 h-4 w-4" /> Choose as Partner
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {isMutualInterest && (
        <Card className="bg-[#F28B50]/10 border-[#F28B50] mb-6">
          <CardContent className="flex items-center gap-4 py-4">
            <Users className="h-6 w-6 text-[#F28B50]" />
            <p className="text-[#0D3640]">
              Great news! {partner.name} is also interested in working with you. You can now start forming a team!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}