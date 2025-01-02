import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const createCheckout = createAsyncThunk(
  "order/contact/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/order/checkout`, checkoutData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCheckout = createAsyncThunk(
  "order/contact/createCheckout/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/order/checkout`);
      return response.data; // Return categories data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout.push(action.payload);
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.checkout = action.payload;
      })
      .addCase(getCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default checkoutSlice.reducer;
