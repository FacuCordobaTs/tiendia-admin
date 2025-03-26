import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing } from "lucide-react"
import { messaging } from "@/firebase";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const Notifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { user } = useAuth();
  const url =  'http://localhost:3000/api';

  const handleEnableNotifications = async () => {
    try {
      if (user) { 
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, { 
              vapidKey: 'BKaaXFfpqIMpYwDgvxw8VUvdeTA-zGA6q7wbfPoE3NJY8ImL1vEgn3pFIjppa-9vN5uVODIjSu-4e2-m0U-VHKo'
          });
          
          const response = await fetch(url+'/auth/fcm-token', {
              method: 'PUT',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token, id: user.id })
          });
          console.log(response)
          const data = await response.json()
          console.log(data)

          setNotificationsEnabled(true);
          toast.success("Notificaciones activadas");
        }
      }
    } catch (error) {
      toast.error("Hubo un error");
    }
  };

  useEffect(()=> {
    const verifyNotifications = async () => {
      const token = await getToken(messaging, { 
        vapidKey: 'BKaaXFfpqIMpYwDgvxw8VUvdeTA-zGA6q7wbfPoE3NJY8ImL1vEgn3pFIjppa-9vN5uVODIjSu-4e2-m0U-VHKo'
      });
      console.log(user?.fcmToken)
      if (token == user?.fcmToken) {
        setNotificationsEnabled(true);
      }
    }
    verifyNotifications();
  }, [])

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
            <BellRing className="h-6 w-6 text-primary" />
            Configuración de Notificaciones
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-1">
                <p className="font-medium">Notificaciones push</p>
                <p className="text-sm text-muted-foreground">
                Recibe actualizaciones importantes sobre tus pedidos
                </p>
            </div>

            <Button 
                onClick={handleEnableNotifications}
                disabled={notificationsEnabled}
                className="gap-2"
            >
                <BellRing className="h-4 w-4" />
                {notificationsEnabled ? "Activadas" : "Activar Notificaciones"}
            </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default Notifications