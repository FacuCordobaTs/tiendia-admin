import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function PaymentModal() {
  const { user, showPaymentModal, setShowPaymentModal } = useAuth();

  if (!user) return null;

  // Calcular fechas y días restantes
  const calculatePaymentInfo = () => {
    let dueDate: Date;
    
    if (user.nextPaymentDate) {
      dueDate = new Date(user.nextPaymentDate);
    } else {
      const createdAt = new Date(user.createdAt);
      dueDate = new Date(createdAt);
      dueDate.setMonth(createdAt.getMonth() + 1);
    }

    const cutoffDate = new Date(dueDate);
    cutoffDate.setDate(dueDate.getDate() + 5);
    
    const currentDate = new Date();
    const remainingDays = Math.ceil((cutoffDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    
    const formattedDate = cutoffDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return { formattedDate, remainingDays };
  };

  const { formattedDate, remainingDays } = calculatePaymentInfo();

  return (
    <Dialog open={showPaymentModal} onOpenChange={(open) => setShowPaymentModal(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pago Requerido</DialogTitle>
          <DialogDescription>
            Para continuar usando ShopAI, realiza el pago de tu suscripción mensual antes del {formattedDate}. 
            <span className="block mt-1 text-sm font-semibold">({remainingDays} días restantes)</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
            Cerrar
          </Button>
          <Button onClick={() => (window.location.href = "/plan")}>
            Pagar Ahora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}