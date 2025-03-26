import AddProductForm from "@/components/AddProductForm"
import AdminProductCard from "@/components/AdminProductCard"
// import { Button } from "@/components/ui/button"
import { useProduct } from "@/context/ProductContext"
import { useEffect, useState } from "react"
import AdminSidebar from "@/components/AdminSidebar"

export interface Product {
    id: number;
    imageURL: string | null;
    name: string;
    description: string;
    price: number;
    sizes?: { size: string; stock: number; }[];
}

export default function AdminDashboard() {
    const { products, getProducts } = useProduct();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        getProducts()
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="md:ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Administración de Productos</h1>
                        <Button onClick={handleEnableNotifications}>
                            Activar Notificaciones
                        </Button>
                    </div>
                     */}
                    {
                    isDialogOpen &&
                    <AddProductForm 
                        open={isDialogOpen}
                        onOpenChange={(open) => {
                            setIsDialogOpen(open);
                        }}
                        initialValues={editingProduct}
                    />
                    }
                    
                    <div className="grid gap-6 md:grid-cols-2  justify-items-center ">
                        {products.map((product) => (
                            <AdminProductCard 
                                key={product.id} 
                                product={product} 
                                onEdit={() => {
                                    setEditingProduct(product);
                                    setIsDialogOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}