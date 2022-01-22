import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import {collection,query,onSnapshot,deleteDoc,doc,updateDoc,orderBy,limit} from "firebase/firestore"
import { db } from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fade from 'react-reveal/Fade';
import { ToastContainer } from 'react-toastify';



function App() {
  const [tasks,setTasks]=useState([]);
  const [input,setInput]=useState("");

  let subtitle;

 
  useEffect(()=>{
      const q=query(collection(db,"tasks"),orderBy("createdAt"));
      const unsub=onSnapshot(q,(querySnapshot ) =>{
        let taskArray=[];
        querySnapshot.forEach(doc=>{
          taskArray.push({...doc.data(),id:doc.id})
        })
        setTasks(taskArray);

      });
      return ()=>unsub();
  },[]);

  const updated = async (task)=>{
    const input=prompt("");
    
    await updateDoc(doc(db,"tasks",task.id),{
      title:input,
      createdAt:new Date()
    });
    setInput("");
  }
  
  
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };  
  return (
    <div className="App">
      <div className="box"> 
      <ToastContainer/>
      <AddTask tasks={tasks}/>
      <div className="task-container">
        
        {tasks &&tasks.map((task)=>(<Fade>
          <div key={task.id} className="entry">
            <p className="title">{task.title}</p>
            <p className="date">{task.createdAt.toDate().toUTCString()}</p>
          <DeleteIcon className="delete" onClick={()=>handleDelete(task.id)}/>
          <EditIcon className="edit" onClick={()=>updated(task)} />
        
              </div> </Fade>
))} 
      </div>
      </div>
    </div>
  );
}

export default App;
