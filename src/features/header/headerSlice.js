import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async action to create a new header
export const createHeader = createAsyncThunk(
  "header/create",
  async (headerData, { rejectWithValue }) => {
    console.log(11, "Hit");
    console.log(12, {headerData});
    
    try {
      const response = await axios.post(`${base_url}/header`, headerData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to get all headers
export const getHeader = createAsyncThunk(
  "header/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/header`);
      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to delete a header
export const deleteHeader = createAsyncThunk(
  "header/delete",
  async (headerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}/header/${headerId}`);
      return headerId; // Return the deleted header ID to update the state
    } catch (error) {
      console.error("Error deleting header:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  headerCreateLoading: false,
  headerCreateLoadingError: null,
  headers: [],
};

// Create the slice
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle create header
      .addCase(createHeader.pending, (state) => {
        state.headerCreateLoading = true;
        state.headerCreateLoadingError = null;
      })
      .addCase(createHeader.fulfilled, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError = null;
        // Add the new header to the headers array
        state.headers.push(...action.payload);
      })
      .addCase(createHeader.rejected, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError =
          action.payload?.message || "Error creating header";
      })

      // Handle get headers
      .addCase(getHeader.pending, (state) => {
        state.headerCreateLoading = true;
        state.headerCreateLoadingError = null;
      })
      .addCase(getHeader.fulfilled, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError = null;
        state.headers = action.payload;
      })
      .addCase(getHeader.rejected, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError =
          action.payload?.message || "Error fetching headers";
      })

      // Handle delete header
      .addCase(deleteHeader.pending, (state) => {
        state.headerCreateLoading = true;
        state.headerCreateLoadingError = null;
      })
      .addCase(deleteHeader.fulfilled, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError = null;
        // Remove the deleted header from the headers array
        state.headers = state.headers.filter(
          (header) => header._id !== action.payload
        );
      })
      .addCase(deleteHeader.rejected, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError =
          action.payload?.message || "Error deleting header";
      });
  },
});

// Export the reducer
export default headerSlice.reducer;
