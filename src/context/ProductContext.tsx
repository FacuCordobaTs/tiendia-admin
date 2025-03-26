import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext.tsx";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageURL: string | null;
  createdAt: Date;
  createdBy: number;
  sizes?: { size: string; stock: number }[];
  stock?: number;
}

interface ProductContextType {
  products: Product[];
  getProduct: (id: number) => Promise<Product | null>;
  getProducts: () => Promise<void>;
  addProduct: (
    name: string,
    price: number,
    image: string | null,
    description: string,
    sizes: { size: string; stock: number }[] | null,
    stock: number | null
  ) => Promise<void>;
  updateProduct: (
    id: number,
    name: string,
    price: number,
    description: string,
    imageFile: string | null,
    sizes: { size: string; stock: number }[] | null,
    stock: number | null
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProduct must be used within a ProductProvider");
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const url = "https://api.tiendia.app/api";

  const getProducts = async () => {
    if (user) {
      try {
        const response = await fetch(url + "/products/list/" + user.username, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.products) {
          setProducts(
            data.products.map((p: any) => ({
              ...p,
              createdAt: new Date(p.createdAt),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const getProduct = async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(url + `/products/get/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      return data.products
        ? {
            ...data.products,
            createdAt: new Date(data.products.createdAt),
          }
        : null;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const addProduct = async (
    name: string,
    price: number,
    image: string | null,
    description: string,
    sizes: { size: string; stock: number }[] | null,
    stock: number | null
  ) => {
    try {
      if (user) {
        const response = await fetch(url + "/products/create", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            price,
            description,
            image,
            username: user.username,
            sizes,
            stock,
          }),
        });
        if (!response.ok) {
          const data = await response.json();
          console.error(data.error);
        }
        const data = await response.json();
        const { product } = data;
        if (product) {
          setProducts((prev) => [
            ...prev,
            {
              ...product,
              createdAt: new Date(product.createdAt),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (
    id: number,
    name: string,
    price: number,
    description: string,
    imageBase64: string | null,
    sizes: { size: string; stock: number }[] | null,
    stock: number | null
  ) => {
    try {
      let response: Response | null = null;

      if (imageBase64) {
        response = await fetch(url + `/products/update`, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ id, name, price, description, imageBase64, sizes, stock }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        response = await fetch(url + `/products/update`, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ id, name, price, description, sizes, stock }),
          headers: { "Content-Type": "application/json" },
        });
      }
      if (response.ok) {
        const data = await response.json();
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...data.product, createdAt: new Date(data.product.createdAt) } : p
          )
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(url + `/products/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};