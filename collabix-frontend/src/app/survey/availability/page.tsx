"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface TimeSlot {
  hour: number
  day: number
  selected: boolean
  otherSelected: boolean
}

export default function Component() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [startSlot, setStartSlot] = useState<{ hour: number; day: number } | null>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  // Initialize time slots
  useEffect(() => {
    const slots: TimeSlot[] = []
    for (let day = 0; day < 3; day++) {
      for (let hour = 9; hour <= 16; hour++) {
        slots.push({
          hour,
          day,
          selected: false,
          otherSelected: Math.random() > 0.7 // Simulate other people's selections
        })
      }
    }
    setTimeSlots(slots)
  }, [])

  const handleMouseDown = (hour: number, day: number) => {
    setIsDragging(true)
    setStartSlot({ hour, day })
    
    // Update the initial slot
    setTimeSlots(prev => prev.map(slot => ({
      ...slot,
      selected: slot.hour === hour && slot.day === day ? !slot.selected : slot.selected
    })))
  }

  const handleMouseMove = (hour: number, day: number) => {
    if (!isDragging || !startSlot) return

    const minHour = Math.min(startSlot.hour, hour)
    const maxHour = Math.max(startSlot.hour, hour)
    const minDay = Math.min(startSlot.day, day)
    const maxDay = Math.max(startSlot.day, day)

    setTimeSlots(prev => prev.map(slot => ({
      ...slot,
      selected: 
        slot.hour >= minHour && 
        slot.hour <= maxHour && 
        slot.day >= minDay && 
        slot.day <= maxDay
    })))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setStartSlot(null)
  }

  const handleSubmit = () => {
    router.push("/discover")
  }

  const days = ['Sun', 'Mon', 'Tue']
  const currentDate = new Date()
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-[#0D3640] font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'short' })} {currentDate.getDate()} - {currentDate.getDate() + 2}
          </h2>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="text-[#0D3640] border-[#43D9A2]">
          Edit event
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="relative">
        {/* Day headers */}
        <div className="grid grid-cols-[60px_1fr_1fr_1fr] mb-2">
          <div></div>
          {days.map((day) => (
            <div key={day} className="text-center font-medium text-[#0D3640]">
              {day}
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-[60px_1fr_1fr_1fr] gap-[1px] bg-[#D9D3CC]"
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
        >
          {/* Time labels */}
          {Array.from({ length: 8 }, (_, i) => i + 9).map(hour => (
            <div 
              key={hour} 
              className="h-12 flex items-center justify-end pr-2 text-sm text-[#0D3640]"
            >
              {hour % 12 || 12} {hour < 12 ? 'AM' : 'PM'}
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`h-12 transition-colors ${
                slot.selected && slot.otherSelected
                  ? 'bg-[#0D3640]'
                  : slot.selected
                  ? 'bg-[#43D9A2]'
                  : slot.otherSelected
                  ? 'bg-[#49F292]'
                  : 'bg-white'
              }`}
              onMouseDown={() => handleMouseDown(slot.hour, slot.day)}
              onMouseMove={() => handleMouseMove(slot.hour, slot.day)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" className="text-[#0D3640] border-[#43D9A2]">
          Cancel
        </Button>
        <div className="space-x-2">
          <Button variant="outline" className="border-[#43D9A2] text-[#0D3640]">
            If needed
          </Button>
          <Button 
            className="bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]"
            onClick={handleSubmit}
          >
            Available
          </Button>
        </div>
      </div>
    </div>
  )
}