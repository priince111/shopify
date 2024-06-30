import {
  CART_LOADING,
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CHECKOUT,
} from "../actions/type";

const initialState = {
  cart: null,
  loading: false,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log("loading cart", action.type);
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };

    case ADD_TO_CART:
      console.log("loading cart", action.type);
      return {
        ...state,
        cart: action.payload,
      };

    case DELETE_FROM_CART:
      console.log("loading cart", action.type);
      return {
        ...state,
        cart: action.payload,
      };

    case CHECKOUT:
      return {
        ...state,
        cart: null,
        loading: false,
      };

    case CART_LOADING:
      console.log("loading cart", action.type);
      return {
        ...state,
        loading: true,
      };

    default:
      console.log("loading default cart", action.type);
      return state;
  }
}
