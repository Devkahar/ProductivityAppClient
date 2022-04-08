import {
    TODO_ERROR,
    TODO_SET,
    TODO_LOADING,
} from '../constants/index';
const todoReducer = (state={}, action) =>{
    switch(action.type){
        case TODO_LOADING:
            state ={
                loading: true,
            }
            break;
        case TODO_ERROR:
            state ={
                loading: false,
                ...action.payload,
                error: true,
            }
            break;
        case TODO_SET:
            state={
                loading: false,
                error: false,
                data : [...action.payload],
            }
            break;
        default:
            break; 

    }
    return state;
}

export{
    todoReducer
};