import { create, type StoreApi, type UseBoundStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserStore } from "./userStore";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const storeCache = new Map<string, UseBoundStore<StoreApi<CartState>>>();

const createCartStore = (key: string) => {
  return create<CartState>()(
    persist(
      (set) => ({
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
        addToCart: (item: CartItem) => {
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                ...state,
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
                totalPrice: state.totalPrice + item.price,
                totalQuantity: state.totalQuantity + 1,
              };
            }
            return {
              ...state,
              items: [...state.items, item],
              totalPrice: state.totalPrice + item.price * item.quantity,
              totalQuantity: state.totalQuantity + item.quantity,
            };
          });
        },
        removeFromCart: (id: string) => {
          set((state) => {
            const item = state.items.find((i) => i.id === id);
            if (item) {
              state.totalPrice -= item.price * item.quantity;
              state.totalQuantity -= item.quantity;
              state.items = state.items.filter((i) => i.id !== id);
            }
            return { ...state };
          });
        },
        clearCart: () => {
          set(() => ({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
          }));
        },
      }),
      {
        name: key,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

const useCartStore = () => {
  const userId = useUserStore.getState().profile?.id;
  const key = userId ? `cart-store-${userId}` : "cart-store-anonymous";

  if (!storeCache.has(key)) {
    const store = createCartStore(key);
    storeCache.set(key, store);
  }

  return storeCache.get(key)!; //The ! symbol in TypeScript is the non-null assertion operator.
};

export default useCartStore;
