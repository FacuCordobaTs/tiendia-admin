import { useProduct } from "@/context/ProductContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageURL: string | null;
  createdAt: Date;
  createdBy: number;
}

interface OrderProductCardProps {
  productId: number;
  comment?: string;
  size?: string;
}

export default function OrderProductCard({ productId, comment, size }: OrderProductCardProps) {
  const { products, getProduct } = useProduct();
  const [product, setProduct] = useState<Product | undefined>()
  const findProduct = async ()=> {
    if (products.length > 0) { 
      setProduct(products.find(p => p.id === productId));
    }
    else {
      const result = await getProduct(productId)
      if (result) setProduct(result)
    }
  }

  useEffect(()=> {
    findProduct();
  }, [])

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        {product.imageURL ? (
          <img 
            src={'http://localhost:3000'+product.imageURL}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">Sin imagen</span>
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              {size && (
               
                <Badge
                variant="default"
                className="rounded-full"
                >
                {size}
              </Badge>
              )}
            </div>
          </div>
          
          {comment && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Nota:</span> {comment}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de carga esqueleto
export function OrderProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="w-20 h-20 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
}