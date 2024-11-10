import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail } from "lucide-react"

type AuthFormData = {
  email: string
  password: string
  name?: string
}

export default function AuthScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Form submitted:", formData)
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <div 
            className="h-16 w-16 mx-auto rounded-full"
            style={{ backgroundColor: '#F28B50' }}
          />
          <h1 className="text-2xl font-bold tracking-tight text-[#0D3640]">Welcome to LearnSpace</h1>
          <p className="text-sm text-[#0D3640]/70">Your personalized learning journey begins here</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="w-full bg-[#D9D3CC]/20">
            <TabsTrigger value="signin" className="w-full data-[state=active]:bg-[#43D9A2] data-[state=active]:text-white">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-full data-[state=active]:bg-[#43D9A2] data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-[#0D3640]/20"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-[#0D3640]/20"
                />
              </div>
              <Button 
                type="submit"
                className="w-full font-semibold bg-[#43D9A2] text-white hover:bg-[#49F292]"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-[#0D3640]/70 hover:text-[#0D3640]">
                  Forgot your password?
                </a>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-[#0D3640]/20"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-[#0D3640]/20"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-[#0D3640]/20"
                />
              </div>
              <Button 
                type="submit"
                className="w-full font-semibold bg-[#F28B50] text-white hover:bg-[#F28B50]/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#0D3640]/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#0D3640]/70">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="border-[#0D3640]/20 text-[#0D3640] hover:bg-[#0D3640]/5">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <div className="text-center text-xs text-[#0D3640]/70">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-[#0D3640]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-[#0D3640]">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}