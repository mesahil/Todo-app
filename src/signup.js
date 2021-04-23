import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import {login} from './features/userSlice'
import './signup.css'
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const dispatch = useDispatch()
    let history = useHistory();
    const signup = (e)=>{
        e.preventDefault();
        if(password!==cpassword){
            alert("Passwords doesn't match");
        }
        else{
            auth.createUserWithEmailAndPassword(email,password).then(user=>{
                dispatch(login({
                    user: user.user.email,
                    id: user.user.uid,
                }))
                history.replace({pathname:'/login'})
            }
            )
        }
    }
    return (
        <div className="signup">
            <form className="signup-form">
                <h2>Sign Up</h2>
                <TextField id="standard-basic" label="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <TextField type='password' id="standard-basic" label="Password" value={password} onChange={e=> setPassword(e.target.value)}/>
                <TextField type='password' id="standard-basic" label="Confirm Password" value={cpassword} onChange={e=> setCpassword(e.target.value)}/>
                <Button type="submit" onClick={signup} variant="contained" color='primary'> Log In</Button>
                <p>Already Have An Account? </p>
                <Link to='/login'>Login</Link>
            </form>
        </div>
    )
}

export default Signup
