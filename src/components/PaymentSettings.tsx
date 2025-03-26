import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { usePayment } from "@/context/PaymentContext";
import { ShieldCheck, MessageSquare } from "lucide-react";

const PaymentSettings = ({ onComplete }: { onComplete?: () => void }) => {
  const { user, updateProfile } = useAuth(); // Asumimos que updateUser existe para guardar cambios
  const { authorize } = usePayment();

  // Estado inicial basado en la configuración del usuario, por defecto "mercadopago"
  // const [selectedMethod, setSelectedMethod] = useState(user?.paymentMethod || 'mercadopago');
  const [whatsappNumber, setWhatsappNumber] = useState(user?.whatsappNumber || '');
  const [selectedMethod, setSelectedMethod] = useState(user?.whatsappNumber ? 'whatsapp': 'mercadopago');

  // Manejar cambio de opción
  const handleMethodChange = (method: 'mercadopago' | 'whatsapp') => {
    setSelectedMethod(method);
  };

  // Conectar con Mercado Pago
  const handleMPConnect = async () => {
    const url = await authorize();
    onComplete && onComplete();
    window.location.href = url;
  };

  // Guardar número de WhatsApp
  const handleSaveWhatsapp = async () => {
    if (whatsappNumber) {
      await updateProfile(
        user?.username || '',
        user?.shopname || '',
        user?.address || '',
        '',
        undefined, // Assuming businessHours is optional
        'whatsapp',
        whatsappNumber
      );
      onComplete && onComplete();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Método de recepción de pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Opción Mercado Pago */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="mercadopago"
                checked={selectedMethod === 'mercadopago'}
                onChange={() => handleMethodChange('mercadopago')}
                className="cursor-pointer"
              />
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-medium">Mercado Pago</span>
            </label>
            {selectedMethod === 'mercadopago' && (
              <div className="ml-6 mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Conecta tu cuenta de Mercado Pago para recibir pagos directamente en tu tienda y gestionar las notificaciones de pedidos a través de la aplicación.
                </p>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="font-medium">Estado de conexión</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.mp_access_token ? "Cuenta conectada" : "No conectado"}
                    </p>
                  </div>
                  <Button
                    variant={user?.mp_access_token ? "outline" : "default"}
                    onClick={handleMPConnect}
                  >
                    {user?.mp_access_token ? "Reconectar" : "Conectar Cuenta"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Opción WhatsApp */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="whatsapp"
                checked={selectedMethod === 'whatsapp'}
                onChange={() => handleMethodChange('whatsapp')}
                className="cursor-pointer"
              />
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-medium">WhatsApp</span>
            </label>
            {selectedMethod === 'whatsapp' && (
              <div className="ml-6 mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Recibe los pedidos directamente en tu WhatsApp. Los clientes podrán enviarte un mensaje prearmado con los detalles del pedido. Tú serás responsable de gestionar el proceso de pago.
                </p>
                <Input
                  type="tel"
                  placeholder="Ingresa tu número de WhatsApp (ej: +541234567890)"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={handleSaveWhatsapp} disabled={!whatsappNumber}>
                  Guardar Número
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSettings;