import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const { signUpInfo, setSignUpInfo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de registro
    if (signUpInfo.email && signUpInfo.password) {
      navigate('/setup');
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-background to-muted/50">
      {/* Sección izquierda – Beneficios */}
      <div className="hidden lg:flex flex-col gap-8 p-12 bg-muted/20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            🚀 Crea tu tienda inteligente
          </h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3">
              🌐 <span className="font-medium">Tienda online lista en minutos</span>
            </li>
            <li className="flex items-center gap-3">
              💳 <span className="font-medium">Pagos sin comisiones</span>
            </li>
            <li className="flex items-center gap-3">
              🤖 <span className="font-medium">Gestión autónoma con IA</span>
            </li>
            <li className="flex items-center gap-3">
              📲 <span className="font-medium">App de notificaciones integrada</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sección derecha – Formulario de registro */}
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
                  O crea tu cuenta con email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="tu@email.com"
                  value={signUpInfo.email || ''}
                  onChange={(e) => setSignUpInfo({ ...signUpInfo, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={signUpInfo.password || ''}
                  onChange={(e) => setSignUpInfo({ ...signUpInfo, password: e.target.value })}
                />
              </div>

              <Button className="w-full" type="submit">
                Crear cuenta
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" onClick={() => navigate('/signin')}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
