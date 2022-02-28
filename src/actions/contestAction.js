import axios from 'axios';
import {
    CONTEST_DATA_LOADING,
    CONTEST_DATA_SET,
} from '../constants';
const constestDetails = ()=> async(dispatch)=> {
    console.log("Loading");
    dispatch({type: CONTEST_DATA_LOADING});
    try {
        const {data} = await axios.get('https://kontests.net/api/v1/all');
        console.log(data);
        if(data) dispatch({type: CONTEST_DATA_SET, payload: data});
    } catch (error) {
        dispatch({type: CONTEST_DATA_SET, payload:error});
        console.log(error);
    }
}
export {
    constestDetails
}