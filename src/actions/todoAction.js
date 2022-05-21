import axios from 'axios';
import {
    TODO_LOADING,
    TODO_SET,
    TODO_ERROR
} from '../constants/index'
const token = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData'))['token']:null;
const saveToDoData =  async (listData,date)=>{
    try {
        const res = await axios.post('/api/todo/create/',{listData,date},{
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        // console.log(res);
        console.log("Hey we Found RES ",res);
        return "success";
    } catch (error) {
        console.log(error);
        return "error";
    }
}
const getToDoData =  (date)=> async (dispatch) =>{
    try {
        const res = await axios.post('/api/todo/get/',{date},{
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        dispatch({type: TODO_LOADING})
        if(res){
            if(res.data.status === "Data found"){
                console.log("Hey we Found RES ",res.data.data.todo);
                const data = res.data.data.todo;
                dispatch({type: TODO_SET,payload: data})
            }else{
                console.log("Hey we Found RES",res.data.status);
                dispatch({type: TODO_SET,payload: []})
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

const saveContestData = async (date,contestData)=> {
    try {
        const res = await axios.post('/api/todo/create/contest',{contestData,date},{
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        if(res){
            console.log(res.data);
            return "success"
        }
    } catch (error) {
        console.log(error);
        return "error"
    }

    
}

export {
    getToDoData,
    saveToDoData,
    saveContestData,
}