import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_path";

// Fetch all texts
export const fetchTexts = createAsyncThunk(
  "texts/fetchTexts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/api/texts`);
      const textsObj = {};
      response.data.data.forEach((item) => {
        textsObj[item.key] = item.value;
        textsObj[`${item.key}_id`] = item._id;
      });
      return textsObj;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update or create text
export const updateText = createAsyncThunk(
  "texts/updateText",
  async ({ key, value }, thunkAPI) => {
    try {
      const response = await axios.put(`${base_url}/api/texts`, { key, value });
      return {
        key,
        value: response.data.data.value,
        id: response.data.data._id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const textsSlice = createSlice({
  name: "texts",
  initialState: {
    texts: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch texts
      .addCase(fetchTexts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTexts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.texts = action.payload;
      })
      .addCase(fetchTexts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update text
      .addCase(updateText.fulfilled, (state, action) => {
        state.texts[action.payload.key] = action.payload.value;
        state.texts[`${action.payload.key}_id`] = action.payload.id;
      });
  },
});

export default textsSlice.reducer;
