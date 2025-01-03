import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

// Async Thunks
export const getUser = createAsyncThunk(
  "user/getUser",
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
      const response = await axios.get(`${base_url}/users`, {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
// Get users by category
export const getUsersByCategory = createAsyncThunk(
  "user/getUsersByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/api/users/all`, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get a single user by ID
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/users/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async Thunks

// Delete a user post
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      // Make API call to delete user
      await axios.delete(`${base_url}/api/users/userDelete/${userId}`);
      return userId; // Return userId for removal from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

// Initial state
const initialState = {
  userCreateLoading: false,
  userCreateLoadingError: null,
  users: [],
  userDetails: null,
  userDetailsLoading: false,
  userDetailsError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get users
      .addCase(getUser.pending, (state) => {
        state.userCreateLoading = true;
        state.userCreateLoadingError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userCreateLoading = false;
        state.userCreateLoadingError = null;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userCreateLoading = false;
        state.userCreateLoadingError =
          action.payload?.message || "Error fetching users";
      })

      // Handle get user details
      .addCase(getUserDetails.pending, (state) => {
        state.userDetailsLoading = true;
        state.userDetailsError = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetailsLoading = false;
        state.userDetailsError = null;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetailsLoading = false;
        state.userDetailsError =
          action.payload?.message || "Error fetching user details";
      });
  },
});

export default userSlice.reducer;
