/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async action to get all headers
export const createOrder = createAsyncThunk(
  "orderCreate/post",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/order`, orderData);
      // console.log(5451445454, response);

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Initial state
//  ========================= home
const initialState = {
    createOrderLoaging: false,
    createOrderError: null,
//   homePageData: [],
};

// Create the slice
const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get headers
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoaging = true;
        state.createOrderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoaging = false;
        state.createOrderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoaging = false;
        state.createOrderError =
          action.payload?.message || "Error fetching headers";
      });


  },
});

// Export the reducer
export default orderDataSlice.reducer;
