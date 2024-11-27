import {createSlice} from '@reduxjs/toolkit';
import cartItems from "../../constants/cartItems";
// 수량/ 금액/ 총 구매금액
const initialState = {
    cartItems: cartItems,
    amount:0,
    total:0,
}
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        // todo 증가
        increase: (state,{payload}) => {
            // 내가 클릭한 음반의 아이디 가져옴
            const itemId = payload;
            // 그 아이디를 통해 전체 음반 중 내가 클릭한 아이디랑 비교해 동일한 음반을 찾아냄.
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            // 내가 클릭한 아이디의 아이템의 수량을 증가 시킴
            item.id +=1;
        },
        // todo 감소
        decrease: (state,{payload}) => {
            // 내가 클릭한 음반의 아이디 가져옴
            const itemId = payload;
            // 그 아이디를 통해 전체 음반 중 내가 클릭한 아이디랑 비교해 동일한 음반을 찾아냄.
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            // 내가 클릭한 아이디의 아이템의 수량을 증가 시킴
            item.id -=1;
        },
        // todo 제거
        removeItem: (state,{payload}) => {
            // 내가 클릭한 음반의 아이디 가져옴
            const itemId = payload;
            // 그 아이디를 통해 전체 음반 중 내가 클릭한 아이디랑 비교해 동일한 음반을 찾아냄.
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // todo 모든 아이템 제거 (clear)
        // cartitems 를 빈배열로 만들면 된다.
        clearCart : (state) =>{
            state.cartItems = [];
        },
        // 총 금액 계산 (각 item * 수량의 sum)
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price ;
            })

            state.amount = amount;
            state.total = total;
        }
    }
})
export const {increase, decrease, removeItem, clearCart, calculateTotals} =cartSlice.actions;
export default cartSlice.reducer;
