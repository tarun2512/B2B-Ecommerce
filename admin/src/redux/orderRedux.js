import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //DELETE
    // deleteProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // deleteProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.splice(
    //     state.products.findIndex((item) => item._id === action.payload),
    //     1
    //   );
    // },
    // deleteProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.order;
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //UPDATE
    // addProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // addProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.push(action.payload);
    // },
    // addProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  // deleteProductStart,
  // deleteProductSuccess,
  // deleteProductFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  // addProductStart,
  // addProductSuccess,
  // addProductFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
