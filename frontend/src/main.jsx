import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from './slices/productSlices';
import { productsApi } from './services/productsAPI.js';
import cartReducer from './slices/cartSlice.js';

const store = configureStore({
  reducer: {
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});


store.dispatch(fetchProducts())
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>

)
