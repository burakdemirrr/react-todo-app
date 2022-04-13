import React, { useState } from 'react'
import {db} from "../firebase"

import "./AddTask.css"
import {collection,addDoc} from "firebase/firestore"
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
    


const AddTask = ({tasks}) => {

    const [formdata,setFormData]=useState({
        title:"",
    });
    const handleSubmit = async (e)=>{
        const title=formdata.title;
        e.preventDefault();
        if(!title){
            return toast.warning("This cant be empty.");
        }
        if(tasks.length > 5  ){
            return toast.warning("You have reached the limit.");
        }
        await addDoc(collection(db,'tasks'),{
            title,
            createdAt:new Date(),
        });
        setFormData({...formdata,title:""});
    }

    const handleInputs=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }

 
    return (
            <form onSubmit={handleSubmit}>
                <h3 className="titl">To-Do App</h3>
                <div className="container">
                <div className="input_container">
                    <input type="text" placeholder="Add your new To-do" name="title"
                    value={formdata.title} onChange={(e)=>handleInputs(e)}
                    />
                </div>
            <div className="btn_container">
                <AddIcon className="haha"  sx={{ fontSize: 42 }} onClick={handleSubmit}/>
            </div>
            </div>
            </form>
    );
};

export default AddTask
