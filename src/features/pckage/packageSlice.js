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

export const getPackage = createAsyncThunk(
  "package/getPackage",
  async ({ search = "", startDate, endDate }, { rejectWithValue }) => {
    try {
      const params = {};
      if (search) {
        params.search = search;
      }
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await axios.get(`${base_url}/package`, {
        params,
      });
      return response.data;
    } catch (error) {
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
    try {
      const { images, hotelImages, ...packageData } = data;

      const cleanedData = { ...packageData };

      if (cleanedData.country === undefined) {
        delete cleanedData.country;
      }

      const formData = new FormData();

      // Add other package data
      for (const key in cleanedData) {
        if (
          key === "tourDuration" ||
          key === "includeItems" ||
          key === "notIncludeItems" ||
          key === "insurance" ||
          key === "bookedFlights"
        ) {
          formData.append(key, JSON.stringify(cleanedData[key]));
        } else {
          formData.append(key, cleanedData[key]);
        }
      }

      // Process images

      images.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("images", image);
        } else {
          formData.append("existingImages", image);
        }
      });

      hotelImages.forEach((image) => {
        if (typeof image !== "string") {
          formData.append("hotelImages", image);
        } else {
          formData.append("existingHotelImages", image);
        }
      });

      const response = await axios.put(
        `${base_url}/package/${packageId}`,
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
      return rejectWithValue(
        error.response?.data || "Failed to update package"
      );
    }
  }
);
export const createShorts = createAsyncThunk(
  "package/createShorts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/review`, data);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
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
  shorts: [],
  shortsLoading: false,
  shortsError: null,
};

// Package Slice
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Package
      .addCase(createPackage.pending, (state) => {
        state.packageCreateLoading = true;
        state.packageCreateError = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = null;
        state.package = action.payload; // Fixed typo "packag" to "package"
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = action.payload?.message ?? null;
      })

      // Get Package
      .addCase(getPackage.pending, (state) => {
        state.packageGetLoading = true;
        state.packageGetError = null;
      })
      .addCase(getPackage.fulfilled, (state, action) => {
        state.packageGetLoading = false;
        state.packageGetError = null;
        state.package = action.payload.packages; // Update the package list
      })
      .addCase(getPackage.rejected, (state, action) => {
        state.packageGetLoading = false;
        state.packageGetError = action.payload?.message ?? null;
      })

      // Get Package Details
      .addCase(getPackageDetails.pending, (state) => {
        state.packageDetailsLoading = true;
        state.packageDetailsError = null;
      })
      .addCase(getPackageDetails.fulfilled, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetailsError = null;
        state.packageDetails = action.payload;
      })
      .addCase(getPackageDetails.rejected, (state, action) => {
        state.packageDetailsLoading = false;
        state.packageDetailsError =
          action.payload?.message || "Error fetching package details";
      })

      // Delete Package
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        if (Array.isArray(state.package)) {
          state.package = state.package.filter(
            (pkg) => pkg._id !== action.payload
          );
        } else {
          console.error("package is not an array:", state.package);
        }
      })

      // Update Package
      .addCase(updatePackage.pending, (state) => {
        state.packageCreateLoading = true;
        state.packageCreateError = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError = null;
        const updatedPackage = action.payload;
        if (Array.isArray(state.package)) {
          const index = state.package.findIndex(
            (pkg) => pkg._id === updatedPackage._id
          );
          if (index !== -1) {
            state.package[index] = updatedPackage;
          }
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.packageCreateLoading = false;
        state.packageCreateError =
          action.payload?.message || "Error updating package";
      })

      // Create Shorts
      .addCase(createShorts.pending, (state) => {
        state.shortsLoading = true;
        state.shortsError = null;
      })
      .addCase(createShorts.fulfilled, (state, action) => {
        state.shortsLoading = false;
        state.shortsError = null;
        state.shorts = action.payload; // Add the newly created shorts to the state
      })
      .addCase(createShorts.rejected, (state, action) => {
        state.shortsLoading = false;
        state.shortsError = action.payload?.message ?? null;
      });
  },
});

export default packageSlice.reducer;
