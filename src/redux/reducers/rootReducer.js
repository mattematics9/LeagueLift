const initState = {
    currentUser: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        userFirestore: JSON.parse(localStorage.getItem('userFirestore')) || null
    }
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case 'USER_SIGN_UP':
        case 'USER_LOGIN':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: action.payload.user,
                    userFirestore: action.payload.userFirestore
                }
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: action.payload.user,
                    userFirestore: action.payload.userFirestore
                }
            }
        case 'USER_REFRESH':
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: action.payload.user
                }
            }
        case 'USERFIRESTORE_REFRESH':
            return{ 
                ...state,
                currentUser: {
                    ...state.currentUser,
                    userFirestore: action.payload.userFirestore
                }
            }
        default:
            return state
    }
}

export default rootReducer