'use client'

import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Plus, Minus, Github } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [switches, setSwitches] = useState([
    { enabled: false, text: '', enabledAt: null as number | null },
    { enabled: false, text: '', enabledAt: null as number | null },
    { enabled: false, text: '', enabledAt: null as number | null }
  ])
  const [isEditable, setIsEditable] = useState(true)

  const updateSwitch = (index: number, enabled: boolean) => {
    const newSwitches = [...switches]
    
    if (enabled) {
      // Count currently enabled switches
      const enabledCount = switches.filter(s => s.enabled).length
      const maxAllowed = switches.length - 1
      
      if (enabledCount >= maxAllowed) {
        // Find the earliest enabled switch
        const earliest = [...switches]
          .filter(s => s.enabled && s.enabledAt !== null)
          .sort((a, b) => (a.enabledAt || 0) - (b.enabledAt || 0))[0]
        
        // Turn off the earliest switch
        const earliestIndex = switches.findIndex(s => s === earliest)
        newSwitches[earliestIndex].enabled = false
        newSwitches[earliestIndex].enabledAt = null
      }
      
      // Turn on the new switch
      newSwitches[index].enabled = true
      newSwitches[index].enabledAt = Date.now()
    } else {
      // Just turn off the switch
      newSwitches[index].enabled = false
      newSwitches[index].enabledAt = null
    }
    
    setSwitches(newSwitches)
  }

  const updateText = (index: number, text: string) => {
    const newSwitches = [...switches]
    newSwitches[index].text = text
    setSwitches(newSwitches)
  }

  const addNewRow = () => {
    setSwitches([...switches, { enabled: false, text: '', enabledAt: null }])
  }

  const removeRow = (index: number) => {
    const newSwitches = switches.filter((_, i) => i !== index)
    
    // After removing, check if we have too many enabled switches
    const enabledSwitches = newSwitches.filter(s => s.enabled)
    const maxAllowed = newSwitches.length - 1
    
    if (enabledSwitches.length > maxAllowed) {
      // Turn off the earliest enabled switches until we meet the limit
      const sortedEnabled = enabledSwitches
        .sort((a, b) => (a.enabledAt || 0) - (b.enabledAt || 0))
      
      // Calculate how many need to be turned off
      const turnOffCount = enabledSwitches.length - maxAllowed
      
      // Turn off the earliest ones
      for (let i = 0; i < turnOffCount; i++) {
        const switchToDisable = sortedEnabled[i]
        const switchIndex = newSwitches.findIndex(s => s === switchToDisable)
        if (switchIndex !== -1) {
          newSwitches[switchIndex].enabled = false
          newSwitches[switchIndex].enabledAt = null
        }
      }
    }
    
    setSwitches(newSwitches)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-2xl font-bold">Toggles</h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a 
              href="https://github.com/1719pankaj/toggles" 
              className="hover:opacity-75 transition-opacity"
              target="_blank"
            >
              <Github className="h-6 w-6" />
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">GitHub: @1719pankaj</p>
              <p className="text-xs text-muted-foreground">View project source</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="space-y-6">
        {switches.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Switch
              checked={item.enabled}
              onCheckedChange={(checked) => updateSwitch(index, checked)}
            />
            <Input
              value={item.text}
              onChange={(e) => updateText(index, e.target.value)}
              placeholder={`Choice ${index + 1}`}
              className="w-[200px]"
              disabled={!isEditable}
            />
            {index >= 3 && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeRow(index)}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={addNewRow}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setIsEditable(!isEditable)}
            variant="outline"
          >
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>
    </main>
  )
}