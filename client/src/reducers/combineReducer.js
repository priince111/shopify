import {combineReducers} from 'redux';
import orderReducer from './orderReducers';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import productReducer from './productReducers'
import cartReducer from './cartReducers';

export default combineReducers({
    orderReducer,
    authReducer,
    errorReducer,
    productReducer,
    cartReducer
})