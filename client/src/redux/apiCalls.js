import { loginFailure, loginStart, loginSuccess, logout,logoutFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.statusText);
    console.log(res.status);

    if(res.status===200){
    dispatch(loginSuccess(res.data));
    }
    else{
      dispatch(loginFailure());
    }
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

