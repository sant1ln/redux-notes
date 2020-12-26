import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLogin } from '../../actions/auth';
import { useForm } from '../../Hooks/useForm';

export const LoginScreen = ({history}) => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        email: 'sa@g.co',
        password: '1234567'
    })

    const {email,password} = values

    const handleLogin = (e) =>{
        e.preventDefault()
        dispatch(startLogin(email,password,history))
    }

    const {loading} = useSelector(state => state.ui)
    

    const handleLoginGoogle = () =>{
       dispatch(startGoogleLogin({history}))
        
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>

                <input
                    onChange={handleInputChange} 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                />

                <input
                    onChange={handleInputChange} 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text" onClick={handleLoginGoogle}>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
