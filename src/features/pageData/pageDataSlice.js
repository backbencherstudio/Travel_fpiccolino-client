import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";


axios.defaults.withCredentials = true;


// Async action to get all headers
export const getHomePageData = createAsyncThunk(
  "pageDataSlice/home/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/home`);
      // console.log(5451445454, response);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getAboutPageData = createAsyncThunk(
  "pageDataSlice/about/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/about`);
      // console.log(5451445454, response);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

 
// Initial state
//  ========================= home
const initialState = {
 homePageLoaging: false,
 homePageError: null,
 homePageData: [],

//  ========================= about
 aboutPageLoaging: false,
 aboutPageError: null,
 aboutPageData: []
};

// Create the slice
const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get headers
      .addCase(getHomePageData.pending, (state) => {
        state.homePageLoaging = true;
        state.homePageError = null;
      })
      .addCase(getHomePageData.fulfilled, (state, action) => {
        state.homePageLoaging = false;
        state.homePageError = null;
        state.homePageData = action.payload;
      })
      .addCase(getHomePageData.rejected, (state, action) => {
        state.homePageLoaging = false;
        state.homePageError =
          action.payload?.message || "Error fetching headers";
      })

      // ============================  about
    builder
      // Handle get headers
      .addCase(getAboutPageData.pending, (state) => {
        state.aboutPageLoaging = true;
        state.aboutPageError = null;
      })
      .addCase(getAboutPageData.fulfilled, (state, action) => {
        state.aboutPageLoaging = false;
        state.aboutPageError = null;
        state.aboutPageData = action.payload;
      })
      .addCase(getAboutPageData.rejected, (state, action) => {
        state.aboutPageLoaging = false;
        state.aboutPageError =
          action.payload?.message || "Error fetching headers";
      })


  },
});

// Export the reducer
export default pageDataSlice.reducer;
