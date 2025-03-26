import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Truck, Wallet, Clock, CheckCircle, Trash2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Order {
  id: number;
  totalPrice: number;
  phoneNumber: string;
  address?: string;
  createdAt: string;
  paymentMethod: string;
  deliveryType: string;
  paid: boolean;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  productId: number;
  comment?: string;
  createdAt: string;
}

interface OrderCardProps {
  order: Order;
  onDelete: (id: number) => void;
}

export default function OrderCard({ order, onDelete }: OrderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
        {/* Status Indicator Bar */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-1.5",
            order.paid ? "bg-green-400" : "bg-yellow-400"
          )}
        />

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Main Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  Orden #{order.id}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(order.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              
              <Badge
                variant={order.paid ? "default" : "secondary"}
                className="rounded-full py-1 px-3 gap-1"
              >
                {order.paid ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                <span>{order.paid ? "Completada" : "Pendiente"}</span>
              </Badge>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Método</p>
                  <p className="font-medium">
                    {order.paymentMethod === "mercadopago"
                      ? "Mercado Pago"
                      : "Efectivo"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Entrega</p>
                  <p className="font-medium">
                    {order.deliveryType === "delivery"
                      ? "Delivery"
                      : "Retiro en local"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col items-end gap-4 border-l pl-6 md:min-w-[180px]">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Link to={`/admin/orders/${order.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 hover:bg-primary/10"
                >
                  <Eye className="h-4 w-4" />
                  <span>Detalles</span>
                </Button>
              </Link>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(order.id)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only md:not-sr-only">Eliminar</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}