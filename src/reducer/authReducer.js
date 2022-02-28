import {
    USER_AUTH_ERROR,
    USER_AUTH_SET,
    USER_AUTH_LOADING,
    USER_RESET
} from '../constants/index';
const authReducer = (state={}, action) =>{
    switch(action.type){
        case USER_AUTH_LOADING:
            state ={
                loading: true,
            }
            break;
        case USER_AUTH_ERROR:
            state ={
                loading: false,
                ...action.payload,
                error: true,
                isUser: false,
            }
            break;
        case USER_AUTH_SET:
            state={
                loading: false,
                error: false,
                isUser: true,
                ...action.payload
            }
            break;
        case USER_RESET:
            console.log("RESET Done");
            state={}
            break;
    }
    return state;
}

export{
    authReducer
};