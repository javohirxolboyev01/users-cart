import { configureStore } from "@reduxjs/toolkit";
import wishlistReduser from "./feature/wishlistSlice";
import addToCart from "./feature/cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReduser,
    cart: addToCart,
  },
});
