import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Centralized API Routes
const API_ROUTES = {
  CREATE_REVIEW: (userId, packageId) =>
    `${base_url}/api/review/createReview/${userId}/${packageId}`,
  GET_REVIEWS: `${base_url}/api/review/getReviewall`,
  GET_PACKAGE_REVIEWS: (id) => `${base_url}/api/review/getReviewByPakage/${id}`,
};

// Thunk for creating a review
export const createReview = createAsyncThunk(
  "review/create",
  async ({ reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_ROUTES.CREATE_REVIEW(reviewData?.userId, reviewData?.packageId),
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create review."
      );
    }
  }
);

// Thunk for fetching all reviews
export const getReview = createAsyncThunk(
  "review/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.GET_REVIEWS);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all reviews."
      );
    }
  }
);

// Thunk for fetching reviews by package ID
export const getReviewByPackage = createAsyncThunk(
  "review/getByPackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.GET_PACKAGE_REVIEWS(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch package reviews."
      );
    }
  }
);

// Thunk for deleting a review
export const deleteReview = createAsyncThunk(
  "review/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        base_url + "/api/review/deleteReview/" + id
      );
      // Refetch reviews after successful deletion
      await dispatch(getReview());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete review."
      );
    }
  }
);

// Review Slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [], // All reviews
    loading: false, // General loading state
    error: null, // General error state
    packageReview: [], // Package-specific reviews
    packageReviewLoading: false, // Loading state for package reviews
    packageReviewError: null, // Error state for package reviews
  },
  reducers: {
    // Reducer to clear all reviews
    clearReviews: (state) => {
      state.review = [];
    },
    // Reducer to clear package-specific reviews
    clearPackageReviews: (state) => {
      state.packageReview = [];
    },
  },
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
        state.review = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.packageReviewError = action.payload;
      });

    builder
      // Handle deleteReview actions
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducers
export const { clearReviews, clearPackageReviews } = reviewSlice.actions;

// Export Slice Reducer
export default reviewSlice.reducer;
