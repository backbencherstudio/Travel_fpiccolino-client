import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Thunk for creating a review
export const createReview = createAsyncThunk(
  "api/contact/createReview",
  async ({ reviewData, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/api/review/createReview/${reviewData?.userId}/${orderId}`,
        reviewData
      );
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching all reviews
export const getReview = createAsyncThunk(
  "package/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/review/getReviewall`);
      return response.data; // Return all reviews
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk for fetching reviews by package ID
export const getReviewByPackage = createAsyncThunk(
  "package/getByPackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}/api/review/getReviewByPakage/${id}`
      );
      return response.data; // Return package-specific reviews
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Review Slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [], // All reviews
    loading: false, // Loading state for general reviews
    error: null, // Error state for general reviews
    packageReview: [], // Package-specific reviews
    packageReviewLoading: false, // Loading state for package reviews
    packageReviewError: null, // Error state for package reviews
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createReview actions
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      // Handle getReview actions
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.review = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });

    builder
      // Handle getReviewByPackage actions
      .addCase(getReviewByPackage.pending, (state) => {
        state.packageReviewLoading = true;
        state.packageReviewError = null;
      })
      .addCase(getReviewByPackage.fulfilled, (state, action) => {
        state.packageReviewLoading = false;
        state.packageReview = action.payload;
      })
      .addCase(getReviewByPackage.rejected, (state, action) => {
        state.packageReviewLoading = false;
        state.packageReviewError = action.payload?.message ?? null;
      });
  },
});

export default reviewSlice.reducer;
