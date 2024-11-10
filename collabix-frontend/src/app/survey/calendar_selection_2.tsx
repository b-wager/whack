"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const hours = Array.from({ length: 16 }, (_, i) => i + 8) // 8 AM to 11 PM

type Selection = {
  [key: string]: { [hour: number]: 'user' | 'other' | null }
}

export default function Component() {
  const [selection, setSelection] = useState<Selection>({})
  const [isSelecting, setIsSelecting] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  const getDates = () => {
    const dates = []
    for (let i = 0; i < 3; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const handleMouseDown = (date: string, hour: number) => {
    setIsSelecting(true)
    toggleSelection(date, hour)
  }

  const handleMouseEnter = (date: string, hour: number) => {
    if (isSelecting) {
      toggleSelection(date, hour)
    }
  }

  const toggleSelection = (date: string, hour: number) => {
    setSelection(prev => {
      const newSelection = { ...prev }
      if (!newSelection[date]) {
        newSelection[date] = {}
      }
      if (newSelection[date][hour] === 'user') {
        newSelection[date][hour] = null
      } else {
        newSelection[date][hour] = 'user'
      }
      return newSelection
    })
  }

  useEffect(() => {
    const handleMouseUp = () => setIsSelecting(false)
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const getCellColor = (date: string, hour: number) => {
    if (!selection[date] || !selection[date][hour]) return 'bg-white'
    return selection[date][hour] === 'user' ? 'bg-[#43D9A2]' : 'bg-[#49F292]'
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white border-[#0D3640]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-[#0D3640]">Availability Selection</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 3)))}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous three days</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 3)))}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next three days</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="grid grid-cols-[auto,1fr,1fr,1fr] gap-1"
          ref={calendarRef}
        >
          <div className="sticky left-0 z-10 bg-white" />
          {getDates().map((date, index) => (
            <div key={index} className="text-center font-semibold py-2 text-[#0D3640]">
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          ))}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="sticky left-0 z-10 bg-white text-right pr-2 py-2 text-sm text-[#0D3640]">
                {hour % 12 || 12}{hour >= 12 ? 'PM' : 'AM'}
              </div>
              {getDates().map((date) => {
                const dateString = date.toISOString().split('T')[0]
                return (
                  <div
                    key={`${dateString}-${hour}`}
                    className={`border border-[#D9D3CC] ${getCellColor(dateString, hour)} transition-colors`}
                    onMouseDown={() => handleMouseDown(dateString, hour)}
                    onMouseEnter={() => handleMouseEnter(dateString, hour)}
                    aria-selected={selection[dateString]?.[hour] === 'user'}
                    role="gridcell"
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-[#0D3640] border-[#0D3640]">
          Cancel
        </Button>
        <Button className="bg-[#43D9A2] text-[#0D3640] hover:bg-[#49F292]">
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}