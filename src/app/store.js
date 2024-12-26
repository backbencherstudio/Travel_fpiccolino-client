import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import headerReducer from "../features/header/headerSlice";

export const store = configureStore({
  reducer: {
    authorization: authReducer,
    category: categoryReducer,
    header : headerReducer
  },
});

export default store;
