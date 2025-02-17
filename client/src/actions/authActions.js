import axios from "axios";
import { return_error } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./type";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(return_error(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
      localStorage.removeItem('token'); 
    });
};

export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    console.log("hi name is", name);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    console.log("body is", body);

    axios
      .post("api/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        console.log("error is", err);
        dispatch(
          return_error(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post("api/login", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        dispatch(
          return_error(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout = () => {
  localStorage.removeItem("token") 
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
    console.log("getstate",getState);
  const token = getState().auth.token || localStorage.getItem("token");

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
