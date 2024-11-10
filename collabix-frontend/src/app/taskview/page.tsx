"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flag, ChevronRight, Trophy, Star } from "lucide-react"
import { useState } from "react"

export default function Component() {
  const [progress, setProgress] = useState(0)

  const projectStages = [
    {
      title: "Setup Development Environment",
      tasks: ["Install Unity Hub", "Setup Unity Editor", "Configure Version Control"],
      progress: 100
    },
    {
      title: "Core Game Mechanics",
      tasks: ["Implement Player Movement", "Setup Physics Engine", "Create Basic Controls"],
      progress: 65
    },
    {
      title: "Level Design",
      tasks: ["Design First Level", "Create Platforms", "Add Obstacles"],
      progress: 30
    },
    {
      title: "Polish & Testing",
      tasks: ["Add Visual Effects", "Implement Sound", "Playtest & Debug"],
      progress: 0
    }
  ]

  return (
    <div className="min-h-screen bg-white p-6">
      <Card className="max-w-4xl mx-auto bg-[#0D3640] shadow-xl border-4 border-[#43D9A2]">
        <CardHeader className="space-y-4 p-6 bg-[#43D9A2]">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">2D Platformer Project</h1>
            <Trophy className="w-10 h-10 text-[#F28B50]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white font-medium">Overall Progress</span>
              <span className="font-bold text-white">48%</span>
            </div>
            <Progress value={48} className="bg-[#0D3640] h-3 rounded-full">
              <div className="h-full bg-[#F28B50] rounded-full transition-all" style={{ width: '48%' }} />
            </Progress>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Card className="bg-[#49F292] border-none shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <Flag className="w-6 h-6 text-[#0D3640]" />
              <div>
                <h2 className="font-bold text-[#0D3640] text-lg">Ultimate Goal</h2>
                <p className="text-[#0D3640] font-medium">Create an interactive 2D platformer game using Unity and physics</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {projectStages.map((stage, index) => (
              <Card key={index} className="border-2 border-[#43D9A2] bg-[#D9D3CC]/10 hover:bg-[#D9D3CC]/20 transition-all">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#43D9A2] text-xl flex items-center gap-2">
                        <span className="bg-[#43D9A2] text-[#0D3640] w-8 h-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        {stage.title}
                      </h3>
                      <span className="text-lg font-bold text-[#F28B50]">{stage.progress}%</span>
                    </div>
                    <Progress value={stage.progress} className="bg-[#0D3640] h-2 rounded-full">
                      <div 
                        className="h-full bg-[#F28B50] rounded-full transition-all" 
                        style={{ width: `${stage.progress}%` }} 
                      />
                    </Progress>
                    <ul className="space-y-2 pt-2">
                      {stage.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center text-sm text-[#D9D3CC]">
                          <Star className="w-4 h-4 mr-2 text-[#49F292]" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}