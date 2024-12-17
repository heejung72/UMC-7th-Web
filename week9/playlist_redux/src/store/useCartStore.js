import { create } from 'zustand';
import cartItems from '../constants/cartItems';

const useCartStore = create((set, get) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,
  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),
  decrease: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  openModal: (message) => console.log(message),
  calculateTotals: () => {
    const { cartItems } = get();
    const total = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    const amount = cartItems.reduce((acc, item) => acc + item.amount, 0);
    set({ total, amount });
  },
}));

export default useCartStore;
