import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// export const createPackage = createAsyncThunk(
//   "package/create",
//   async (packageData, { rejectWithValue }) => {

//     console.log(11, packageData);

//     const  images = packageData.images;

//     console.log(images);    

//     try {

//       const formData = new FormData();

//       formData.append("file", file);
      
//       const response = await axios.post(`${base_url}/package`, packageData);
//       console.log("slice", response.data);
//       return response.data;

//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createPackage = createAsyncThunk(
//   "package/create",
//   async (packageData, { rejectWithValue }) => {

//     console.log(38, packageData);
//     const { images, ...otherData } = packageData;
//     console.log(40, images);
//     console.log(41, otherData);
    
//     try {
//       const formData = new FormData();
//       for (const key in otherData) {
//         if (key === "tourDuration" || key === "includeItems" || key === "notIncludeItems" || key === "bookedFlights") {
//           formData.append(key, JSON.stringify(otherData[key]));
//         } else {
//           formData.append(key, otherData[key]);
//         }
//       }
//       images.forEach((image, index) => {
//         formData.append(`images[${index}]`, image);
//       });

//       // console.log(51, formData);
      
//         const response = await axios.post(`${base_url}/package`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       // console.log("slice", response.data);
//       return response.data;

//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );


export const createPackage = createAsyncThunk(
  "package/create",
  async (packageData, { rejectWithValue }) => {
    const { images, ...otherData } = packageData;
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
      images.forEach((image, index) => {
        formData.append(`images`, image); 
      });
      const response = await axios.post(`${base_url}/package`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getPackage = createAsyncThunk(
  "package/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/package`);
      return response.data; // Return categories data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const initialState = {
  packageCreateLoading: false,
  packageCreateLoadingError: null,
  packag: [],

  packagGetLoading : false,
  packageGetError : null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPackage.pending, (state) => {
        state.signupLoading = true;
        state.signupError = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupError = null;
        state.packag.push(action.payload)
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload?.message ?? null;
      });

      // Handle get category
    builder
    .addCase(getPackage.pending, (state) => {
      state.packagGetLoading = true;
      state.packageGetError = null;
    })
    .addCase(getPackage.fulfilled, (state, action) => {
      state.packagGetLoading = false;
      state.packageGetError = null;   
      state.packag = action.payload;
    })
    .addCase(getPackage.rejected, (state, action) => {
      state.packagGetLoading = false;
      state.packageGetError = action.payload?.message ?? null;
    });
  },
});

// export const { clearRecent } = packageSlice.actions;
export default packageSlice.reducer;
