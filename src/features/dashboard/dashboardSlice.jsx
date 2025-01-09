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
      return response.data; // Return dashboard data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Thunk to get chart data
export const getChartData = createAsyncThunk(
  "dashboard/getChartData", // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/dashboard/getRevenueData`);
      return response.data; // Return chart data (e.g., revenue data)
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
      return response.data; // Return radar data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalData: [], // Data for dashboard summary
    loading: false, // Dashboard loading state
    error: null, // Error state for dashboard
    radarData: [], // Radar chart data
    radarLoading: false, // Radar chart loading state
    radarError: null, // Error state for radar chart
    chartData: [], // Data for chart (e.g., revenue data)
    chartLoading: false, // Chart data loading state
    chartError: null, // Error state for chart data
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

      // Handle getChartData actions
      .addCase(getChartData.pending, (state) => {
        state.chartLoading = true;
        state.chartError = null;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.chartLoading = false;
        state.chartError = null;
        state.chartData = action.payload; // Update the state with the chart data
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.chartLoading = false;
        state.chartError = action.payload?.message ?? null;
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
