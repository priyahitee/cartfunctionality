import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const BASE_URI= "http://localhost:5000";

const initialState = {
    items: [],
    status: null,
  };

  export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
    const response = await axios.get(`${BASE_URI}/products`);
    return response?.data; 
    } catch(error){
       console.log(error)
    }
  })

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "success"
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "rejected"
      })
    }
  })

  export default productSlice.reducer;