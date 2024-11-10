"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

interface User {
  name: string
  email: string
  avatar: string
}

export default function Component() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const currentUser: User = {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    avatar: "/placeholder.svg?height=40&width=40"
  }

  const handleJoin = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const isValidCode = code.length >= 5 && code.length <= 7 && /^[A-Za-z0-9]+$/.test(code)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0D3640]">Join Organization</h1>
          <p className="text-sm text-[#0D3640]/70">Enter your organization code to get started</p>
        </div>

        <Card className="border-[#43D9A2] border-2 shadow-lg shadow-[#43D9A2]/20">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#D9D3CC]/20 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-[#F28B50]">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-[#F28B50] text-white">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium leading-none text-[#0D3640]">
                      {currentUser.name}
                    </h2>
                    <p className="text-sm text-[#0D3640]/70">{currentUser.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-[#F28B50] text-[#F28B50] hover:bg-[#F28B50]/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Switch
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-[#0D3640]">Organization code</h3>
                  <p className="text-sm text-[#43D9A2]">
                    Ask your administrator for the organization code
                  </p>
                </div>
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="border-[#43D9A2] focus:ring-[#49F292]"
                  maxLength={7}
                />
                <div className="space-y-1 text-sm text-[#0D3640]/70 bg-[#D9D3CC]/20 p-4 rounded-lg">
                  <p className="font-medium text-[#0D3640]">To join with an organization code:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use an authorized account</li>
                    <li>Use a code with 5-7 letters or numbers, and no spaces or symbols</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className="border-[#0D3640] text-[#0D3640] hover:bg-[#0D3640]/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleJoin}
            disabled={!isValidCode || isLoading}
            className="bg-[#F28B50] text-white hover:bg-[#F28B50]/90"
          >
            {isLoading ? "Joining..." : "Join"}
          </Button>
        </div>
      </div>
    </div>
  )
}