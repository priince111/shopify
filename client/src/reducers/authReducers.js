import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/type';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export default function  authReducer(state = initialState, action) {
    switch(action.type){
        case USER_LOADING:
            console.log("loading user",action.type)
            return{
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            console.log("loading user",action.type)
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            console.log("loading user",action.type)
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
            };
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            console.log("loading user",action.type)
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            console.log("default user",action.type)
            console.log("state",state);
            return state;
            
            
        
    }
}