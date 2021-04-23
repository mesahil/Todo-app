import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import "./login.css"
import { auth } from './firebase';
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    signup: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      width:"100%",
      fontWeight:'500',
      color:'white',
    },
  });   

function Login() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login =(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(userAuth=>{
            console.log(userAuth.user.uid);
            dispatch(login({
                user: userAuth.user.email,
                id: userAuth.user.uid,
                
            }))
            
        }).catch(e=>{console.log(e)})

    }
    return (    
        <div className="login-container">
            <form className="login">
                <TextField id="standard-basic" label="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <TextField type='password' id="standard-basic" label="Password" value={password} onChange={e=> setPassword(e.target.value)}/>
                <Button type="submit" onClick={login} variant="contained" color='primary'> Log In</Button>
                <Link to="/signup" style={{textDecoration:'none'}}>
                    <Button variant="contained" className={classes.signup}>Sign UP
                </Button>
                </Link>
                
                
                
            </form>
        </div>   
    )
}

export default Login
