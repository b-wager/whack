"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Expertise = {
  id: string
  label: string
}

const expertiseOptions: Expertise[] = [
  { id: "project-management", label: "Project Management" },
  { id: "design", label: "Design" },
  { id: "coding", label: "Coding" },
  { id: "business-writing", label: "Business Writing" },
  { id: "data-analyst", label: "Data Analyst" },
  { id: "software-development", label: "Software Development" },
  { id: "biology", label: "Biology" },
  { id: "physics", label: "Physics" },
  { id: "mathematics", label: "Mathematics" },
  { id: "public-relations", label: "Public Relations" },
  { id: "product-development", label: "Product Development" },
  { id: "chemistry", label: "Chemistry" },
  { id: "real-estate", label: "Real Estate" },
  { id: "operation-management", label: "Operation Management" },
]

export default function ExpertiseSelection() {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])

  const toggleExpertise = (id: string) => {
    setSelectedExpertise(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-4">
          <Progress value={33} className="bg-[#D9D3CC]/20">
            <div className="bg-[#43D9A2] h-full transition-all" />
          </Progress>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0D3640]">
              What is your primary area of expertise and main professional skills?
            </h1>
            <p className="text-sm text-[#0D3640]/70">
              Select all that apply to help us personalize your learning experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expertiseOptions.map((expertise) => (
            <Button
              key={expertise.id}
              variant="outline"
              className={`h-auto py-3 px-4 justify-start font-normal transition-all ${
                selectedExpertise.includes(expertise.id)
                  ? "bg-[#43D9A2] text-white border-[#43D9A2] hover:bg-[#49F292] hover:border-[#49F292]"
                  : "border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5"
              }`}
              onClick={() => toggleExpertise(expertise.id)}
            >
              {expertise.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            className="border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5"
          >
            Back
          </Button>
          <Button
            className="bg-[#43D9A2] text-white hover:bg-[#49F292]"
            disabled={selectedExpertise.length === 0}
          >
            Continue
          </Button>
        </div>

        <div className="text-center text-sm text-[#0D3640]/70">
          Step 1 of 3: Professional Background
        </div>
      </div>
    </div>
  )
}