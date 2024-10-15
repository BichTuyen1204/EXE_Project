import { configureStore } from "@reduxjs/toolkit";
import pCategoryReducer from "./product/category/pcategorySlice";
import productReducer from "./product/product/productSlice";
import uploadReducer from "./product/upload/uploadSlice";

export const store = configureStore({
    reducer: {
      product: productReducer,
      pCategory: pCategoryReducer,
      upload: uploadReducer,
    },
  });