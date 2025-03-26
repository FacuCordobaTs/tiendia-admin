import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import DefineBusinessHours from '@/components/DefineBusinessHours'
import Notifications from '@/components/Notifications'
import { Progress } from '@/components/ui/progress'
import Profile from '@/components/Profile'
import AdminSidebar from '@/components/AdminSidebar'
import PaymentSettings from '@/components/PaymentSettings'

const CompleteProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const totalSteps = 4

  const steps = [
    { id: 1, title: 'Perfil de la tienda', component: <Profile /> },
    { id: 2, title: 'Horarios', component: <DefineBusinessHours /> },
    { id: 3, title: 'Notificaciones', component: <Notifications /> },
    { id: 4, title: 'Pagos', component: <PaymentSettings /> }
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => {
        const newStep = prev + 1
        if (!completedSteps.includes(prev)) {
          setCompletedSteps([...completedSteps, prev])
        }
        return newStep
      })
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const ProgressIndicator = () => (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <Progress value={(currentStep / totalSteps) * 100} className="h-2 w-full" />
      <div className="flex justify-between w-full px-4">
        {steps.map(step => (
          <div 
            key={step.id}
            className={`flex flex-col items-center ${
              currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 
              ${completedSteps.includes(step.id) ? 'bg-green-500 text-white' : 
              currentStep === step.id ? 'bg-primary text-white' : 'bg-muted'}`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="text-sm text-center">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 md:pl-48">
      <AdminSidebar/>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            Completa tu perfil ({currentStep} de {totalSteps})
          </h1>
        </CardHeader>
        
        <CardContent>
          <ProgressIndicator />
          
          <div className="space-y-6">
            {steps.find(step => step.id === currentStep)?.component}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            {currentStep === totalSteps ? (
              <Button className="gap-2">
                Finalizar
                <CheckCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CompleteProfilePage