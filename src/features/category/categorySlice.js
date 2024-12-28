// features/category/categorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

// Async thunk to get categories
export const getCategory = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/category`);
      return response.data; // Return categories data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to create a new category
export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/category`, categoryData);
      return response.data; // Return created category data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/category/${categoryId}`);
      return categoryId; // Return the ID of the deleted category
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  categoryCreateLoading: false,
  categoryCreateLoadingError: null,
  categoryFetchLoading: false,
  categoryFetchError: null,
  categoryDeleteLoading: false,
  categoryDeleteLoadingError: null,
};

// Category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle get category
    builder
      .addCase(getCategory.pending, (state) => {
        state.categoryFetchLoading = true;
        state.categoryFetchError = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryFetchLoading = false;
        state.categories = action.payload; // Update categories list
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.categoryFetchLoading = false;
        state.categoryFetchError = action.payload;
      });

    // Handle create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.categoryCreateLoading = true;
        state.categoryCreateLoadingError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryCreateLoading = false;
        state.categories.push(action.payload); // Add the new category to the list
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError = action.payload;
      });

    // Handle delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.categoryDeleteLoading = true;
        state.categoryDeleteLoadingError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryDeleteLoading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        ); // Remove the deleted category from the list
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.categoryDeleteLoading = false;
        state.categoryDeleteLoadingError = action.payload;
      });
  },
});

// Export actions and reducer
export default categorySlice.reducer;
