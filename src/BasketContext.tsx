import React, { createContext, useContext, useState, ReactNode } from "react";

// Ürün tipini ihtiyaca göre genişletebilirsin
export type Product = {
  id: string;
  name: string;
  price: number;
  photo: string; // ürün görseli
  desc: string; // kısa açıklama
  size: string; // gramaj veya boyut
  quantity: number; // sepetteki adet
};

type BasketContextType = {
  basket: Product[];
  addToBasket: (product: Product) => void;
  // İleride remove/update fonksiyonları da eklenebilir
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
        return [...prev, product];
      }
    });
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
}; 