import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const createPackage = createAsyncThunk(
  "package/create",
  async (packageData, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("userId", userId);
      
      const response = await axios.post(`${base_url}/package`, packageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  packageCreateLoading: false,
  packageCreateLoadingError: null,
  package: {},
};

const authSlice = createSlice({
  name: "auth",
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
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload?.message ?? null;
      });
  },
});

// export const { clearRecent } = authSlice.actions;
export default authSlice.reducer;
