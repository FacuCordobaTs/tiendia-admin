import { useState, useEffect } from 'react';
import { useProduct } from '@/context/ProductContext';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, X } from 'lucide-react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Product {
  id: number;
  imageURL: string | null;
  name: string;
  description: string;
  price: number;
  sizes?: { size: string; stock: number }[]; // Cambiado para incluir stock por talle
  stock?: number; // Stock general para productos sin variantes
}

export interface AddProductFormProps { 
  initialValues?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductForm = ({ initialValues, open, onOpenChange }: AddProductFormProps) => {
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    description: '',
    imageFile: null as File | null,
    stock: '', // Nuevo campo para stock general
  });
  const { addProduct, updateProduct } = useProduct();
  const [state, setState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>([]); // Arreglo de talles con stock
  const [sizeInput, setSizeInput] = useState(''); // Input para talle
  const [stockInput, setStockInput] = useState(''); // Input para stock por talle
  const { user } = useAuth();

  // Función para agregar un talle con su stock
  const handleAddSize = () => {
    const newSize = sizeInput.trim().toUpperCase();
    const newStock = parseInt(stockInput.trim(), 10);
    if (newSize && !isNaN(newStock) && newStock >= 0) {
      setSizes([...sizes, { size: newSize, stock: newStock }]);
      setSizeInput('');
      setStockInput('');
    }
  };

  // Función para eliminar un talle
  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const toBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const readFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setImagePreview(reader.result as string);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (initialValues) {
        if (formValues.imageFile) {
          const imageBase64 = await toBase64(formValues.imageFile);
          await updateProduct(
            initialValues.id,
            formValues.name,
            Number(formValues.price),
            formValues.description,
            imageBase64,
            user?.category === 'ropa' ? sizes : null,
            user?.category !== 'ropa' ? parseInt(formValues.stock, 10) : null,
          );
        } else {
          await updateProduct(
            initialValues.id,
            formValues.name,
            Number(formValues.price),
            formValues.description,
            null,
            user?.category === 'ropa' ? sizes : null,
            user?.category !== 'ropa' ? parseInt(formValues.stock, 10) : null,
          );
        }
      } else {
        if (formValues.imageFile) {
          const imageBase64 = await toBase64(formValues.imageFile);
          await addProduct(
            formValues.name,
            Number(formValues.price),
            imageBase64,
            formValues.description,
            user?.category === 'ropa' ? sizes : null,
            user?.category !== 'ropa' ? parseInt(formValues.stock, 10) : sizes.map((item) => item.stock).reduce((a, b) => a + b, 0),
          );
        } else {
          await addProduct(
            formValues.name,
            Number(formValues.price),
            null,
            formValues.description,
            user?.category === 'ropa' ? sizes : null,
            user?.category !== 'ropa' ? parseInt(formValues.stock, 10) : null,
          );
        }
      }
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    if (open && initialValues) {
      setFormValues({
        name: initialValues.name,
        price: initialValues.price.toString(),
        description: initialValues.description,
        imageFile: null,
        stock: initialValues.stock ? initialValues.stock.toString() : '',
      });
      setSizes(initialValues.sizes || []);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setFormValues({
        name: '',
        price: '',
        description: '',
        imageFile: null,
        stock: '',
      });
      setState(false);
      setSizes([]);
    } else {
      if (initialValues) {
        setFormValues({
          name: initialValues.name,
          price: initialValues.price.toString(),
          description: initialValues.description,
          imageFile: null,
          stock: initialValues.stock ? initialValues.stock.toString() : '',
        });
        if (initialValues.imageURL) {
          setImagePreview('http://localhost:3000' + initialValues.imageURL);
          setState(true);
        }
        setSizes(initialValues.sizes || []);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!initialValues && (
        <DialogTrigger asChild>
          <button
            className='flex items-center gap-2 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground'
          >
            <PlusCircle className="h-5 w-5" />
            Agregar Producto
          </button>
        </DialogTrigger>
      )}
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {initialValues ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] overflow-y-auto pr-4">
          <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                value={formValues.price}
                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                placeholder="Precio en USD"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                placeholder="Descripción detallada"
                required
              />
            </div>

            {user?.category !== 'ropa' && (
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formValues.stock}
                  onChange={(e) => setFormValues({ ...formValues, stock: e.target.value })}
                  placeholder="Cantidad en stock"
                  required
                />
              </div>
            )}

            {user?.category === 'ropa' && (
              <div className="space-y-2">
                <Label>Talles y Stock</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{item.size} - {item.stock}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Talle (Ej: S, M, L)"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Stock"
                    type="number"
                    value={stockInput}
                    onChange={(e) => setStockInput(e.target.value)}
                    className="w-20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSize}
                    disabled={!sizeInput.trim() || !stockInput.trim()}
                  >
                    Agregar
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ingresa el talle y su stock correspondiente
                </p>
              </div>
            )}

            <Label htmlFor="image">
              {state ? (
                <div className="resultado">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      className="object-cover h-32 w-32 hover:cursor-pointer"
                      alt="Preview"
                    />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center bg-neutral-900 text-white rounded py-3 cursor-pointer hover:bg-neutral-800">
                  <FaCloudUploadAlt className="h-4 w-4 mr-2 mb-1" /> Imagen
                </div>
              )}
            </Label>

            <input 
              type="file" 
              name="imageFile" 
              className="absolute invisible"
              id="image"
              onChange={(e) => {
                if (e.target && e.target.files) {
                  readFile(e.target.files[0]);
                  setFormValues({ ...formValues, imageFile: e.target.files[0] });
                }
                setState(true);
              }}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : initialValues ? (
                  'Actualizar Producto'
                ) : (
                  'Guardar Producto'
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;