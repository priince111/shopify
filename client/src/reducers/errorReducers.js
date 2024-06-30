import {GET_ERRORS, CLEAR_ERRORS} from '../actions/type';

const initialState = {
    msg: {},
    id: null,
    status: null
}

export default function errorReducer(state = initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                id: action.payload.id,
                status: action.payload.status
            }
        case CLEAR_ERRORS:
            return{
                msg: {},
                id: null,
                status: null
            }
        default:
            return state;
    }
}