"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: 1,
    title: "What's your superpower?",
    description: "Choose your strongest skill",
    options: [
      { id: "problem-solving", label: "Problem-Solving 🧩", value: "problem-solving" },
      { id: "creativity", label: "Creativity 🎨", value: "creativity" },
      { id: "communication", label: "Communication 💭", value: "communication" },
      { id: "technical", label: "Technical Skills 💻", value: "technical" },
    ],
  },
  {
    id: 2,
    title: "What's your project style?",
    description: "Select your preferred role",
    options: [
      { id: "leader", label: "The Leader 🧠", value: "leader" },
      { id: "organizer", label: "The Organizer 📋", value: "organizer" },
      { id: "creator", label: "The Creator 🎨", value: "creator" },
      { id: "troubleshooter", label: "The Troubleshooter 🛠️", value: "troubleshooter" },
    ],
  },
  {
    id: 3,
    title: "When are you most productive?",
    description: "Choose your preferred working hours",
    options: [
      { id: "early-bird", label: "Early Bird ☀️", value: "early-bird" },
      { id: "night-owl", label: "Night Owl 🌙", value: "night-owl" },
      { id: "flexible", label: "Flexible 🧘", value: "flexible" },
    ],
  },
]

export default function Component() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const currentQuestion = questions[currentStep]

  const handleOptionClick = (value: string) => {
    setSelectedOptions(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleNext = () => {
    if (selectedOptions.length === 0) return

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOptions
    }))

    if (currentStep === questions.length - 1) {
      // Submit answers and navigate
      console.log("Final answers:", answers)
      router.push("/survey")
      return
    }

    setSelectedOptions([])
    setCurrentStep(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0D3640]">
            {currentQuestion.title}
          </h1>
          <p className="text-lg text-[#0D3640]/80">
            {currentQuestion.description}
          </p>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedOptions.includes(option.value)
                  ? "bg-[#49F292]/10 border-[#43D9A2]"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-[#0D3640]">{option.label}</span>
                {selectedOptions.includes(option.value) && (
                  <div className="h-2 w-2 rounded-full bg-[#43D9A2]" />
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            className="w-full bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292] h-12 text-lg"
          >
            {currentStep === questions.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-[#43D9A2]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}