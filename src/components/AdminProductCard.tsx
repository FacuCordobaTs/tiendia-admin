import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useProduct } from "@/context/ProductContext";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";

interface Product {
  id: number;
  imageURL: string | null;
  name: string;
  description: string;
  price: number;
  sizes?: { size: string; stock: number }[]; // Para productos con variantes
  stock?: number; // Para productos sin variantes
}

export default function AdminProductCard({ product, onEdit }: { 
  product: Product;
  onEdit: () => void;
}) {
  const { deleteProduct } = useProduct();
  const { name, price, description, imageURL, sizes, stock } = product;

  const handleDelete = (id: number, name: string) => {
    toast((t: any) => (
      <div>
        <p className="text-white">¿Seguro que quieres eliminar <strong>{name}</strong>?</p>
        <div className="mt-2">
          <button 
            className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded text-sm mx-1 text-white"
            onClick={() => { deleteProduct(id); toast.dismiss(t.id); }}
          >
            Eliminar
          </button>
          <button 
            className="bg-gray-400 hover:bg-gray-500 px-3 py-2 rounded mx-1 text-white"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { style: { background: "#202020" } });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-full hover:cursor-pointer">
          <div className="w-full border-b bg-muted/50">
            <AspectRatio ratio={4 / 3} className="bg-gradient-to-br from-muted/20 to-muted/50">
              {imageURL ? (
                <img
                  src={"http://localhost:3000" + imageURL}
                  alt={name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground/50">
                  <span className="text-sm">Sin imagen</span>
                </div>
              )}
            </AspectRatio>
          </div>

          <div className="p-4 flex flex-col justify-between h-[140px]">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold truncate">{name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">ARS</span>
                <p className="text-xl font-bold text-primary">${price}</p>
              </div>
            </div>
          </div>
        </Card>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle data-view-transition-name={`product-title-${product.id}`}>
              {product.name}
            </DrawerTitle>
            <DrawerDescription>{product.description}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            {imageURL ? (
              <img
                src={"http://localhost:3000" + imageURL}
                alt={name}
                className="w-full h-48 object-cover rounded-lg"
                data-view-transition-name={`product-image-${product.id}`}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg" />
            )}

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">${price}</span>
            </div>

            {/* Sección de inventario */}
            {sizes && sizes.length > 0 ? (
              <div className="space-y-2">
                <h4 className="font-semibold">Talles y Stock</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((item) => (
                    <Badge key={item.size} variant="outline" className="rounded-full">
                      {item.size} - {item.stock}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="font-semibold">Stock</h4>
                <p>{stock !== undefined ? stock : "No disponible"}</p>
              </div>
            )}
          </div>

          <DrawerFooter>
            <div className="flex gap-2 w-full">
              <Button onClick={onEdit} variant="outline" className="flex-1">
                <FiEdit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleDelete(product.id, product.name)}
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}