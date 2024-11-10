"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-0 shadow-lg shadow-[#43D9A2]/20">
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#43D9A2] to-[#49F292] flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[#F28B50] flex items-center justify-center">
                <div className="w-8 h-8 text-2xl text-white font-bold flex items-center justify-center">
                  +
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0D3640]">
              Find Your Perfect Team Match!
            </h1>
            <p className="text-[#0D3640]/70">
              Take a quick 5-minute survey to help us match you with the ideal project team based on your skills and interests.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-[#43D9A2] to-[#49F292] text-white hover:from-[#49F292] hover:to-[#43D9A2]"
              onClick={() => console.log("Start matching")}
            >
              Start Matching
            </Button>
            <Button 
              variant="outline"
              className="w-full border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5"
              onClick={() => console.log("Skip for now")}
            >
              Skip for now
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#43D9A2]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D3CC]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D3CC]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D3CC]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}