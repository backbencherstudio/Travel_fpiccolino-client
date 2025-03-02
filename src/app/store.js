import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import contactReducer from "../features/contact/contactSlice";
import headerReducer from "../features/header/headerSlice";
import blogReducer from "../features/blog/blogSlice";
import countryReducer from "../features/country/countrySlice";
import packageReducer from "../features/pckage/packageSlice";
import userReducer from "../features/users/userSlice";
import sectionReducer from "../features/sectionTitle/sectionTitleSlice";
import pageDataRedicer from "../features/pageData/pageDataSlice";
import reviewReducer from "../features/review/reviewSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import orderReducer from "../features/order/orderSlice";
import newsLetterReducer from "../features/newsLetter/newsLetterSlice";
import textsReducer from "../features/texts/textsSlice";
import approachReducer from "../features/approach/approachSlice";
export const store = configureStore({
  reducer: {
    authorization: authReducer,
    dashboard: dashboardReducer,
    category: categoryReducer,
    contact: contactReducer,
    header: headerReducer,
    blog: blogReducer,
    country: countryReducer,
    user: userReducer,
    package: packageReducer,
    section: sectionReducer,
    pageData: pageDataRedicer,
    review: reviewReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    newsletter: newsLetterReducer,
    texts: textsReducer,
    approach: approachReducer,
  },
});

export default store;
