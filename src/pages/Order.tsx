import React, { ReactElement, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useOrder } from "@/context/OrderContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge, } from "@/components/ui/badge";
import { Loader, ArrowLeft, Truck, Wallet, CheckCircle } from "lucide-react";
import OrderProductCard from "@/components/OrderProductCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const { selectedOrder: order, loading, error, fetchOrderById, togglePaid } = useOrder();


  const handleMarkAsPaid = () => {
    if (id) togglePaid(Number(id));
  };

  useEffect(() => {
    if (id) fetchOrderById(parseInt(id));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Loader className="animate-spin h-12 w-12 text-primary" />
    </div>
  );

  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 text-center text-destructive bg-destructive/10 rounded-lg mx-auto max-w-2xl"
    >
      Error cargando orden: {error}
    </motion.div>
  );

  if (!order) return <div>Orden no encontrada</div>;


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Button 
          asChild
          variant="ghost" 
          className="gap-2 hover:bg-accent/50"
        >
          <Link to="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver a órdenes</span>
          </Link>
        </Button>

        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Orden #{order.id}
                </CardTitle>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {order.createdAt && new Date(order.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p className="text-md font-semibold text-foreground">
                    {order.createdAt && new Date(order.createdAt).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <Badge 
                variant={order.paid ? "default" : "secondary"}
                className="text-sm px-3 py-1 rounded-full"
              >
                {order.paid ? 'Completada' : 'Pendiente'}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={order.paid ? "secondary" : "default"}
                className="gap-2 transition-all"
                onClick={handleMarkAsPaid}
              >
                <CheckCircle className="h-4 w-4" />
                {order.paid ? 'Marcar como no pagada' : 'Marcar como pagada'}
              </Button>
              <Badge 
                variant={order.paid ? "default" : "secondary"}
                className="text-sm px-3 py-1 rounded-full"
              >
                {order.paid ? 'Completada' : 'Pendiente'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            {/* Sección Izquierda */}
            <div className="space-y-6">
              <Section title="Detalles de Pago" icon={<Wallet />}>
                <InfoRow label="Método"  value={order.paymentMethod === 'mercadopago' ? '💳 Mercado Pago' : '💸 Efectivo'} />
                <InfoRow label="Total" value={`$${order.totalPrice.toFixed(2)}`} />
                <InfoRow 
                  label="Estado" 
                  value={
                    <span className={cn(
                      "font-medium",
                      order.paid ? "text-success" : "text-warning"
                    )}>
                      {order.paid ? '💰 Pagado' : '⏳ Pendiente'}
                    </span>
                  }
                />
              </Section>

              <Section title="Entrega" icon={<Truck />}>
                <InfoRow label="Tipo" value={order.deliveryType === 'delivery' ? '🛵 Delivery' : '🏪 Retiro en local'} />
                {order.address && <InfoRow label="Dirección" value={`🏠 ${order.address}`} />}
                <InfoRow label="Contacto" value={`📞${order.phoneNumber}`} />
              </Section>
            </div>

            {/* Sección Derecha */}
            <div className="space-y-6">
              <Section title={`Productos (${order.items.length})`}>
                <motion.div 
                  layout
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {order.items.map((item) => (
                    <OrderProductCard
                      key={item.id}
                      productId={item.productId}
                      comment={item.comment}
                      size={item.size}
                    />
                  ))}
                </motion.div>
              </Section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Section = ({ title, icon, children }: { 
  title: string; 
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
      {icon && React.cloneElement(icon as ReactElement<any>, { className: "h-5 w-5 text-primary" })}
      {title}
    </h3>
    <div className="space-y-3 pl-7">
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center gap-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground text-right">{value}</span>
  </div>
);