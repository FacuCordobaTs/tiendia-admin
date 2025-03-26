import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(email, password)
    if (response) navigate('/home'); 
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-background to-muted/50">
      {/* Sección izquierda – Beneficios */}
      <div className="hidden lg:flex flex-col gap-8 p-12 bg-muted/20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            🚀 ¡Bienvenido de nuevo!
          </h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3">
              🌐 <span className="font-medium">Accede a tu tienda inteligente</span>
            </li>
            <li className="flex items-center gap-3">
              💳 <span className="font-medium">Gestiona tus pagos sin complicaciones</span>
            </li>
            <li className="flex items-center gap-3">
              🤖 <span className="font-medium">Aprovecha la inteligencia artificial</span>
            </li>
            <li className="flex items-center gap-3">
              📲 <span className="font-medium">Recibe notificaciones en tiempo real</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sección derecha – Formulario de inicio de sesión */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">tiendia.app</h1>
            <p className="text-muted-foreground">
              Plataforma de ecommerce impulsada por IA
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full gap-2">
              <FaGoogle className="h-4 w-4" />
              Continuar con Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O ingresa con email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="w-full" type="submit">
                Iniciar sesión
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" onClick={() => navigate('/register')}>
                ¿No tienes cuenta? Regístrate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
