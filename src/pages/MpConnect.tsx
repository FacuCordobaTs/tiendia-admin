import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { usePayment } from "@/context/PaymentContext"
import { ShieldCheck } from "lucide-react"

const MpConnect = () => {
  const { user } = useAuth();

  const { authorize } = usePayment()

  const handleMPConnect = async () => {
     const url = await authorize()
     window.location.href = url;
  }

  return (
    <div>
      <AdminSidebar />
      <Card className="md:mt-6 md:ml-72 mt-24 ml-4 mr-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Conexión con Mercado Pago
          </CardTitle>
          <CardDescription>
            Conecta tu cuenta para habilitar pagos en tu tienda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-1">
              <p className="font-medium">Estado de conexión</p>
              <p className="text-sm text-muted-foreground">
              {
              (user?.mp_access_token)? 
                // {(user?.mp_access_token && user?.mp_token_expires)? 
                "Cuenta conectada":
                  // "Cuenta conectada (vence: " + new Date(user.mp_token_expires).toLocaleDateString() + ")" : 
                "No conectado"
              }
              </p>
            </div>
            <Button 
              variant={user?.mp_access_token ? "outline" : "default"}
              onClick={handleMPConnect}
            >
              {user?.mp_access_token ? "Reconectar" : "Conectar Cuenta"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MpConnect