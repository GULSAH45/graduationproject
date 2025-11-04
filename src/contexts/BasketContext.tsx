import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/Product";

// Ürün tipini ihtiyaca göre genişletebilirsin
// export type Product = {
//   id: string;
//   name: string;
//   price: number;
//   photo: string; // ürün görseli
//   desc: string; // kısa açıklama
//   size: string; // gramaj veya boyut
//   quantity: number; // sepetteki adet
// };

type BasketContextType = {
  basket: Product[];
  addToBasket: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromBasket: (productId: string) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Product[]>([]);

  const addToBasket = (product: Product) => {
    // Eğer ürün sepette varsa, quantity artır
    setBasket((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const increaseQuantity = (productId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeFromBasket = (productId: string) => {
    setBasket((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, increaseQuantity, decreaseQuantity, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
}; 