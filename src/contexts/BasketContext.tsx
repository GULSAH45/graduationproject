import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/types/product";
import uuid from 'react-native-uuid';
import { useAuthStore } from "@/stores/useAuthStore";
import { addToCart, getCart, CartItem } from "@/services/collections/Cart";

// UUID oluşturucu fonksiyon
const generateUUID = (): string => {
  return uuid.v4() as string;
};

type BasketContextType = {
  basket: Product[];
  handleAddToBasket: (product: Product) => void;
  increaseQuantity: (basketItemId: string) => void;
  decreaseQuantity: (basketItemId: string) => void;
  removeFromBasket: (basketItemId: string) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Product[]>([]);

  const { accessToken } = useAuthStore();

  const fetchBasket = async () => {
    if (!accessToken) return;
    
    try {
      const response = await getCart(accessToken);
      if (response.data && response.data.items) {
        // Map API items to local Product type
        const mappedItems: Product[] = response.data.items.map((item: CartItem) => ({
          id: item.product_id,
          name: item.product,
          price: item.unit_price,
          description: "", // Not provided in cart API
          short_explanation: "",
          slug: item.product_slug,
          price_info: {
            profit: 0,
            total_price: item.total_price,
            discounted_price: 0,
            price: item.unit_price,
            discount_percentage: 0
          },
          photo: item.product_variant_detail.photo_src,
          image: item.product_variant_detail.photo_src,
          category: "", // Not provided
          rating: 0, // Not provided
          reviews: 0, // Not provided
          isNew: false,
          comment_count: 0,
          average_star: 0,
          explanation: {
            description: "",
            features: []
          },
          tags: [],
          variants: [],
          selectedVariant: {
            id: item.product_variant_id,
            name: item.product_variant_detail.aroma,
            value: item.product_variant_detail.aroma,
            type: "aroma", // Assuming aroma type
            price: item.unit_price,
            stock: 999 // Unknown
          },
          quantity: item.pieces,
          basketItemId: generateUUID() // Generate local ID for list rendering
        }));
        setBasket(mappedItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Sync cart when user logs in
  useEffect(() => {
    if (accessToken) {
      fetchBasket();
    } else {
      setBasket([]); // Clear basket on logout
    }
  }, [accessToken]);

  const handleAddToBasket = async (product: Product) => {
    // API Call if user is logged in
    if (accessToken) {
      try {
        await addToCart(accessToken, {
          product_id: product.id.toString(),
          product_variant_id: product.selectedVariant?.id || "",
          pieces: product.quantity || 1
        });
      } catch (error) {
        console.error("Error adding to cart API:", error);
      }
    }

    // Local State Update
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
    <BasketContext.Provider value={{ basket, handleAddToBasket, increaseQuantity, decreaseQuantity, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
};