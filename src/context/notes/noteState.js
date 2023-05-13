import React from "react";
import NoteContext from './noteContext';
import { useState, useContext } from "react";
import AlertContext from '../alert/alertContext';

const NoteState = (props) => {
    const host = "http://localhost:5000/api/notes";
    const [notes, setNotes] = useState([]);
    const { showAlert } = useContext(AlertContext);


    //API / Get Notes
    const getAllNotes = async () => {
        const response = await fetch(`${host}/getallnotes`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setNotes(data);
    }


    // API / Add Note
    const AddNote = async (title, desc, tag) => {
        const response = await fetch(`${host}/addnotes`, {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({  title,  desc, tag })
        });
        const data = await response.json(); 
        setNotes(notes.concat(data.savenotes));
        if (data.success)
        {
            showAlert("Note Created Successfully", "success");          
        }
        else
        {
            showAlert(data.msg, "danger");          

        }

    }

//API Edit Note
    const EditNote = async (id, title, desc, tag) => {
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        });
        const data = await response.json();
        console.log(data)
        if (data.success) {
            showAlert("Note Updated Successfully", "success");
        }
        else {
            showAlert(data.msg, "danger");

        }
    }


    //API/Delete Note
    const DeleteNote = async (id) => {
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newNote = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNote);
        const data = await response.json();
        if (data.success) {
            showAlert("Note Deleted Successfully", "success");
        }
        else {
            showAlert(data.msg, "danger");

        }
    }
    return (
        <NoteContext.Provider value={{ notes, AddNote, EditNote, DeleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;