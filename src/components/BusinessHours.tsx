import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Plus, Trash, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type TimeSlot = {
  start: string
  end: string
}

type DaySchedule = {
  name: string
  active: boolean
  timeSlots: TimeSlot[]
}

export const BusinessHours = ({ schedule, setSchedule }: { schedule: DaySchedule[], setSchedule: (schedule: DaySchedule[]) => void }) => {

  const toggleDay = (dayIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].active = !newSchedule[dayIndex].active
    if (!newSchedule[dayIndex].active) {
      newSchedule[dayIndex].timeSlots = []
    }
    setSchedule(newSchedule)
  }

  const addTimeSlot = (dayIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].timeSlots.push({
      start: '09:00',
      end: '13:00'
    })
    setSchedule(newSchedule)
  }

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].timeSlots.splice(slotIndex, 1)
    setSchedule(newSchedule)
  }

  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].timeSlots[slotIndex][field] = value
    setSchedule(newSchedule)
  }

  return (
    <div className="w-full space-y-4">
      {schedule.map((day, dayIndex) => (
        <div
          key={day.name}
          className="bg-background rounded-xl p-4 shadow-sm border transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={day.active}
                onCheckedChange={() => toggleDay(dayIndex)}
              />
              <span className="font-medium">{day.name}</span>
              {day.active && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            {day.active && (
              <Button
                size="sm"
                onClick={() => addTimeSlot(dayIndex)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar horario
              </Button>
            )}
          </div>

          {day.active && (
            <div className="mt-4 space-y-3">
              {day.timeSlots.map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="flex items-center gap-3 group"
                >
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      handleTimeChange(dayIndex, slotIndex, 'start', e.target.value)
                    }
                    className="rounded-lg border p-2 focus:ring-2 focus:ring-primary transition-all"
                  />
                  <span className="text-muted-foreground">a</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      handleTimeChange(dayIndex, slotIndex, 'end', e.target.value)
                    }
                    className="rounded-lg border p-2 focus:ring-2 focus:ring-primary transition-all"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'opacity-0 group-hover:opacity-100 transition-opacity',
                      'text-red-500 hover:bg-red-50'
                    )}
                    onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}