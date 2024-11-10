"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Brain } from "lucide-react"

export default function SkillAssessment() {
  const [confidence, setConfidence] = useState(50)

  const handleConfidenceChange = (value: number[]) => {
    setConfidence(value[0])
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-0 shadow-lg shadow-[#43D9A2]/20">
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#43D9A2] to-[#49F292] flex items-center justify-center">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0D3640]">
              Assess Your Skills
            </h1>
            <p className="text-[#0D3640]/70">
              Help us understand your current skill level to better match you with suitable projects and teams.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-[#0D3640]">
              How confident are you in your technical abilities?
            </h2>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[confidence]}
              onValueChange={handleConfidenceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[#0D3640]/70">
              <span>Not confident at all</span>
              <span>Very confident</span>
            </div>
            <p className="text-center text-[#0D3640] font-medium">
              Your confidence: {confidence}%
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-[#43D9A2] to-[#49F292] text-white hover:from-[#49F292] hover:to-[#43D9A2]"
              onClick={() => console.log("Confidence level:", confidence)}
            >
              Continue
            </Button>
            <Button 
              variant="outline"
              className="w-full border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5"
              onClick={() => console.log("Skipped assessment")}
            >
              Skip this step
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#43D9A2]" />
            <div className="w-2 h-2 rounded-full bg-[#43D9A2]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D3CC]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D3CC]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}