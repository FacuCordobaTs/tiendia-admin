import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-hot-toast";
import AdminSidebar from "@/components/AdminSidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageURL: string | null;
  sizes?: { size: string; stock: number }[];
  stock?: number;
}

export default function InventoryPage() {
  const { products, getProducts, updateProduct } = useProduct();
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleStockChange = (productId: number, newStock: number) => {
    setLocalProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    );
  };

  const handleSizeStockChange = (productId: number, sizeIndex: number, newStock: number) => {
    setLocalProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.sizes
          ? {
              ...p,
              sizes: p.sizes.map((s, i) =>
                i === sizeIndex ? { ...s, stock: newStock } : s
              ),
            }
          : p
      )
    );
  };

  const handleSave = async (product: Product) => {
    try {
      await updateProduct(
        product.id,
        product.name,
        product.price,
        product.description,
        null, // No se actualiza la imagen
        product.sizes || null,
        product.stock || null
      );
      toast.success("Stock actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el stock");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:ml-64 mt-16 md:mt-0"> {/* ml-64 deja espacio para el sidebar */}
        <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>
        <ScrollArea className="h-[80vh]">
          {localProducts.map((product) => (
            <Card key={product.id} className="mb-4">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {/* Mostrar la imagen del producto o un placeholder */}
                  {product.imageURL ? (
                    <img
                      src={"http://localhost:3000" + product.imageURL}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-sm text-gray-500">Sin imagen</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                </div>

                {/* Gestión de stock (talles o stock general) */}
                {product.sizes ? (
                  <div>
                    <Label>Talles y Stock</Label>
                    {product.sizes.map((item, index) => (
                      <div key={item.size} className="flex items-center gap-2 mb-2">
                        <span>{item.size}</span>
                        <Input
                          type="number"
                          value={item.stock}
                          onChange={(e) =>
                            handleSizeStockChange(product.id, index, Number(e.target.value))
                          }
                          className="w-20"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      value={product.stock || 0}
                      onChange={(e) =>
                        handleStockChange(product.id, Number(e.target.value))
                      }
                      className="w-20"
                    />
                  </div>
                )}
                <Button
                  onClick={() => handleSave(product)}
                  className="mt-4"
                >
                  Guardar
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}