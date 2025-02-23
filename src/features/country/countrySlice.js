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
export const getCountry = createAsyncThunk(
  "country/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/country`);
      return response.data; // Return countries data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const getCountryById = createAsyncThunk(
  "country/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/country/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deleteCountry = createAsyncThunk(
  "country/delete",
  async (countryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/api/country/${countryId}`);
      return countryId; // Return the ID of the deleted country
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateCountry = createAsyncThunk(
  "country/update",
  async ({ countryId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("contentTitle", data.contentTitle);
      formData.append("contentDescription", data.contentDescription);

      // If there's a new image file, append it
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axios.put(
        `${base_url}/api/country/${countryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState: {
    countries: [],
    loading: false,
    error: null,
    country: null,
    countryLoading: false,
    countryError: null,
    updateLoading: false,
    updateError: null,
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
        state.countries.push(action.payload);
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
    builder
      .addCase(getCountryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.country = action.payload;
      })
      .addCase(getCountryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
    builder
      .addCase(deleteCountry.pending, (state) => {
        state.countryDeleteLoading = true;
        state.countryDeleteLoadingError = null;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.countryDeleteLoading = false;
        state.countries = state.countries.filter(
          (country) => country._id !== action.payload
        ); // Remove the deleted country from the list
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.countryDeleteLoading = false;
        state.countryDeleteLoadingError = action.payload;
      });
    builder
      .addCase(updateCountry.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.country = action.payload.country;
        // Update the country in the countries array
        const index = state.countries.findIndex(
          (c) => c._id === action.payload.country._id
        );
        if (index !== -1) {
          state.countries[index] = action.payload.country;
        }
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export default countrySlice.reducer;
