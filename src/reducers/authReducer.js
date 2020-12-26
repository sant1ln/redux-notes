
export const authReducer = (state={},action) =>{
    switch(action.type){

        case 'LOGIN':
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case 'REGISTER':
            return{
                newUser: action.payload
            }
        case 'LOGOUT':
            return{}
        default:
            return state
    }
}