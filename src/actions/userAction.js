import axios from 'axios';

import {USER_AUTH_LOADING,USER_AUTH_SET,USER_AUTH_ERROR,USER_RESET} from '../constants/index'

const authGoogle = (authData)=> async(dispatch)=>{
    dispatch({type: USER_AUTH_LOADING});
    try {
        const {data} = await axios.post('api/user/googleauth/',authData);
        if(data){
            const payload ={
                ...data,
                imageUrl: authData.profileObj.imageUrl,
            };
            localStorage.setItem('userData',JSON.stringify(payload));
            dispatch({type: USER_AUTH_SET, payload});
        };
    } catch (error){
        dispatch({type: USER_AUTH_ERROR, payload:error});
    }
}

const signInAction = (authData)=> async(dispatch)=>{
    dispatch({type: USER_AUTH_LOADING});
    try {
        const {data} = await axios.post('api/user/signin/',authData);
        if(data){
            const payload ={
                ...data,
            };
            localStorage.setItem('userData',JSON.stringify(payload));
            dispatch({type: USER_AUTH_SET, payload});
        };
    } catch (error){
        dispatch({type: USER_AUTH_ERROR, payload:error});
        console.log(error.message);
    }
}
const signUpAction = (authData)=> async(dispatch)=>{
    dispatch({type: USER_AUTH_LOADING});
    try {
        const {data} = await axios.post('api/user/signup/',authData);
        if(data){
            const payload ={
                ...data,
            };
            localStorage.setItem('userData',JSON.stringify(payload));
            dispatch({type: USER_AUTH_SET, payload});
        };
    } catch (error){
        dispatch({type: USER_AUTH_ERROR, payload:error});
    }
}

const logOut = () =>(dispatch) =>{
    dispatch({type: USER_RESET});
    localStorage.clear();
}

export{
    authGoogle,logOut,signInAction,signUpAction
}
