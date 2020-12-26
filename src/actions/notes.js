import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { fileUpload } from "../helpers/fileUpload"

export const startNewNote = () =>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        
        dispatch(activeNote(doc.id,newNote))
    } 
}

export const activeNote = (id,note) => ({
    type: 'NOTE_ACTIVE',
    payload:{
        id,
        ...note
    }
})


export const setNotes = (notes) =>({
    type: 'NOTE_LOAD',
    payload: notes
})

export const startSaveNote = (note) =>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth
        if(!note.url){
            delete note.url
        }
        const noteToFirestore = {...note}
        delete noteToFirestore.id

        await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestore) 
        dispatch(refreshNote(note.id,note))
        Swal.fire('Saved',note.title, 'success')
    }
}

export const refreshNote = (id,note) =>({
    type: 'NOTE_UPDATED',
    payload: {
        id,
        note
    }
})

export const startUploading = (file) =>{
     return async(dispatch,getState)=>{
        const {active:  activeNote} = getState().notes
        Swal.fire({
            title: 'Uploading...',
            text: 'Plase wait...',
            allowOutsideClick: false,
            onBeforeOpen: () =>{
                Swal.showLoading()
            }
        })
        const fileUrl = await fileUpload(file)
        console.log(fileUrl);
        Swal.close()
        activeNote.url = fileUrl
        dispatch(startSaveNote(activeNote))
     }
}

export const startDeleting = (id) =>{
    return async(dispatch,getState)=>{
        const uid = getState().auth.uid 
        await db.doc(`/${uid}/journal/notes/${id}`).delete()

        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) =>({
    type: 'NOTE_DELETE',
    payload: id
})

/* redux-notes-images */