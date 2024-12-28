import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const createCountry = createAsyncThunk(
  "api/contact/createCountry",
  async (countryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/country`, countryData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        country: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCountry.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCountry.fulfilled, (state, action) => {
            state.loading = false;
            state.country.push(action.payload);
        })
        .addCase(createCountry.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default countrySlice.reducer;
