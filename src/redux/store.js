import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';

import thunkMiddleWare from "redux-thunk";
const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer
    },
    middleware: [thunkMiddleWare]
})
export default store;

