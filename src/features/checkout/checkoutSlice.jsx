import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const createCheckout = createAsyncThunk(
  "order/contact/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/order/checkout-session`, checkoutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getCheckout = createAsyncThunk(
  "order/contact/getCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/order/checkout-session/${checkoutId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteCheckout = createAsyncThunk(
  "order/contact/deleteCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}/order/checkout-session/${checkoutId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// New data API calls
export const createCheckoutWithNewData = createAsyncThunk(
  "order/contact/createCheckoutNewData",
  async (userUpdateData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${base_url}/order/checkout-session/${userUpdateData.checkoutId}`, userUpdateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getCheckoutNewData = createAsyncThunk(
  "order/contact/getCheckoutNewData",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/order/checkout-session/${checkoutId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: {},
    checkoutId: null,
    loading: false, // Regular data loading
    error: null, // Regular data error

    checkoutNewData: [], // New data-specific checkout information
    loadingNewData: false, // New data loading
    errorNewData: null, // New data error
  },
  reducers: {},
  extraReducers: (builder) => {
    // Regular checkout actions
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        const { checkoutId, payload } = action.payload || {};
        state.checkoutId = checkoutId || null;
        state.checkout = payload || {};
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? action.payload ?? "Unknown error";
      })
      .addCase(getCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckout.fulfilled, (state, action) => {
        state.loading = false;
        const { checkoutId, payload } = action.payload || {};
        state.checkoutId = checkoutId || state.checkoutId;
        state.checkout = payload || {};
      })
      .addCase(getCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? action.payload ?? "Unknown error";
      });

    // New data-specific actions
    builder
      .addCase(createCheckoutWithNewData.pending, (state) => {
        state.loadingNewData = true;
        state.errorNewData = null;
      })
      .addCase(createCheckoutWithNewData.fulfilled, (state, action) => {
        state.loadingNewData = false;
        const { checkoutId, payload } = action.payload || {};
        state.checkoutId = checkoutId || state.checkoutId;
        state.checkoutNewData = payload ? [payload] : [];
      })
      .addCase(createCheckoutWithNewData.rejected, (state, action) => {
        state.loadingNewData = false;
        state.errorNewData = action.payload?.message ?? action.payload ?? "Unknown error";
      })
      .addCase(getCheckoutNewData.pending, (state) => {
        state.loadingNewData = true;
        state.errorNewData = null;
      })
      .addCase(getCheckoutNewData.fulfilled, (state, action) => {
        state.loadingNewData = false;
        const { checkoutId, payload } = action.payload || {};
        state.checkoutId = checkoutId || state.checkoutId;
        state.checkoutNewData = payload ? [payload] : [];
      })
      .addCase(getCheckoutNewData.rejected, (state, action) => {
        state.loadingNewData = false;
        state.errorNewData = action.payload?.message ?? action.payload ?? "Unknown error";
      });
  },
});

export default checkoutSlice.reducer;
