// src/routes/SubscriptionPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Rocket, Info, ShieldCheck, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePayment } from '@/context/PaymentContext'
import { useAuth } from '@/context/AuthContext'

const PLAN_PRICES: { [key: string]: [number, string] } = {
  basic: [5000, 'Basico'],
  pro: [10000, 'Profesional'],
  auto: [50000, 'Piloto Automático']
};

const PLANS = [
  { 
    id: 'basic',
    label: 'Básico',
    price: '$5.000/mes',
    enabled: true
  },
  {
    id: 'pro',
    label: 'Profesional',
    price: '$10.000/mes',
    enabled: false
  },
  {
    id: 'auto',
    label: 'Piloto Automático',
    price: '$50.000/mes',
    enabled: false
  }
]

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('')
  const navigate = useNavigate()
  const { createSubscriptionPreference } = usePayment();

  const handleSubscribe = async () => {
    try {
      const init_point = await createSubscriptionPreference(selectedPlan);
      window.location.href = init_point;
    } catch (error) {
      // Manejar error
    }
  }

  if (user) {
    const isNewUser = new Date(user.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    if (isNewUser) return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl space-y-8 m-auto">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Configuración Rápida</span>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight">
              Elige tu Plan
            </h1>
            
            <p className="text-muted-foreground">
              Selecciona tu plan y comienza a utilizar la aplicacion con un mes gratis
            </p>
          </div>
  
          {/* Main Card */}
          <Card className="p-6 space-y-6">
            {/* Plan Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Paso 1: Selección de Plan
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-muted-foreground"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Comparar planes
                </Button>
              </div>
  
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecciona un plan..." />
                </SelectTrigger>
                <SelectContent>
                  {PLANS.map((plan) => (
                    <SelectItem 
                      key={plan.id}
                      value={plan.id}
                      disabled={!plan.enabled}
                      className="flex justify-between"
                    >
                      <span>{plan.label}</span>
                      <span className="text-muted-foreground">{plan.price}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            {/* Divider */}
            <div className="border-t" />
  
            {/* Connect Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Paso 2: Conexión de Pagos
              </h2>
              
              <Button
              className={`w-full transition-colors ${
                selectedPlan 
                  ? 'bg-[#00a1ea] hover:bg-[#0092d3]' 
                  : 'bg-muted text-muted-foreground'
              }`}
              disabled={!selectedPlan}
              onClick={() => navigate('/home')}
            >
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                Comenzar primer mes gratis
              </div>
            </Button>
              
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-primary" />
                <span>
                  No se te pedirá ningun metodo de pago hasta que finalice tu primer mes gratis.
                </span>
              </div>
            </div>
          </Card>
  
          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-lg font-medium">Sin Costo Inicial</div>
              <div className="text-sm text-muted-foreground">Sin tarifas ocultas</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-lg font-medium">Cancelación Fácil</div>
              <div className="text-sm text-muted-foreground">En cualquier momento</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl space-y-8 m-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <Zap className="h-4 w-4" />
            <span className="font-medium">Configuración Rápida</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">
            Continua utilizando Shop Ai
          </h1>
          
          <p className="text-muted-foreground">
            Selecciona tu plan preferido y paga tu cuota mensual
          </p>
        </div>

        {/* Main Card */}
        <Card className="p-6 space-y-6">
          {/* Plan Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Paso 1: Selección de Plan
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground"
              >
                <Info className="h-4 w-4 mr-2" />
                Comparar planes
              </Button>
            </div>

            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecciona un plan..." />
              </SelectTrigger>
              <SelectContent>
                {PLANS.map((plan) => (
                  <SelectItem 
                    key={plan.id}
                    value={plan.id}
                    disabled={!plan.enabled}
                    className="flex justify-between"
                  >
                    <span>{plan.label}</span>
                    <span className="text-muted-foreground">{plan.price}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Connect Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Paso 2: Conexión de Pagos
            </h2>
            
            <Button
              className={`w-full transition-colors ${
                selectedPlan 
                  ? 'bg-[#00a1ea] hover:bg-[#0092d3]' 
                  : 'bg-muted text-muted-foreground'
              }`}
              disabled={!selectedPlan}
              onClick={handleSubscribe}
            >
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                {selectedPlan ? `Pagar el Plan ${PLAN_PRICES[selectedPlan][1]}` : 'Selecciona un plan'}
              </div>
            </Button>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 mt-0.5 text-primary" />
              <span>
                Suscripción segura mediante Mercado Pago. 
                Serás redirigido para completar el pago.
              </span>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-lg font-medium">Sin Costo Inicial</div>
            <div className="text-sm text-muted-foreground">Sin tarifas ocultas</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-lg font-medium">Cancelación Fácil</div>
            <div className="text-sm text-muted-foreground">En cualquier momento</div>
          </div>
        </div>
      </div>
    </div>
  )
}