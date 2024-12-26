import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async Thunks

// Get all blogs
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

// Get blogs by category
export const getBlogsByCategory = createAsyncThunk(
  "blog/getBlogsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs/all`, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get a single blog by ID
export const getBlogDetails = createAsyncThunk(
  "blog/getBlogDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs/blogGet/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get category count for blogs
export const getCategoryCount = createAsyncThunk(
  "blog/getCategoryCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs/categoryCount`);
      console.log(response.data);
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
  categoryBlogs: [],
  categoryBlogsLoading: false,
  categoryBlogsError: null,
  blogDetails: null,
  blogDetailsLoading: false,
  blogDetailsError: null,
  categoryCount: 0,
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

      // Handle get blog details
      .addCase(getBlogDetails.pending, (state) => {
        state.blogDetailsLoading = true;
        state.blogDetailsError = null;
      })
      .addCase(getBlogDetails.fulfilled, (state, action) => {
        state.blogDetailsLoading = false;
        state.blogDetailsError = null;
        state.blogDetails = action.payload;
      })
      .addCase(getBlogDetails.rejected, (state, action) => {
        state.blogDetailsLoading = false;
        state.blogDetailsError =
          action.payload?.message || "Error fetching blog details";
      })

      // Handle category count
      .addCase(getCategoryCount.fulfilled, (state, action) => {
        state.categoryCount = action.payload;
      })
      .addCase(getCategoryCount.rejected, (state, action) => {
        state.blogCreateLoadingError =
          action.payload?.message || "Error fetching category count";
      });
  },
});

// Export the reducer
export default blogSlice.reducer;
