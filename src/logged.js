import './logged.css';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import {  auth, db } from './firebase';
import firebase from 'firebase';
import Todo from './todo';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { Avatar} from '@material-ui/core';
import { logout } from './features/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

function Logged() {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [task, setTask] = useState("");
    const [tasklist, setTasklist] = useState([]);
    useEffect(() => {
        db.collection(user.id).orderBy('timestamp','desc').onSnapshot((snapshot)=> 
            setTasklist(snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data(),
            }))));    
    }, [user.id])
    const addtask = (e)=>{
        e.preventDefault();
        db.collection(user.id).add({
        todo:task,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        done:false,
        })
        setTask("");
    }
    const out=()=>{
        auth.signOut().then(
            dispatch(logout({
                user:null,
            })         
            )
        )
    }
    const useStyles = makeStyles((theme) => ({
        orange: {
          color: theme.palette.getContrastText(deepOrange[500]),
          backgroundColor: deepOrange[500],
          textTransform: 'capitalize',
        },
      }));

    return (<>
        <div className="header">
                <Avatar className={useStyles().orange}>{user?.user[0]}</Avatar>
                <Button onClick={out}>logout</Button>
        </div>
        <div >
        <h1 className="text">Todo List</h1>
          <form className="input">
            <div className="input-text" >
            <TextField id="outlined-basic" label="Add Task" variant="outlined" style={{backgroundColor:"white", zIndex:"0"}} value={task} onChange={e=>setTask(e.target.value)}/>
            </div>
            <Button variant="contained" type="submit" onClick={addtask} color="primary" className="button">ADD</Button>
          </form>

          <div className="taskList">
              {tasklist.map(({id, data:{todo, timestamp, done} }) =>(
              <Todo id={id} key={id} task={todo} time={moment(timestamp?.toDate()).calendar()} done={done}/>
               ))
              }
           </div>
           </div>
           </>
    )
}

export default Logged
