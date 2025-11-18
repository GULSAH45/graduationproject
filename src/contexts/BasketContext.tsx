import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/Product";
import uuid from 'react-native-uuid';

// UUID oluşturucu fonksiyon
const generateUUID = (): string => {
  return uuid.v4() as string;
};

type BasketContextType = {
  basket: Product[];
  addToBasket: (product: Product) => void;
  increaseQuantity: (basketItemId: string) => void;
  decreaseQuantity: (basketItemId: string) => void;
  removeFromBasket: (basketItemId: string) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Product[]>([]);

  const addToBasket = (product: Product) => {
    // Eğer ürün sepette varsa ve aynı variant ise, quantity artır
    setBasket((prev) => {
      const existing = prev.find((item) => 
        item.id === product.id && 
        item.selectedVariant?.id === product.selectedVariant?.id
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedVariant?.id === product.selectedVariant?.id
            ? { ...item, quantity: (item.quantity || 0) + (product.quantity || 1) }
            : item
        );
      } else {
        // Yeni ürüne benzersiz basketItemId ata
        const newProduct = {
          ...product,
          basketItemId: generateUUID(),
          quantity: product.quantity || 1
        };
        return [...prev, newProduct];
      }
    });
  };

  const increaseQuantity = (basketItemId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.basketItemId === basketItemId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (basketItemId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.basketItemId === basketItemId ? { ...item, quantity: (item.quantity || 0) - 1 } : item
      ).filter((item) => (item.quantity || 0) > 0)
    );
  };

  const removeFromBasket = (basketItemId: string) => {
    setBasket((prev) => prev.filter((item) => item.basketItemId !== basketItemId));
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