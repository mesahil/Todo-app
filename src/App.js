import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import firebase from 'firebase';
import Todo from './todo';
import moment from "moment"
function App() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  useEffect(() => {
    db.collection('tasks').orderBy('timestamp','desc').onSnapshot((snapshot)=> 
        setTasklist(snapshot.docs.map((doc) =>({
            id: doc.id,
            data: doc.data(),
        }))));    
  }, [])
  const addtask = (e)=>{
    e.preventDefault();
    db.collection("tasks").add({
      todo:task,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      done:false,
    })
    setTask("");
  }
  return (
    <div className="app">
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
    
  );
}

export default App;
