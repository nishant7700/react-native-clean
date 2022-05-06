import api from "../../domain/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILE,
  FORM_SUBMITTING,
} from "../types/auth_type";
import { handleError } from "../../shared/handleError";
import setAuthToken from "../../domain/setAuthToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/profile");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: FORM_SUBMITTING,
      payload: true,
    });
    const registeruser = {
      name: formData.name,
      username: formData.phone,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
    const res = await api.post("/users/sign-up", registeruser);
    // console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    setAuthToken(res.data.token);
    dispatch(loadUser());
    dispatch({
      type: FORM_SUBMITTING,
      payload: false,
    });
  } catch (err) {
    console.log(err);
    dispatch(handleError(err));
    dispatch({
      type: FORM_SUBMITTING,
      payload: false,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: FORM_SUBMITTING,
      payload: true,
    });
    const res = await api.post("/users/login", formData);
    // console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setAuthToken(res.data.token);
    dispatch(loadUser());
    dispatch({
      type: FORM_SUBMITTING,
      payload: false,
    });
  } catch (err) {
    dispatch(handleError(err));
    dispatch({
      type: FORM_SUBMITTING,
      payload: false,
    });
  }
};
export const updateProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.put("/users/profile", formData);
    // console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    // setAuthToken(res.data.token);
    // dispatch(loadUser());
  } catch (err) {
    dispatch(handleError(err));
  }
};
export const forgetPassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/forgot-password", formData);
    dispatch(
      setAlert(
        "Email Reset link successfully sent to your email. Please check your email.",
        "success"
      )
    );
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(handleError(err));
  }
};
export const resetPassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/reset-password", formData);
    // console.log(res.data);
    if (res.data) {
      dispatch(setAlert("Your Password Reset Successfully", "success"));
    }
  } catch (err) {
    dispatch(handleError(err));
  }
};
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/password", formData);
    // console.log(res.data);
    setAuthToken(res.data.jwt);
    if (res.data) {
      dispatch(setAlert("Your Password Changed Successfully", "success"));
    }
  } catch (err) {
    dispatch(handleError(err));
  }
};
export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("SELECT_GENERATOR");
    setAuthToken();

    dispatch({ type: LOGOUT });
  } catch (e) {
    // saving error
    setAuthToken();
    dispatch({ type: LOGOUT });
  }
};
