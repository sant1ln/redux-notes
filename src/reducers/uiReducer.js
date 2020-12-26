export const uiReducer = (state={loading:false},action) =>{
    switch(action.type){
        case 'START_LOADING':
            return {...state,
                    loading: true}
        case 'FINISH_LOADING':
            return {...state,
                loading: false}
        default: return state

    }
}