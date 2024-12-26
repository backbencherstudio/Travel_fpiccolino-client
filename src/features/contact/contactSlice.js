import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

axios.defaults.withCredentials = true;

export const createContact = createAsyncThunk(
  "api/contact/createContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/contact/createContact`, contactData);
      console.log("slice", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createContact.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createContact.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts.push(action.payload);
        })
        .addCase(createContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default contactSlice.reducer;
