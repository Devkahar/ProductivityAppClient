import React from 'react'
import { useNavigate } from 'react-router-dom';

const LoginRequired = (props) => {
    const user = localStorage.getItem('userData');
    const navigate = useNavigate();
    useEffect(() =>{
        if(!user){
            navigate('/login');
        }
    },[]);
    return (
        <div>
            {props.children}
        </div>
    )
}

export default LoginRequired