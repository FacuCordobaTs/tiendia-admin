import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";
import { Loader } from "lucide-react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Loader className="animate-spin h-12 w-12 text-primary" />
    </div>
  );

  if (!user) return <Navigate to="/signin" />;

  // Calcular fechas importantes
  const getPaymentDates = () => {
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
    
    return { dueDate, cutoffDate };
  };

  const { cutoffDate } = getPaymentDates();
  const currentDate = new Date();

  // Redirigir si han pasado 5 días desde el vencimiento
  if (currentDate > cutoffDate) {
    return <Navigate to="/plan" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;