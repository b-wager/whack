"use client"

import { useState } from "react"
import { ArrowLeft, Phone, Mail, Plus, Home, User, Calendar, CheckSquare, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

interface GroupMember {
  id: string
  name: string
  avatar: string
  role: string
  phone: string
  email: string
  availability: boolean[]
}

interface Task {
  id: string
  title: string
  assignee: string
  dueDate: string
  completed: boolean
}

const groupMembers: GroupMember[] = [
  {
    id: "you",
    name: "You",
    avatar: "/placeholder.svg",
    role: "Project Manager",
    phone: "976-336-1467",
    email: "kim.ally@xx.edu",
    availability: [true, true, false, true, false, false, true]
  },
  {
    id: "isabel",
    name: "Isabel Braxton",
    avatar: "/placeholder.svg",
    role: "Front-end",
    phone: "212-298-4412",
    email: "braxton.isabel@xx.edu",
    availability: [false, true, true, true, false, false, true]
  }
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete Team Charter",
    assignee: "you",
    dueDate: "2024-11-15",
    completed: false
  },
  {
    id: "2",
    title: "Set up development environment",
    assignee: "isabel",
    dueDate: "2024-11-16",
    completed: false
  }
]

export default function Component() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTab, setActiveTab] = useState("overview")

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleTaskClick = () => {
    setActiveTab("tasks")
    // Alternatively, if you want to navigate to a separate task view:
    // router.push('/group/taskview')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#D9D3CC] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-[#0D3640]">Group 4A</h1>
          </div>
          <Badge variant="secondary" className="bg-[#49F292]/10 text-[#0D3640]">
            CS 4600
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-[#D9D3CC]/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <main className="p-4">
          <TabsContent value="overview" className="space-y-4">
            {/* Next Action */}
            <Card className="bg-[#49F292]/10 border-[#43D9A2]">
              <CardContent className="p-4">
                <h2 className="font-medium text-[#0D3640] mb-2">Next Action:</h2>
                <Button 
                  className="w-full bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]"
                  onClick={handleTaskClick}
                >
                  Complete Team Charter
                </Button>
              </CardContent>
            </Card>

            {/* Meeting Times */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <h2 className="font-medium text-[#0D3640]">Suggested Meeting Times</h2>
                <Calendar className="h-5 w-5 text-[#43D9A2]" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-[#0D3640]">
                  <p>Monday 12p-3p</p>
                  <p>Thursday 1p-2p</p>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <div className="space-y-4">
              {groupMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-[#43D9A2]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-[#0D3640]">
                              {member.name} {member.id === "you" && "• "}
                              <span className="text-sm font-normal text-[#0D3640]/60">
                                {member.role}
                              </span>
                            </h3>
                          </div>
                        </div>
                        
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-[#0D3640]/60">
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#0D3640]/60">
                            <Mail className="h-4 w-4" />
                            <span>{member.email}</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs font-medium text-[#0D3640]/60 mb-1">Availability:</p>
                          <div className="flex gap-1">
                            {member.availability.map((available, index) => (
                              <div
                                key={index}
                                className={`h-8 w-4 rounded-sm ${
                                  available ? "bg-[#43D9A2]" : "bg-[#D9D3CC]/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${
                        task.completed ? "bg-[#43D9A2] text-white" : ""
                      }`}
                      onClick={() => toggleTaskComplete(task.id)}
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#0D3640]">{task.title}</h3>
                      <p className="text-sm text-[#0D3640]/60">
                        Assigned to: {groupMembers.find(m => m.id === task.assignee)?.name}
                      </p>
                      <p className="text-sm text-[#0D3640]/60">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-medium text-[#0D3640] mb-2">Schedule a Meeting</h2>
                <Button className="w-full bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]">
                  <Calendar className="mr-2 h-4 w-4" />
                  New Meeting
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center h-32 text-[#0D3640]/60">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </main>
      </Tabs>

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