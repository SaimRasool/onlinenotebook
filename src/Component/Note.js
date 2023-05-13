import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Note = () => {

  const { notes, getAllNotes, EditNote } = useContext(NoteContext);
  const ref = useRef('');
  const Closeref = useRef('');
  const [note, setNotes] = useState({_id:"", title: "", desc: "", tag: "" })
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getAllNotes();
    }
    else
    {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const UpdateNote = (Currentnote) => {
    ref.current.click();
    setNotes(Currentnote);
  }
  const handleUpdateClick = (e) => {
    EditNote(note._id,note.title, note.desc, note.tag);
    Closeref.current.click();
  }
  const OnInput = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <AddNote />

      <button type="button" ref={ref} className="btn btn-primary" hidden data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='title' minLength={5} required value={note.title} aria-describedby="emailHelp" onChange={OnInput} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="desc">Description</label>
                  <textarea className="form-control" id="desc" name="desc" minLength={5} rows="3" required value={note.desc} onChange={OnInput}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} aria-describedby="emailHelp" onChange={OnInput} />
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button ref={Closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length<3 || note.desc.length<5} className="btn btn-primary" onClick={handleUpdateClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h3> Your Note</h3>
        {notes.length === 0 && "No Notes to Display"}{ /*we use && when we have nothing in else*/}
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={UpdateNote} />;
        })}
      </div>
    </>
  )
}

export default Note
