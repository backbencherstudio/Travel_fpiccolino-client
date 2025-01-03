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

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const get_all_inclusive_TourPagePage = createAsyncThunk(
  "pageDataSlice/all_inclusive_TourPage/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}/api/pageData/all_inclusive_TourPage`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const country_wise_TourPage = createAsyncThunk(
  "pageDataSlice/country_wise_TourPage/get",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}/api/pageData/country_wise/${id}`
      );
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
  aboutPageData: [],

  //  ========================= all_inclusive_TourPage
  all_inclusive_TourPageLoaging: false,
  all_inclusive_TourPageError: null,
  all_inclusive_TourPageData: null,

  // ========================== country_wise
  country_wise_TourPageLoaging: false,
  country_wise_TourPageError: null,
  country_wise_TourPageData: null,
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
      });

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
      });


          // ============================  all_inclusive_TourPage
    builder
    // Handle get headers
    .addCase(get_all_inclusive_TourPagePage.pending, (state) => {
      state.all_inclusive_TourPageLoaging = true;
      state.all_inclusive_TourPageError = null;
    })
    .addCase(get_all_inclusive_TourPagePage.fulfilled, (state, action) => {
      state.all_inclusive_TourPageLoaging = false;
      state.all_inclusive_TourPageError = null;
      state.all_inclusive_TourPageData = action.payload;
    })
    .addCase(get_all_inclusive_TourPagePage.rejected, (state, action) => {
      state.all_inclusive_TourPageLoaging = false;
      state.all_inclusive_TourPageError =
        action.payload?.message || "Error fetching headers";
    });

    // ============================  country_wise_TourPage
    builder
    // Handle get headers
    .addCase(country_wise_TourPage.pending, (state) => {
      state.country_wise_TourPageLoaging = true;
      state.country_wise_TourPageError = null;
    })
    .addCase(country_wise_TourPage.fulfilled, (state, action) => {
      state.country_wise_TourPageLoaging = false;
      state.country_wise_TourPageError = null;
      state.country_wise_TourPageData = action.payload;
    })
    .addCase(country_wise_TourPage.rejected, (state, action) => {
      state.country_wise_TourPageLoaging = false;
      state.country_wise_TourPageError =
        action.payload?.message || "Error fetching headers";
    });
  },
});

// Export the reducer
export default pageDataSlice.reducer;
