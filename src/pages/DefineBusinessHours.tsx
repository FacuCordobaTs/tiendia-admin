import AdminSidebar from "@/components/AdminSidebar"
import { BusinessHours } from "@/components/BusinessHours"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { Clock } from "lucide-react"
import { useState } from "react"

type TimeSlot = {
    start: string
    end: string
}

type DaySchedule = {
    name: string
    active: boolean
    timeSlots: TimeSlot[]
}

const initialSchedule: DaySchedule[] = [
    { name: 'Lunes', active: false, timeSlots: [] },
    { name: 'Martes', active: false, timeSlots: [] },
    { name: 'Miércoles', active: false, timeSlots: [] },
    { name: 'Jueves', active: false, timeSlots: [] },
    { name: 'Viernes', active: false, timeSlots: [] },
    { name: 'Sábado', active: false, timeSlots: [] },
    { name: 'Domingo', active: false, timeSlots: [] },
]

const DefineBusinessHours = () => {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false)
  const [schedule, setSchedule] = useState<DaySchedule[]>(user?.businessHours || initialSchedule)


  const handleSaveBusinessHours = async () => {
    setIsSaving(true)
    if (user) {
      await updateProfile(user.username, user.shopname, user.address ? user.address : '', '', schedule);
    }
    setIsSaving(false)
  }

  return (
    <div>
      <AdminSidebar />
      <Card className="md:mt-6 md:ml-72 mt-24 ml-4 mr-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
              Horarios
          </CardTitle>
          <CardDescription>
            Define los horarios en los que permites recibir pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessHours schedule={schedule}  setSchedule={setSchedule}/>
        </CardContent>
        <CardFooter>
          
          <Button 
          className="ml-auto"
            onClick={() => handleSaveBusinessHours()}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Horarios'}
            Guardar Horarios
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DefineBusinessHours