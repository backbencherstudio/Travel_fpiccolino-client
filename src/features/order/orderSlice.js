/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async action to create an order
export const createOrder = createAsyncThunk(
  "orderCreate/post",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/order`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to get orders
export const getOrders = createAsyncThunk(
  "order/get",
  async ({ search = "", startDate, endDate }, { rejectWithValue }) => {
    try {
      const params = {};
      if (search) {
        params.search = search;
      }
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await axios.get(`${base_url}/order`, {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  createOrderLoaging: false,
  createOrderError: null,
  orders: [],
  orderLoading: false,
  orderError: null,
};

// Create the slice
const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createOrder actions
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
          action.payload?.message || "Error creating order";
      })

      // Handle getOrders actions
      .addCase(getOrders.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orders = action.payload.Orders || []; // Set orders data to the state
        state.orderError = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload?.message || "Error fetching orders";
      });
  },
});

// Export the reducer
export default orderDataSlice.reducer;
