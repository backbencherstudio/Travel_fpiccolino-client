import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Thunk to get dashboard data
export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData", // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/dashboard`);
      return response.data; // Return categories data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk to get radar data
export const getRadarData = createAsyncThunk(
  "dashboard/getRadarData", // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/dashboard/getRadarData`);
      return response.data; // Return categories data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalData: [],
    loading: false,
    error: null,
    radarData: [],
    radarLoading: false,
    radarError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getDashboardData actions
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      })

      // Handle getRadarData actions
      .addCase(getRadarData.pending, (state) => {
        state.radarLoading = true;
        state.radarError = null;
      })
      .addCase(getRadarData.fulfilled, (state, action) => {
        state.radarLoading = false;
        state.radarError = null;
        state.radarData = action.payload;
      })
      .addCase(getRadarData.rejected, (state, action) => {
        state.radarLoading = false;
        state.radarError = action.payload?.message ?? null;
      });
  },
});

export default dashboardSlice.reducer;
