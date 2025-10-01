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
    try {
      const response = await axios.post(`${base_url}/users/login`, userData, {
        withCredentials: true,
      });

      // Save user to localStorage on successful login
      localStorage.setItem("user", JSON.stringify(response.data.user));

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
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        return { user: storedUser };
      } else {
        const response = await axios.get(`${base_url}/users/check`);
        return response.data;
      }
    } catch (error) {
      console.log(error);
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
    console.log("slice", userData);
    try {
      const response = await axios.patch(
        `${base_url}/users/update-profile`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
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
      const response = await axios.post(`${base_url}/users/logout`, undefined, {
        withCredentials: true,
      });

      // Clear the user data from localStorage on logout
      localStorage.removeItem("user");

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

export const request_forgot_password_otp = createAsyncThunk(
  "users/request_forgot_password_otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/users/request-forgot-password-otp`,
        {
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const match_forgot_password_otp = createAsyncThunk(
  "users/match_password_otp",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/users/match-password-otp`,
        {
          otp: otp,
        }
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// /reset-forgot-password

export const reset_forgot_password = createAsyncThunk(
  "users/reset_password",
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${base_url}/users/reset-forgot-password`,
        {
          password: password,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userStatus = createAsyncThunk(
  "users/userStatus",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.get(`${base_url}/order/user/${id}/status`);
      console.log("response", response);
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
  request_forgot_password_otpLoading: false,
  match_forgot_password_otpLoading: false,
  reset_forgot_passwordLoading: false,
  isAuthenticated: false,

  appLoadingError: null,
  user: JSON.parse(localStorage.getItem("user")) || {},
  loginError: null,
  signupError: null,
  otpError: null,
  userUpddateError: null,
  recentOtpError: false,
  conformOtpError: null,
  request_forgot_password_otpError: null,
  match_forgot_password_otpError: null,
  reset_forgot_passwordError: null,
  callCount: 0,

  userTureStatusLoading: false,
  userTureStatusError: null,
  userTureStatus: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearRecent: (state) => {
      state.recentOtpError = null;
      state.recentOtpLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.signupLoading = true;
        state.signupError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload?.message ?? null;
      });

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
        console.log(action.payload);
        state.conformOtpLoading = false;
        state.conformOtpError = null;
        state.user = action.payload;
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
        console.log(121, action.payload);
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
        state.user = {};
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

    builder
      .addCase(request_forgot_password_otp.pending, (state) => {
        state.request_forgot_password_otpLoading = true;
        state.request_forgot_password_otpError = null;
      })
      .addCase(request_forgot_password_otp.fulfilled, (state, action) => {
        state.request_forgot_password_otpLoading = false;
        state.request_forgot_password_otpError = null;
      })
      .addCase(request_forgot_password_otp.rejected, (state, action) => {
        state.request_forgot_password_otpLoading = false;
        state.request_forgot_password_otpError =
          action.payload?.message ?? null;
      });
    builder
      .addCase(match_forgot_password_otp.pending, (state) => {
        state.match_forgot_password_otpLoading = true;
        state.match_forgot_password_otpError = null;
      })
      .addCase(match_forgot_password_otp.fulfilled, (state, action) => {
        state.match_forgot_password_otpLoading = false;
        state.match_forgot_password_otpError = null;
      })
      .addCase(match_forgot_password_otp.rejected, (state, action) => {
        state.match_forgot_password_otpLoading = false;
        state.match_forgot_password_otpError = action.payload?.message ?? null;
      });
    builder
      .addCase(reset_forgot_password.pending, (state) => {
        state.reset_forgot_passwordLoading = true;
        state.reset_forgot_passwordError = null;
      })
      .addCase(reset_forgot_password.fulfilled, (state, action) => {
        state.reset_forgot_passwordLoading = false;
        state.reset_forgot_passwordError = null;
      })
      .addCase(reset_forgot_password.rejected, (state, action) => {
        state.reset_forgot_passwordLoading = false;
        state.reset_forgot_passwordError = action.payload?.message ?? null;
      });

    builder
      .addCase(userStatus.pending, (state) => {
        state.userTureStatusLoading = true;
        state.userTureStatusError = null;
      })
      .addCase(userStatus.fulfilled, (state, action) => {
        state.userTureStatusLoading = false;
        console.log(121, action.payload);
        state.userTureStatus = action.payload;
        state.userTureStatusError = null;
      })
      .addCase(userStatus.rejected, (state, action) => {
        state.userTureStatusLoading = false;
        state.userTureStatusError = action.payload?.message ?? null;
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
