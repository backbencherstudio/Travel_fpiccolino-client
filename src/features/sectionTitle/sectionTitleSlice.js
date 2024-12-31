import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";


axios.defaults.withCredentials = true;

// Async action to create a new header
export const createTitle = createAsyncThunk(
  "sectionTitle/create",
  async (titleData, { rejectWithValue }) => {    
    try {
      const response = await axios.post(`${base_url}/section-title`, titleData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async action to get all headers
export const getSectionData = createAsyncThunk(
  "sectionTitle/get",
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
export const deleteSectionData = createAsyncThunk(
  "sectionTitle/delete",
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
  createTitleLoading: false,
  createTitleLoadingError: null,

  getTitleLoading: false,
  getTitleError: null,
  title: [],
};

// Create the slice
const sectionSlice = createSlice({
  name: "sectionTitle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle create header
      .addCase(createTitle.pending, (state) => {
        state.createTitleLoading = true;
        state.createTitleLoadingError = null;
      })
      .addCase(createTitle.fulfilled, (state, action) => {
        state.createTitleLoading = false;
        state.createTitleLoadingError = null;
        // Add the new header to the headers array
        state.title.push(...action.payload);
      })
      .addCase(createTitle.rejected, (state, action) => {
        state.createTitleLoading = false;
        state.createTitleLoadingError =
          action.payload?.message || "Error creating header";
      })

      // Handle get headers
      .addCase(getSectionData.pending, (state) => {
        state.getTitleLoading = true;
        state.getTitleError = null;
      })
      .addCase(getSectionData.fulfilled, (state, action) => {
        state.getTitleLoading = false;
        state.getTitleError = null;
        state.title = action.payload;
      })
      .addCase(getSectionData.rejected, (state, action) => {
        state.getTitleLoading = false;
        state.getTitleError =
          action.payload?.message || "Error fetching headers";
      })

      // Handle delete header
      .addCase(deleteSectionData.pending, (state) => {
        state.headerCreateLoading = true;
        state.headerCreateLoadingError = null;
      })
      .addCase(deleteSectionData.fulfilled, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError = null;
        // Remove the deleted header from the headers array
        state.headers = state.headers.filter(
          (header) => header._id !== action.payload
        );
      })
      .addCase(deleteSectionData.rejected, (state, action) => {
        state.headerCreateLoading = false;
        state.headerCreateLoadingError =
          action.payload?.message || "Error deleting header";
      });
  },
});

// Export the reducer
export default sectionSlice.reducer;
