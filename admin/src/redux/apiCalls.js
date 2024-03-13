import { loginFailure, loginStart, loginSuccess, logout,logoutFailure  } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import{
  getOrderStart,
  getOrderFailure,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderRedux";

import { ToastContainer, toast } from 'react-toastify';
import { Redirect, useHistory } from "react-router-dom";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {

    const res = await publicRequest.post("/auth/login", user);
    if(res.statusText==="Login Successful!")
{  toast.success(res.statusText,{theme:"colored",autoClose: 1000} );
{/* <Redirect to="/" /> */}

// history.push("/");
    // window.location.href("http://localhost:3000/")
}
else 
{toast.error(res.statusText,{theme:"colored",autoClose: 2000} );}
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logingout = async (dispatch) => {
  try {
    dispatch(logout());
} catch (err) {
  dispatch(logoutFailure());
}
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}`, order);
    dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
