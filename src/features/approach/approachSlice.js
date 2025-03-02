import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

export const fetchApproachData = createAsyncThunk(
  "approach/fetchApproachData",
  async () => {
    const response = await axios.get(`${base_url}/api/approach`);
    return response.data.logos;
  }
);

const approachSlice = createSlice({
  name: "approach",
  initialState: {
    logos: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApproachData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApproachData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logos = action.payload;
      })
      .addCase(fetchApproachData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default approachSlice.reducer;
