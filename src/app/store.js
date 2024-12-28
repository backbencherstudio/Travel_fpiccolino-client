import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import contactReducer from "../features/contact/contactSlice";
import headerReducer from "../features/header/headerSlice";
import blogReducer from "../features/blog/blogSlice";
import countryReducer from "../features/country/countrySlice";
import packageReducer from "../features/pckage/packageSlice";

export const store = configureStore({
  reducer: {
    authorization: authReducer,
    category: categoryReducer,
    contact: contactReducer,
    header: headerReducer,
    blog: blogReducer,
    country : countryReducer,
    package : packageReducer
  },
});

export default store;
