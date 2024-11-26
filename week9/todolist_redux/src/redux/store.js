// configureStore로 store 생성 
// 객체 인자에는 reducer가 꼭 있어야함.
import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './todoSlice'

export default configureStore({
    reducer : {
        todo : todoSlice
    }
})