import { Box, TextField, Typography } from '@material-ui/core';
import {Button} from '@mui/material'
import React, { useState,useEffect } from 'react';
import Modal from '../Modal';
import FormControl from '@mui/material/FormControl';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '../../assets/googleIcon.png';
import {authGoogle, signInAction, signUpAction} from '../../actions/userAction';
import { useDispatch,useSelector } from 'react-redux'
import Userprofile from '../Userprofile';
const Auth = (props) => {
    // Model Variable and Methods
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Form Type We want to render;
    const [type, setType] = useState(props.type);
    // Form Data Variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Form Error Variables
    const [firstNameValidater,setFirstNameValidater] = useState(null);
    const [lastNameValidater,setLastNameValidater] = useState(null);
    const [emailValidater,setEmailValidater] = useState(null);
    const [passwordValidater,setPasswordValidater] = useState(null);

    // Google Auth response
    const dispatch = useDispatch();
    const responseGoogle = async (res) => {
        console.log(res);
        if(!(res.error)){
            dispatch(authGoogle(res));
        }
    }
    // Getting UserData;
    const user = useSelector(state=> state.userData);
    useEffect(()=>{
        if(user?.isUser){
            // console.log(user);
            setOpen(false);
        }
    },[user]);
    // Changing Form Type
    const changeTypeHandler = () => {
        if (type === 'signup') {
            setType('signin');
        } else {
            setType('signup');
        }
        setFirstNameValidater(null);
        setLastNameValidater(null);
        setEmailValidater(null);
        setPasswordValidater(null);
    }
    // Validate Email
    const validateEmail = (email) => {
       return( String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ));
    };
    // Validate Email
    const validatePassword = (password) =>{
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return String(password).match(regularExpression)
    };
    // Form Input Methods
    const firstNameChangeHandler = (e)=>{
        setFirstName(e.target.value);
    }
    const lastNameChangeHandler = (e)=>{
        setLastName(e.target.value);
    }
    const emailChangeHandler = (e) =>{
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e) =>{
        setPassword(e.target.value);
    }
    // Handel SignIn
    const signInHandler = () =>{
        let isDone = true;
        if(!validatePassword(password)){
            isDone= false;
            setPasswordValidater({message:"Enter Valid Password"});
        }else setPasswordValidater(null);
        if(!validateEmail(email)){
            isDone= false;
            setEmailValidater({message:"Incorrect Email"});
        }else setEmailValidater(null);
        if(isDone){
            dispatch(signInAction({email,password}))
            console.log("Sign In Done");
        }
    }
    // Handel SignUp
    const signUpHandler = () =>{
        let isDone = true;
        if(!validatePassword(password)){
            setPasswordValidater({message:"Enter Valid Password"});
            isDone = false;
        }else setPasswordValidater(null);
        if(!validateEmail(email)){
            setEmailValidater({message:"Incorrect Email"});
            isDone = false;
        }else setEmailValidater(null);
        if(!firstName.match(/^[a-z,A-Z]/)){
            setFirstNameValidater({message:'Field Cannot remain Empty'});
            isDone = false;
        } else setFirstNameValidater(null);
        if(!lastName.match(/^[a-z,A-Z]/)){
            setLastNameValidater({message:'Field Cannot remain Empty'});
            isDone = false;
        } else setLastNameValidater(null);

        if(isDone){
            dispatch(signUpAction({email,firstName,lastName,password}));
            console.log("SignUp Done");
        }
    }
    // Data for SignIn
    const forSignIn = [
        { name: 'Email', type: 'email' ,value: email,onchange: emailChangeHandler,error: emailValidater},
        { name: 'Password', type: 'password',value: password ,onchange: passwordChangeHandler,error: passwordValidater},
    ];
    // Data For SignUp
    const forSignUp = [
        { name: 'First Name', type: 'text',value: firstName,onchange: firstNameChangeHandler,error: firstNameValidater},
        { name: 'Last Name', type: 'text',value: lastName,onchange: lastNameChangeHandler ,error: lastNameValidater},
        { name: 'Email', type: 'email' ,value: email,onchange: emailChangeHandler,error: emailValidater},
        { name: 'Password', type: 'password',value: password ,onchange: passwordChangeHandler,error: passwordValidater},
    ];
    // Main Data Stream;
    const data = { 'signup': forSignUp, 'signin': forSignIn };

    // console.log("USer ",user);
    return <div>
        {user.isUser?
            <Userprofile/>
        :
        <Button variant="outlined" size="large" onClick={handleOpen} style={{marginRight: "0"}}>SignUp/SignIn</Button>
        }
        <Modal open={open} handleOpen={handleOpen} handleClose={handleClose} >
            <Typography variant="h4" style={{ textAlign: 'center' }} >
                {type === 'signin' ? 'Sign In' : 'Sign Up'}
            </Typography>
            <Box sx={{ width: "100%", mt: 2 }}>
                <FormControl fullWidth margin="dense">
                    {
                        data[type]?.map(e => (
                            <TextField
                                key={e.name}
                                label={e.name}
                                value={e.value}
                                variant="standard"
                                color="#000"
                                type={e.type}
                                required
                                style={{ marginBottom: '25px' }}
                                onChange={e.onchange}
                                error={e.error?true:false}
                                helperText={e.error?.message}
                            />
                        ))
                    }
                    {error && <Typography style={{ color: "#ff0000" }}>{error}</Typography>}
                    <Button variant="contained" className="btn btn-pink" onClick={type === 'signup'?signUpHandler:signInHandler}>{type === 'signin' ? 'Sign In' : 'Sign Up'}</Button>
                    <Typography variant="p" style={{ textAlign: "center" }}>or</Typography>
                    <GoogleLogin
                        clientId="153115645135-67620duj9tspjc1qbg7a65p6en7ailf7.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn"><img style={{ height: "22px", marginRight: "15px", textTransform: "lowercase", }} src={GoogleIcon} />{type === 'signin' ? 'Sign In' : 'Sign Up'} With Google</Button>
                        )}
                        buttonText="Login With Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Typography style={{ textAlign: "right", color: "blue", cursor: "pointer", textDecoration: "underline" }} onClick={changeTypeHandler}>{type === 'signin' ? 'Create New Account?' : 'Already Have Account?'}</Typography>
                </FormControl>
            </Box>
        </Modal>
    </div>;
};

export default Auth;
