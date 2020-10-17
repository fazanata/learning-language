import { ADD_USER, OUT_USER } from "../actions/actionTypes";


const userReducer = (state = {}, action) => {
    
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userUid: action.user.uid,
                name: action.user.displayName,
                userEmail: action.user.email,
                signOut: false,
            }
            case OUT_USER:
                return {
                    ...state,
                    userUid: null,
                    name: '',
                    userEmail: '',
                    signOut: true,
                }
            default:
                return state;
    }
    

}

export default userReducer;