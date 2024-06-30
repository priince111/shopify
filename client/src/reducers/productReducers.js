import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, PRODUCTS_LOADING } from '../actions/type';

const initialState = {
    products: [],
    loading: false
}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products : action.payload,
                loading: false
            };
        case ADD_PRODUCT:
            return{
                ...state,
                products: [action.payload, state.products]
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(product => product.id!==action.payload)
            }
        case UPDATE_PRODUCT:
            const {id,data} = action.payload
            return{
                ...state,
                products: state.products.map(product => {
                    if(product.id === id){
                        product = data;
                    }
                }
                    )
            }
        case PRODUCTS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}