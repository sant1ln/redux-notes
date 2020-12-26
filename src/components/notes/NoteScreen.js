import React,{ useRef,useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../Hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(active)
    const dispatch = useDispatch()
    const activeId = useRef(active.id)
    useEffect(() => {
        if (active.id !== activeId.current) {
            reset(active)
            activeId.current = active.id
        }
    }, [active, reset])
    useEffect(()=>{
        dispatch(activeNote(active.id,{...formValues}))
    },[formValues,dispatch])

    const { title, body, url } = formValues

    const handleDelete = () =>{
        dispatch(startDeleting(activeId))
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    name='title'
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={title}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    onChange={handleInputChange}
                    value={body}
                    name='body'
                ></textarea>

                {
                    url &&
                    <div className="notes__image">
                        <img
                            src={url}
                            alt="imagen"
                        />
                    </div>
                }

            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >Delete</button>
        </div>
    )
}
