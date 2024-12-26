import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async action to create a new category
export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/category`, categoryData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to get all categories
export const getCategory = createAsyncThunk(
  "category/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/category`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to delete a category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}/category/${categoryId}`);
      return categoryId; // Return the deleted category ID to update the state
    } catch (error) {
      console.error("Error deleting category:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  categoryCreateLoading: false,
  categoryCreateLoadingError: null,
  categories: [],
};

// Create the slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle create category
      .addCase(createCategory.pending, (state) => {
        state.categoryCreateLoading = true;
        state.categoryCreateLoadingError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError = null;
        // Add the new category to the categories array
        state.categories.push(...action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError =
          action.payload?.message || "Error creating category";
      })

      // Handle get categories
      .addCase(getCategory.pending, (state) => {
        state.categoryCreateLoading = true;
        state.categoryCreateLoadingError = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError = null;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError =
          action.payload?.message || "Error fetching categories";
      })

      // Handle delete category
      .addCase(deleteCategory.pending, (state) => {
        state.categoryCreateLoading = true;
        state.categoryCreateLoadingError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError = null;
        // Remove the deleted category from the categories array
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError =
          action.payload?.message || "Error deleting category";
      });
  },
});

// Export the reducer
export default categorySlice.reducer;
