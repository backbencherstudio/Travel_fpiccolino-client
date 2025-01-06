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

export const getBlogData = createAsyncThunk(
  "pageDataSlice/blogPage/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/blogPage`);

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getFaqPageData = createAsyncThunk(
  "pageDataSlice/faqPageData/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/faqPage`);

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getPolicyPageData = createAsyncThunk(
  "pageDataSlice/PolicyPageData/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/policyPage`);

      return response.data;
    } catch (error) {
      console.error("Error fetching headers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getCiontectPageData = createAsyncThunk(
  "pageDataSlice/contactPageData/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/pageData/contactPage`);

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

  //=========================== getBlogData
  getBlogDataLoaging: false,
  getBlogDataError: null,
  blogData: null,

  //========================== faqPageData
  faqPageDataLoaging: false,
  faqPageDataError: null,
  faqPageData: null,

  //========================== policyPage
  policyPageLoading: false,
  policyPageError: null,
  policyPageData: null,

  //========================== contectPage
  contactPageLoading: false,
  contactPageError: null,
  contactPage: null,
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

    //=========================== getBlogData
    builder
      .addCase(getBlogData.pending, (state) => {
        state.getBlogDataLoaging = true;
        state.getBlogDataError = null;
      })
      .addCase(getBlogData.fulfilled, (state, action) => {
        state.getBlogDataLoaging = false;
        state.getBlogDataError = null;
        state.blogData = action.payload;
      })
      .addCase(getBlogData.rejected, (state, action) => {
        state.getBlogDataLoaging = false;
        state.getBlogDataError =
          action.payload?.message || "Error fetching headers";
      });

    //=========================== getFaqPageData
    builder
      .addCase(getFaqPageData.pending, (state) => {
        state.faqPageDataLoaging = true;
        state.faqPageDataError = null;
      })
      .addCase(getFaqPageData.fulfilled, (state, action) => {
        state.faqPageDataLoaging = false;
        state.faqPageDataError = null;
        state.faqPageData = action.payload;
      })
      .addCase(getFaqPageData.rejected, (state, action) => {
        state.faqPageDataLoaging = false;
        state.faqPageDataError =
          action.payload?.message || "Error fetching headers";
      });

    //=========================== getFaqPageData
    builder
      .addCase(getPolicyPageData.pending, (state) => {
        state.policyPageLoading = true;
        state.policyPageError = null;
      })
      .addCase(getPolicyPageData.fulfilled, (state, action) => {
        state.policyPageLoading = false;
        state.policyPageError = null;
        state.policyPageData = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(getPolicyPageData.rejected, (state, action) => {
        state.policyPageLoading = false;
        state.policyPageError =
          action.payload?.message || "Error fetching headers";
      });

    //=========================== getContactPage
    builder
      .addCase(getCiontectPageData.pending, (state) => {
        state.contactPageLoading = true;
        state.contactPageError = null;
      })
      .addCase(getCiontectPageData.fulfilled, (state, action) => {
        state.contactPageLoading = false;
        state.contactPageError = null;
        state.contactPage = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(getCiontectPageData.rejected, (state, action) => {
        state.contactPageLoading = false;
        state.contactPageError =
          action.payload?.message || "Error fetching headers";
      });
  },
});

// Export the reducer
export default pageDataSlice.reducer;
