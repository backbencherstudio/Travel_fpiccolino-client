import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

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
      });

    builder
      .addCase(getCategory.pending, (state) => {
        state.categoryCreateLoading = true;
        state.categoryCreateLoadingError = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryCreateLoading = false;
        console.log(action.payload);
        state.categoryCreateLoadingError = null;
        // Add the new category to the categories array
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.categoryCreateLoading = false;
        state.categoryCreateLoadingError =
          action.payload?.message || "Error creating category";
      });
  },
});

// Export the reducer
export default categorySlice.reducer;
