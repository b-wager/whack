"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Code, BookOpen, ThumbsUp, X, Save, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface Partner {
  id: number
  name: string
  major: string
  compatibilityScore: number
  scheduleAlignment: string
  skills: string[]
  interests: string[]
  mutualInterest: boolean
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Alex Johnson",
    major: "Computer Science",
    compatibilityScore: 85,
    scheduleAlignment: "80% overlap",
    skills: ["React", "Node.js", "UI/UX Design"],
    interests: ["Data Visualization", "Machine Learning"],
    mutualInterest: true,
  },
  {
    id: 2,
    name: "Sam Lee",
    major: "Data Science",
    compatibilityScore: 75,
    scheduleAlignment: "65% overlap",
    skills: ["Python", "Data Analysis", "Statistics"],
    interests: ["Big Data", "AI"],
    mutualInterest: false,
  },
  {
    id: 3,
    name: "Jordan Taylor",
    major: "Graphic Design",
    compatibilityScore: 90,
    scheduleAlignment: "90% overlap",
    skills: ["Adobe Creative Suite", "Branding", "Typography"],
    interests: ["User Experience", "Motion Graphics"],
    mutualInterest: true,
  },
]

export default function Component() {
  const [currentPartner, setCurrentPartner] = useState(0)
  const [groupProgress, setGroupProgress] = useState(0)

  const handleSwipe = (direction: "up" | "down") => {
    if (direction === "up") {
      setGroupProgress((prev) => Math.min(prev + 25, 100))
    }
    setCurrentPartner((prev) => (prev + 1) % partners.length)
  }

  const handleSave = () => {
    // Implement save functionality
    console.log("Saved for later")
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[#0D3640] mb-4">Find Project Partners</h1>
      
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" className="text-[#0D3640] border-[#43D9A2]">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Progress value={groupProgress} className="w-1/2 bg-[#D9D3CC]">
          <div className="h-full bg-[#43D9A2] rounded-full transition-all" style={{ width: `${groupProgress}%` }} />
        </Progress>
        <Button variant="outline" size="sm" className="text-[#0D3640] border-[#43D9A2]">
          Filters
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <AnimatePresence>
        <motion.div
          key={currentPartner}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white border-2 border-[#43D9A2] shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#0D3640]">{partners[currentPartner].name}</h2>
                  <p className="text-sm text-[#0D3640]">{partners[currentPartner].major}</p>
                </div>
                <div className="bg-[#43D9A2] text-[#0D3640] font-bold rounded-full w-12 h-12 flex items-center justify-center">
                  {partners[currentPartner].compatibilityScore}%
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#0D3640]" />
                  <span className="text-sm text-[#0D3640]">{partners[currentPartner].scheduleAlignment}</span>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[#0D3640] mb-1">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {partners[currentPartner].skills.map((skill, index) => (
                      <span key={index} className="bg-[#49F292] text-[#0D3640] text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[#0D3640] mb-1">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {partners[currentPartner].interests.map((interest, index) => (
                      <span key={index} className="bg-[#D9D3CC] text-[#0D3640] text-xs px-2 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between p-4 bg-[#D9D3CC]/20">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white border-[#F28B50] text-[#F28B50] hover:bg-[#F28B50] hover:text-white"
                onClick={() => handleSwipe("down")}
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Pass</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white border-[#43D9A2] text-[#43D9A2] hover:bg-[#43D9A2] hover:text-white"
                onClick={handleSave}
              >
                <Save className="w-6 h-6" />
                <span className="sr-only">Save for later</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white border-[#43D9A2] text-[#43D9A2] hover:bg-[#43D9A2] hover:text-white"
                onClick={() => handleSwipe("up")}
              >
                <ThumbsUp className="w-6 h-6" />
                <span className="sr-only">Approve</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      {groupProgress === 100 && (
        <Button className="mt-4 bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]">
          <Users className="w-5 h-5 mr-2" />
          Create Group
        </Button>
      )}
    </div>
  )
}