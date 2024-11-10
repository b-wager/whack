"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Component() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-[#0D3640]">
            Help us find your
            <span className="text-[#43D9A2]"> perfect match</span>
          </h1>
          <p className="text-xl text-[#0D3640]/80">
            Answer a few questions about your project preferences and skills
          </p>
        </div>

        <Card className="bg-[#49F292]/10 border-[#43D9A2] p-6">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#43D9A2] rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-white">8</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-[#0D3640]">Quick Questions</h2>
              <p className="text-sm text-[#0D3640]/60">
                Takes about 3 minutes to complete
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6 pt-4">
          <ul className="text-left space-y-3">
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#43D9A2]" />
              <span className="text-[#0D3640]">Share your project interests</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#43D9A2]" />
              <span className="text-[#0D3640]">Set your availability</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#43D9A2]" />
              <span className="text-[#0D3640]">Choose your preferred roles</span>
            </li>
          </ul>

          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/survey/questions")}
              className="w-full bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292] h-12 text-lg"
            >
              Start Questionnaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-[#0D3640] hover:bg-[#D9D3CC]/10"
            >
              Do this later
            </Button>
          </div>
        </div>

        <p className="text-sm text-[#0D3640]/60">
          Your answers help us suggest the most compatible project partners
        </p>
      </motion.div>
    </div>
  )
}