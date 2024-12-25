import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const getBlog = createAsyncThunk(
  "blog/getByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/blogs/allblogs`);
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
      });
  },
});

// Export the reducer
export default blogSlice.reducer;
