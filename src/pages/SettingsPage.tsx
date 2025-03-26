import { ChevronRight, User, Bell, CreditCard, Clock } from "lucide-react";
import { NavLink } from "react-router";
import AdminSidebar from "@/components/AdminSidebar";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 md:mt-0 md:ml-64">
      <AdminSidebar />
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Configuración de Tienda</h1>
          <p className="text-muted-foreground">
            Administra la información de tu tienda y preferencias
          </p>
        </div>

        <nav className="grid gap-2">
          <NavLink
            to="/settings/profile"
            end
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:bg-muted/50 ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />
              <span className="font-medium">Perfil</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground/80" />
          </NavLink>

          <NavLink
            to="/settings/notifications"
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:bg-muted/50 ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5" />
              <span className="font-medium">Notificaciones</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground/80" />
          </NavLink>

          <NavLink
            to="/settings/mpconnect"
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:bg-muted/50 ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Pagos</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground/80" />
          </NavLink>

          <NavLink
            to="/settings/businesshours"
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:bg-muted/50 ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Horarios</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground/80" />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}