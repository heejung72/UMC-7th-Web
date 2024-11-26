// slice는 리듀서와 액션 생성함수의 기능을 제공하는 객체
// createReducer, createAction의 일을 함.
import {createSlice} from '@reduxjs/toolkit'

let nextId =0;
const initialState = [];

export const todoSlice = createSlice({
    name : 'todofunction',
    initialState,
    reducers:{
        add : (state,action) => {
            nextId++;
            state.push({
                id : nextId,
                text : action.payload,
                complete : false,
            })
    },   
    remove : (state, action) =>{
        return state.filter(e => e.id !== action.payload)
    },

    complete : (state, action) =>{
        return state.map(e => e.id === action.payload ? {...e, complete : !e.complete} : e)
    }


}
})

export const {add , remove, complete} = todoSlice.actions 
//store에서 add, remove, complte 액션을 내보낸다.
export default todoSlice.reducer