import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async Thunks
export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs/allblogs`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getBlogsByCategory = createAsyncThunk(
  "blog/getBlogsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      // Assuming you pass a category to filter blogs
      const response = await axios.get(`${base_url}/api/blogs/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const getBlogDetails = createAsyncThunk(
  "blog/getBlogDetails",
  async (id, { rejectWithValue }) => {
    try {
      // Assuming you pass a category to filter blogs
      const response = await axios.get(`${base_url}/api/blogs/blogGet/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  blogCreateLoading: false,
  blogCreateLoadingError: null,
  blogs: [],
  categoryBlogs: [], // State to store blogs by category
  categoryBlogsLoading: false,
  categoryBlogsError: null, // For category-specific error handling
  blogDetails: null,
  blogDetailsLoading: false,
  blogDetailsError: null,
};

// Create the slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get blogs
      .addCase(getBlog.pending, (state) => {
        state.blogCreateLoading = true;
        state.blogCreateLoadingError = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.blogCreateLoading = false;
        state.blogCreateLoadingError = null;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.blogCreateLoading = false;
        state.blogCreateLoadingError =
          action.payload?.message || "Error fetching blogs";
      })

      // Handle get blogs by category
      .addCase(getBlogsByCategory.pending, (state) => {
        state.categoryBlogsLoading = true;
        state.categoryBlogsError = null;
      })
      .addCase(getBlogsByCategory.fulfilled, (state, action) => {
        state.categoryBlogsLoading = false;
        state.categoryBlogsError = null;
        state.categoryBlogs = action.payload;
      })
      .addCase(getBlogsByCategory.rejected, (state, action) => {
        state.categoryBlogsLoading = false;
        state.categoryBlogsError =
          action.payload?.message || "Error fetching blogs by category";
      })

      .addCase(getBlogDetails.pending, (state) => {
        state.categoryBlogsLoading = true;
        state.categoryBlogsError = null;
      })
      .addCase(getBlogDetails.fulfilled, (state, action) => {
        state.blogCreateLoading = false;
        state.blogDetailsError = null;
        state.blogDetails = action.payload;
      })
      .addCase(getBlogDetails.rejected, (state, action) => {
        state.blogDetailsLoading = false;
        state.blogDetailsError =
          action.payload?.message || "Error fetching blogs by category";
      });
  },
});

// Export the reducer
export default blogSlice.reducer;
