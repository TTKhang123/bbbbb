import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSilde'
import orderReducer from './slides/orderSlide'
export const store = configureStore({
  reducer: {
    counter: productReducer,
    user: userReducer,
    order: orderReducer
  },
})