import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/types/Product";

type LastViewedState = {
  lastViewed: Product[];
  addLastViewed: (product: Product) => void;
};

export const useLastViewedStore = create<LastViewedState>()(
  persist(
    (set, get) => ({
      lastViewed: [],
      addLastViewed: (product) => {
        const filtered = get().lastViewed.filter((p) => p.id !== product.id);
        set({ lastViewed: [product, ...filtered].slice(0, 10) });
      },
    }),
    {
      name: "last-viewed-products",
      getStorage: () => AsyncStorage,
    }
  )
);