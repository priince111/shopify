import { GET_ORDERS, ORDERS_LOADING, CHECKOUT } from '../actions/type';

const initialState = {
    orders: [],
    loading: false,
}

export default function orderReducer(state = initialState, action){
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                loading: false,
                orders: action.payload
            }
        case CHECKOUT:
            return{
                ...state,
                orders : [action.payload, ...state.orders]
            }
        case ORDERS_LOADING:
            return{
                ...state,
                loading : true
            }
        default:
            return state

    }
}