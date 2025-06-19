import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlist: (state, action) => {
      const item = action.payload;
      if (!state.item.some((existingItem) => existingItem.id === item.id)) {
        state.item.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { wishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
