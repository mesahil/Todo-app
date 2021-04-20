import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import './todo.css'
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Todo({id, task, time, done}) {
    const [modelIsOpen, setmodelIsOpen] = useState(false);
    const [newtask, setNewtask] = useState(task);
    useEffect(() => {
        setNewtask(task)
    }, [id, task])
    const openModal = () =>{
        setmodelIsOpen(true)
    }
    const status = ()=>{
        db.collection('tasks').doc(id).update({
            done: !done
        })
    }   
    const remove = () =>{
        db.collection("tasks").doc(id).delete();
    }
    const edit = (e)=>{
        e.preventDefault();
        console.log(newtask)
        db.collection('tasks').doc(id).update({
            todo:newtask
        })
        setmodelIsOpen(false)
    }
    return (
        <div className="todo">
            <div onClick={openModal} className="text-edit">
                <h3  className={done ? 'text-strike' : null}>{task}</h3>
            </div>
            <div className="but">
            <h6 style={{margin:"0px", marginTop:"2px", cursor: "context-menu",}}><b>Created:</b> {time} </h6>
                <div className="button">
                    <Button onClick={status} >{done?"Undone":"Done"}</Button>
                    <DeleteIcon onClick={remove}/>
                </div>
            </div>
            <hr style={{width:"100%"}}/>
{/* modal start */}
            <Modal isOpen={modelIsOpen}  className="modal">
                <div className="modal-content" >
                    <div className="modal-data">
                        <span className="close" onClick={()=>setmodelIsOpen(false)}>&times;</span>
                    </div>
                    <form className="modal-button">
                        <textarea className="modal-text" value={newtask} onChange={e=>setNewtask(e.target.value)}></textarea>
                        <Button type="submit" onClick={edit}>Submit</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Todo
