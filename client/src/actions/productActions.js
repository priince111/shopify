import axios from 'axios';
import { return_error } from './errorActions';
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, PRODUCTS_LOADING } from './type';

export const getproducts = () => (dispatch) =>{
    dispatch(setItemLoading());
    axios.get('/api/products')
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload : res.data
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const addproduct = (product) => (dispatch)=>{
    axios.post('/api/products', product)
        .then(res => dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const deleteProduct = (id) => (dispatch)=> {
    axios.delete(`/api/products/${id}`)
        .then(res => dispatch({
            type: DELETE_PRODUCT,
            payload: id
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const updateProduct = (id, item) => (dispatch)=> {
    axios.put(`/api/products/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_PRODUCT,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => {
            dispatch(return_error(err.response.data, err.response.status))
        })
}

export const setItemLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}