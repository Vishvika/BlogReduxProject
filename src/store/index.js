import { configureStore } from "@reduxjs/toolkit";
import  uiSlice from "./ui-slice";
import blogsSlice from "./blog-list-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        blogs: blogsSlice.reducer,
    },
    
})

export default store;