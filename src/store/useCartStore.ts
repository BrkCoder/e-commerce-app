import { create } from 'zustand';

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

const useCartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  addToCart: (item: CartItem) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.totalPrice += item.price * item.quantity;
      state.totalQuantity += item.quantity;

      return state;
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
      return state;
    });
  },
  clearCart: () => {
    set(() => ({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    }));
  },
}));

export default useCartStore;
