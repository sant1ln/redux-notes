const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'NEW_NOTE':
        case 'NOTE_ACTIVE':
            return{
                 ...state,
                 active: {
                     ...action.payload
                 } 
            }
        case 'NOTE_LOAD':
            return{
                ...state,
                notes: [...action.payload]
            }
        case 'NOTE_UPDATED':
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ?action.payload.note
                        :note
                )
            }
        case 'NOTE_DELETE':
            return{
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case 'NOTE_CLEANING':
        default:
            return state
    }
}