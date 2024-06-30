import axios from "axios";
import { return_error } from "./errorActions";
import { GET_ORDERS, ORDERS_LOADING, CHECKOUT, GET_CART } from "./type";

export const getOrder = (id) => async (dispatch) => {
  console.log("id in get order is", id);
  dispatch(setOrderLoading());
  try {
    const res = await axios.get(`api/order/${id}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(return_error(err.response.data, err.response.status));
  }
};

export const setOrderLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};

export const checkout = (id, source) => async(dispatch) => {
  console.log("source in checout", source);
  console.log("id in checkout", id);
  const body = JSON.stringify({ source });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log("body in checout", body);
  try {
    const res = await axios.post(`api/order/${id}`, body, config);
    dispatch({
      type: CHECKOUT,
      payload: res.data,
    });
    
    const cartRes = await axios.get(`/api/cart/${id}`);
    dispatch({
      type: GET_CART,
      payload: cartRes.data,
    });

  } catch (err) {
    dispatch(return_error(err.response.data, err.response.status));
  }
};
