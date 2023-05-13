import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
const AddNote = () => {
    const { AddNote } = useContext(NoteContext);
    const [note, setNotes] = useState({ title: "", desc: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        AddNote(note.title, note.desc, note.tag);
        setNotes({ title: "", desc: "", tag: "" })
    }
    const OnInput = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value });
    }
    return (

        <div className="container-fluid">
            <h2 className='h1'>Add Notes</h2>
            <form className='row justify-content-md-center'>
                <div className='col-md-6 '>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} required minLength={3} aria-describedby="emailHelp" onChange={OnInput} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="desc">Description</label>
                        <textarea className="form-control" id="desc" name="desc" rows="3" value={note.desc} required minLength={5} onChange={OnInput}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} aria-describedby="emailHelp" onChange={OnInput} />
                    </div>
                    <button disabled={note.title.length < 3 || note.desc.length < 5} type="submit" className="col-md-3 btn btn-primary" onClick={handleClick}>AddNote</button>
                </div>
                
            </form>
        </div>
    )
}

export default AddNote
