import axios from 'axios';
import { return_error } from './errorActions';
import { CART_LOADING, GET_CART, ADD_TO_CART, DELETE_FROM_CART } from './type';

export const getCart = (id) => async (dispatch) => {
    console.log("id",id);
    dispatch(setCartLoading());
    try {
        const res = await axios.get(`api/cart/${id}`);
        dispatch({
            type: GET_CART,
            payload: res.data
        });
    } catch (err) {
        console.error('Error fetching cart:', err);
        dispatch(return_error(err.response.data, err.response.status));
    }
}

export const addToCart = (id, productId, quantity) => (dispatch) => {
    console.log("id",id);
    const body = JSON.stringify({ productId, quantity });

        // Config for request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

    axios.post(`api/cart/${id}`,body, config)
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload : res.data
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const deleteFromCart = (userId, productId) => (dispatch) => {
    console.log("userId in delete cart",userId);
    console.log("productId in delete cart",productId);
    axios.delete(`api/cart/${userId}/${productId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload : res.data
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const setCartLoading = () => {
    return{
        type: CART_LOADING
    }
}