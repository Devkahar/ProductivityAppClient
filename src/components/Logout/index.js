import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { logOut } from '../../actions/userAction';
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(logOut());
        navigate('/');
    },[]);
    return (
        <div></div>
    )
}

export default Logout;