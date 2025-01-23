import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Create Newsletter Subscription
export const createNewsletter = createAsyncThunk(
  "newsletter/create",
  async (newsletterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/api/newsletter/create`,
        newsletterData
      );
      console.log("Newsletter Created:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Newsletter Subscriptions
export const getNewsletters = createAsyncThunk(
  "newsletter/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/newsletter/get`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Newsletter Subscription
export const deleteNewsletter = createAsyncThunk(
  "newsletter/delete",
  async (newsletterId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/api/newsletter/delete/${newsletterId}`);
      return newsletterId; // Return the ID of the deleted newsletter subscription
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    newsletters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletters.push(action.payload);
      })
      .addCase(createNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getNewsletters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewsletters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newsletters = action.payload;
      })
      .addCase(getNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });

    builder
      .addCase(deleteNewsletter.pending, (state) => {
        state.newsletterDeleteLoading = true;
        state.newsletterDeleteError = null;
      })
      .addCase(deleteNewsletter.fulfilled, (state, action) => {
        state.newsletterDeleteLoading = false;
        state.newsletters = state.newsletters.filter(
          (newsletter) => newsletter._id !== action.payload
        );
      })
      .addCase(deleteNewsletter.rejected, (state, action) => {
        state.newsletterDeleteLoading = false;
        state.newsletterDeleteError = action.payload;
      });
  },
});

export default newsletterSlice.reducer;
