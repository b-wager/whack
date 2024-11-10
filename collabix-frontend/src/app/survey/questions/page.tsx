"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Brain, Clock, Target, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SurveyStep {
  id: number
  icon: JSX.Element
  title: string
  description: string
  component: JSX.Element
}

export default function SurveyQuestions() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    technicalSkills: {
      dataAnalysis: 50,
      visualization: 50,
      programming: 50
    },
    workStyle: {
      preferredRole: "",
      communicationStyle: []
    },
    availability: {
      hoursPerWeek: "",
      sessionPreference: ""
    },
    projectGoals: {
      mainGoal: "",
      commitment: 50
    }
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Submit answers and navigate to next page
      console.log("Final answers:", answers)
      router.push("/survey/availability")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const steps: SurveyStep[] = [
    {
      id: 1,
      icon: <Brain className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Rate your proficiency in key areas",
      component: (
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium text-[#0D3640]">Data Analysis Proficiency</h3>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[answers.technicalSkills.dataAnalysis]}
              onValueChange={(value) => setAnswers(prev => ({
                ...prev,
                technicalSkills: { ...prev.technicalSkills, dataAnalysis: value[0] }
              }))}
            />
            <div className="flex justify-between text-sm text-[#0D3640]/70">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-[#0D3640]">Data Visualization Skills</h3>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[answers.technicalSkills.visualization]}
              onValueChange={(value) => setAnswers(prev => ({
                ...prev,
                technicalSkills: { ...prev.technicalSkills, visualization: value[0] }
              }))}
            />
            <div className="flex justify-between text-sm text-[#0D3640]/70">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6" />,
      title: "Work Style",
      description: "Tell us about your preferred way of working",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-[#0D3640]">Preferred Project Role</h3>
            <RadioGroup
              value={answers.workStyle.preferredRole}
              onValueChange={(value) => setAnswers(prev => ({
                ...prev,
                workStyle: { ...prev.workStyle, preferredRole: value }
              }))}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analyst" id="analyst" />
                  <Label htmlFor="analyst">Data Analyst</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visualizer" id="visualizer" />
                  <Label htmlFor="visualizer">Data Visualizer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coordinator" id="coordinator" />
                  <Label htmlFor="coordinator">Project Coordinator</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: <Clock className="w-6 h-6" />,
      title: "Availability",
      description: "Let us know your time commitment",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-[#0D3640]">Hours per Week</h3>
            <RadioGroup
              value={answers.availability.hoursPerWeek}
              onValueChange={(value) => setAnswers(prev => ({
                ...prev,
                availability: { ...prev.availability, hoursPerWeek: value }
              }))}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="1-2" />
                  <Label htmlFor="1-2">1-2 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-5" id="3-5" />
                  <Label htmlFor="3-5">3-5 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6+" id="6+" />
                  <Label htmlFor="6+">6+ hours</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    },
    {
      id: 4,
      icon: <Target className="w-6 h-6" />,
      title: "Project Goals",
      description: "What do you want to achieve?",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-[#0D3640]">Main Project Goal</h3>
            <RadioGroup
              value={answers.projectGoals.mainGoal}
              onValueChange={(value) => setAnswers(prev => ({
                ...prev,
                projectGoals: { ...prev.projectGoals, mainGoal: value }
              }))}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grade" id="grade" />
                  <Label htmlFor="grade">Achieve high grade</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skills" id="skills" />
                  <Label htmlFor="skills">Improve skills</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portfolio" id="portfolio" />
                  <Label htmlFor="portfolio">Build portfolio</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-0 shadow-lg shadow-[#43D9A2]/20">
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#43D9A2] to-[#49F292] flex items-center justify-center">
              {steps[currentStep].icon}
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0D3640]">
              {steps[currentStep].title}
            </h1>
            <p className="text-[#0D3640]/70">
              {steps[currentStep].description}
            </p>
          </div>

          {steps[currentStep].component}

          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-[#43D9A2] to-[#49F292] text-white hover:from-[#49F292] hover:to-[#43D9A2]"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
            {currentStep > 0 && (
              <Button 
                variant="outline"
                className="w-full border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-[#43D9A2]" : "bg-[#D9D3CC]"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}