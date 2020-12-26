import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {startDefaultRegister } from '../../actions/auth';
import { useForm } from '../../Hooks/useForm';

export const RegisterScreen = () => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const initialState={
        name:'Santiago',
        email: 'sa@g.co',
        password: '1234567',
        password2: '1234567'
    }
    const [values,handleInputChange] = useForm(initialState)
    const {name,email,password,password2} = values

    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(startDefaultRegister(email,password,name))
    }
    
    const handleValidation = (e) =>{
        
        if(password!==password2){
            setError(true)
        }else{
            setError(false)
        }
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleSubmit}>

                <input
                    onChange={handleInputChange} 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={name}
                    autoComplete="off"
                />

                <input
                    onChange={handleInputChange} 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    autoComplete="off"
                />

                <input
                    onChange={handleInputChange} 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                />

                <input
                    onBlur={handleValidation}
                    onChange={handleInputChange} 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                />
                {error && <small>Passwords do not match</small>}

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
