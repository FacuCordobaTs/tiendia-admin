import { AlertTriangle } from "lucide-react";
import { NavLink } from "react-router";

const ProfileAlert = () => (
  <NavLink
    to="/completeProfile"
    className="mt-4 w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg flex items-center gap-2 hover:bg-yellow-200 transition-colors"
  >
    <AlertTriangle className="h-5 w-5" />
    <div>
      <p className="font-medium">¡Perfil incompleto!</p>
      <p className="text-sm">Completa tu perfil para habilitar todas las funciones</p>
    </div>
  </NavLink>
);

export default ProfileAlert