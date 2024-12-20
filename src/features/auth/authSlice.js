import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/users/register`, userData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const conformRegisterOtp = createAsyncThunk(
  "users/conformRegisterOtp",
  async (otp, { rejectWithValue }) => {
    console.log("otp:: ", typeof otp);
    try {
      const response = await axios.post(
        `${base_url}/users/verify-otp`,
        { otp: otp },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    console.log(userData)
    try {
      const response = await axios.post(`${base_url}/users/login`, userData, {
        withCredentials: true,
      });

      console.log(response.data);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const setIsAuthenticated = createAsyncThunk(
  "users/isAuthenticated",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/users/check`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginOut = createAsyncThunk(
  "users/logout",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/auth/`, userData);

      console.log(response.data);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${base_url}/users/update`, userData, {
        withCredentials: true,
      });
      console.log("API response:", response);
      return response.data;
    } catch (error) {
      console.error("API error:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/users/logout`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const recentOtp = createAsyncThunk(
  "users/resendotp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/users/resendotp`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loginLoading: false,
  signupLoading: false,
  otpLoading: false,
  appLoading: true,
  userUpdateLoading: false,
  recentOtpLoading: false,
  conformOtpLoading: false,

  isAuthenticated: false,

  appLoadingError: null,
  user: {},
  loginError: null,
  signupError: null,
  otpError: null,
  userUpddateError: null,
  recentOtpError: false,
  conformOtpError: null,

  callCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearRecent: (state) => {
      state.recentOtpError = null; 
      state.recentOtpLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload?.message ?? null;
        state.user = {};
      });

    builder
      .addCase(setIsAuthenticated.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(setIsAuthenticated.fulfilled, (state, action) => {
        state.appLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.callCount += 1;
      })
      .addCase(setIsAuthenticated.rejected, (state, action) => {
        state.appLoading = false;
        state.isAuthenticated = false;
        state.callCount += 1;
      });

    builder
      .addCase(conformRegisterOtp.pending, (state) => {
        state.conformOtpLoading = true;
        state.conformOtpError = null;
      })
      .addCase(conformRegisterOtp.fulfilled, (state, action) => {
        state.conformOtpLoading = false;
        state.conformOtpError = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(conformRegisterOtp.rejected, (state, action) => {
        state.conformOtpLoading = false;
        state.conformOtpError = action.payload?.message ?? null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.userUpdateLoading = true;
        state.userUpddateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdateLoading = false;
        console.log(121, action);
        state.user = { ...state.user, ...action.payload };
        state.userUpddateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateLoading = false;
        state.userUpddateError = action.payload?.message ?? null;
      });

    builder
      .addCase(logOut.pending, (state) => {})
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, (state) => {});

    builder
      .addCase(recentOtp.pending, (state) => {
        state.recentOtpLoading = true;
        state.recentOtpError = null;
      })
      .addCase(recentOtp.fulfilled, (state, action) => {
        state.recentOtpLoading = false;
        state.recentOtpError = null;
      })
      .addCase(recentOtp.rejected, (state, action) => {
        state.recentOtpLoading = false;
        state.recentOtpError = action.payload?.message ?? null;
      });



      // builder
      // .addCase(recentOtp.pending, (state) => {
      //   state.recentOtpLoading = true;
      //   state.recentOtpError = null;
      // })
      // .addCase(recentOtp.fulfilled, (state, action) => {
      //   state.recentOtpLoading = false;
      //   state.recentOtpError = null;
      // })
      // .addCase(recentOtp.rejected, (state, action) => {
      //   state.recentOtpLoading = false;
      //   state.recentOtpError = action.payload?.message ?? null;
      // });
  },
});

export const { clearRecent } = authSlice.actions;
export default authSlice.reducer;
