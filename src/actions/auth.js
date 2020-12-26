import {firebase, googleAuthProvider} from '../firebase/firebaseConfig'
import { finishLoading, startLoading } from './ui'

export const startLogin = (email,password,history) =>{
    return (dispatch)=>{


        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user})=>{
           dispatch(login(user.uid,user.displayName))
           dispatch(finishLoading())
        })
        .catch(e=>{
            console.log(e);
        })
    }
}


export const register = (newUser) =>({
    type: 'REGISTER',
    payload: newUser,
})

export const startDefaultRegister = (email,password,name) =>{
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async({user})=>{
           await user.updateProfile({displayName: name})
            console.log(user)
           /*  dispatch(login(user.uid,user.displayName)) */
        })
        .catch(e=>{
            console.log(e);
        })
    }
}



export const startGoogleLogin = ({history})=>{
    return (dispatch)=>{
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(user=>{
                dispatch(login(user.uid,user.displayName))
            }).then(()=>{
                history.replace('/')
            })
    }
}


export const login = (uid,displayName)=>({
        type: 'LOGIN',
        payload:{
            uid,
            displayName
        }
})

export const startLogout = () =>{
    return (dispatch) =>{
        firebase.auth().signOut()

        dispatch(logout())
    }
}

export const logout = () =>({
    type: 'LOGOUT'
})