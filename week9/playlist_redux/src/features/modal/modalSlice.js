import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const modalSlice = createSlice ({
    name : 'modal',
    initialState,
    reducers:{
        // todo modal을 여는 action
        openModal : (state, action) => {
            state.isOpen = true;
        },
        // todo modal을 닫는 action
        closeModal : (state, action) => {
            state.isOpen = false;
        }
    }
})

export const { openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;