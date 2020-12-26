import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    
    const {name} = useSelector(state => state.auth) || {uid:''}

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(startLogout())
    }

    const handleAddNew = () =>{
        dispatch(startNewNote())
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                        <span>  {name}</span>
                </h3>

                <Link
                onClick= {handleLogout}
                to="auth/login" 
                className="btn">
                    Logout
                </Link>
            </div>

            <div className="journal__new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
