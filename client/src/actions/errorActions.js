import {GET_ERRORS, CLEAR_ERRORS} from './type';

export const return_error = (msg, status , id = null) =>{
    return{
        type: GET_ERRORS,
        payload : {msg,status,id}
    }
}

export const clear_error = () =>{
    return{
        type: CLEAR_ERRORS
    }
}