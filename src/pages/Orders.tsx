import { useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { useOrder } from "@/context/OrderContext";
import { Skeleton } from "@/components/ui/skeleton";
import AdminSidebar from "@/components/AdminSidebar";

export default function Orders() {
  const { orders, loading, error, fetchOrders, deleteOrder } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) return (
    <div className="p-8 text-center text-red-500">
      Error cargando órdenes: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <AdminSidebar/>
      <div className="md:ml-64 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 mt-12 md:mt-0">
          <h1 className="text-3xl font-bold">Gestión de Órdenes</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onDelete={deleteOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}