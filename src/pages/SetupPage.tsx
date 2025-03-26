import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SetupPage() {
    const {signUpInfo, setSignUpInfo, register} = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(signUpInfo.category || null);
    const navigate = useNavigate();

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setSignUpInfo({...signUpInfo, category});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedCategory) {
            setError("Debes seleccionar una categoría");
            return;
        }

        setError(null);

        try {
            const result = await register();
            if (result) navigate('/plan')
        } catch (err) {
            setError("Error al crear la tienda. Por favor intenta nuevamente.");
            console.log(error);
        }
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Sección izquierda - Beneficios */}
            <div className="hidden lg:flex flex-col gap-8 p-12 bg-muted/20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Configura tu tienda</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            👗 <span className="font-medium">Especializado en moda y alimentos</span>
                        </div>
                        <div className="flex items-center gap-3">
                            🛒 <span className="font-medium">Interfaz estándar optimizada</span>
                        </div>
                        <div className="flex items-center gap-3">
                            📈 <span className="font-medium">Dashboard de gestión inteligente</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario derecha */}
            <div className="flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold">Completa tu perfil</h1>
                        <p className="text-muted-foreground">
                            Configura los datos básicos de tu tienda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nueva sección de categoría */}
                        <div className="space-y-2">
                            <Label>Tipo de tienda *</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant={selectedCategory === 'ropa' ? 'default' : 'outline'}
                                    className="h-24 flex-col gap-2"
                                    onClick={() => handleCategorySelect('ropa')}
                                >
                                    👗 Ropa
                                    {selectedCategory === 'ropa' && (
                                        <span className="text-xs text-green-500">✓ Seleccionado</span>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant={selectedCategory === 'comida' ? 'default' : 'outline'}
                                    className="h-24 flex-col gap-2"
                                    onClick={() => handleCategorySelect('comida')}
                                >
                                    🍔 Comida
                                    {selectedCategory === 'comida' && (
                                        <span className="text-xs text-green-500">✓ Seleccionado</span>
                                    )}
                                </Button>
                            </div>
                            {error && !selectedCategory && (
                                <p className="text-sm text-red-500">Debes seleccionar una categoría</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Nombre de la tienda *</Label>
                            <Input 
                                placeholder="Ej: Moda Urbana" 
                                value={signUpInfo.shopname || ''} 
                                onChange={(e) => setSignUpInfo({...signUpInfo, shopname: e.target.value})} 
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Nombre de usuario *</Label>
                            <Input 
                                value={signUpInfo.username || ''}
                                onChange={(e) => setSignUpInfo({
                                    ...signUpInfo, 
                                    username: e.target.value.replace(/\s/g, '')
                                })}
                                placeholder="Ej: modaurbana"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Tu URL: www.shop.ai/{signUpInfo.username || 'username'}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Dirección (opcional)</Label>
                            <Input 
                                placeholder="Ej: Av. Principal 123" 
                                value={signUpInfo.address || ''} 
                                onChange={(e) => setSignUpInfo({...signUpInfo, address: e.target.value})} 
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <Button className="w-full" type="submit">
                            Crear tienda
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}