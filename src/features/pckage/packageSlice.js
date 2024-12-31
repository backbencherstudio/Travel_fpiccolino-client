import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Create Package
export const createPackage = createAsyncThunk(
  "package/create",
  async (packageData, { rejectWithValue }) => {
    const { images, hotelImages, ...otherData } = packageData;
    try {
      const formData = new FormData();
      for (const key in otherData) {
        if (
          key === "tourDuration" ||
          key === "includeItems" ||
          key === "notIncludeItems" ||
          key === "insurance" ||
          key === "bookedFlights"
        ) {
          formData.append(key, JSON.stringify(otherData[key]));
        } else {
          formData.append(key, otherData[key]);
        }
      }
      images.forEach((image) => formData.append("images", image));
      hotelImages.forEach((image) => formData.append("hotelImages", image));

      const response = await axios.post(`${base_url}/package`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Package List
export const getPackage = createAsyncThunk(
  "package/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/package`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Package Details
export const getPackageDetails = createAsyncThunk(
  "package/getPackageDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/package/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Package
export const deletePackage = createAsyncThunk(
  "package/delete",
  async (packageId, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/package/${packageId}`);
      return packageId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete package"
      );
    }
  }
);

export const updatePackage = createAsyncThunk(
  "package/update",
  async ({ packageId, data }, { rejectWithValue }) => {
    console.log(2423543543, packageId, data);

    try {
      const response = await axios.put(
        `${base_url}/package/${packageId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the updated package data
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || "Failed to update package"
      );
    }
  }
);

// Initial State
const initialState = {
  packageCreateLoading: false,
  packageCreateError: null,
  packag: [], // This holds the list of packages
  packagGetLoading: false,
  packageGetError: null,
  packageDetails: null,
  packageDetailsLoading: false,
  packageDetailsError: null,
};

// Package Slice
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Package Pending
      .addCase(createPackage.pending, (state) => {
        state.packageCreateLoading = true;
        state.packageCreateError = null;
      })
      // Create Package Fulfilled
      .addCase(createPackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = null;
        state.packag = action.payload; // Add the newly created package to the list
      })
      // Create Package Rejected
      .addCase(createPackage.rejected, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = action.payload?.message ?? null;
      })

      // Get Package Pending
      .addCase(getPackage.pending, (state) => {
        state.packagGetLoading = true;
        state.packageGetError = null;
      })
      // Get Package Fulfilled
      .addCase(getPackage.fulfilled, (state, action) => {
        state.packagGetLoading = false;
        state.packageGetError = null;
        state.packag = action.payload.packages; // Update the package list
      })
      // Get Package Rejected
      .addCase(getPackage.rejected, (state, action) => {
        state.packagGetLoading = false;
        state.packageGetError = action.payload?.message ?? null;
      })

      // Get Package Details Pending
      .addCase(getPackageDetails.pending, (state) => {
        state.packageDetailsLoading = true;
        state.packageDetailsError = null;
      })
      // Get Package Details Fulfilled
      .addCase(getPackageDetails.fulfilled, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetailsError = null;
        state.packageDetails = action.payload; // Store the package details
      })
      // Get Package Details Rejected
      .addCase(getPackageDetails.rejected, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetailsError =
          action.payload?.message || "Error fetching package details";
      })

      // Delete Package Fulfilled
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        console.log(state.packag);

        // Ensure packag is an array before filtering
        if (Array.isArray(state.packag)) {
          // Create a new array by filtering out the deleted package
          state.packag = state.packag.filter(
            (pkg) => pkg._id !== action.payload
          );
        } else {
          // If state.packag is a proxy or not an array, log an error
          console.error("packag is not an array:", state.packag);
        }
      });
    builder
      // Update Package Pending
      .addCase(updatePackage.pending, (state) => {
        state.packageCreateLoading = true;
        state.packageCreateError = null;
      })
      // Update Package Fulfilled
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = null;

        // Update the package in the packag array
        const updatedPackage = action.payload;
        if (Array.isArray(state.packag)) {
          const index = state.packag.findIndex(
            (pkg) => pkg._id === updatedPackage._id
          );
          if (index !== -1) {
            state.packag[index] = updatedPackage; // Replace the package
          }
        }
      })
      // Update Package Rejected
      .addCase(updatePackage.rejected, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError =
          action.payload?.message || "Error updating package";
      });
  },
});

export default packageSlice.reducer;
