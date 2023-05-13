import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
  const { note, updateNote }=props;
    const { DeleteNote } = useContext(NoteContext);

  return (
    <div className='col-md-3'>
          <div className="card my-3" >
       
                  <div className="card-body">
                    <h5 className="card-title">   {note.title}</h5>
                    <p className="card-text">{note.desc}</p>
                    <i className='far fa-edit mx-2' onClick={() => { updateNote(note)}}></i>
                    <i className='fas fa-trash-alt' onClick={() => { DeleteNote(note._id)}} ></i>
                  </div>
          </div>
   
          
    </div>
  )
}

export default NoteItem
