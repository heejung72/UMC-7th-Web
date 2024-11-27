import { createSlice } from '@reduxjs/toolkit';
import cartItems from "../../constants/cartItems";

// 수량/ 금액/ 총 구매금액
const initialState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 수량 증가
        increase: (state, { payload }) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            if (item) {
                item.amount += 1; // 수량 증가
            }
        },
        // 수량 감소
        decrease: (state, { payload }) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            if (item && item.amount > 1) {
                item.amount -= 1; // 수량 감소
            }
        },
        // 아이템 제거
        removeItem: (state, { payload }) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // 모든 아이템 제거 (clear)
        clearCart: (state) => {
            state.cartItems = [];
        },
        // 총 금액 계산 (각 item * 수량의 합)
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
