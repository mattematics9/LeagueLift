import { firestore, auth } from "../../firebase/config"
import { addLocalStorage, removeLocalStorage } from "../../localStorage"

export const userSignUp = (name, email, password, setErrorText) => {
    return (dispatch, getState) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                const user = userAuth.user;
                let actionCodeSettings = {url: 'http://localhost:3000/'}
                user.sendEmailVerification(actionCodeSettings)
                    .then(() => {
                        firestore.collection('users').doc(user.uid).set({name,email})
                            .then(() => {
                                firestore.collection('users').doc(user.uid).get()
                                    .then((userFirestoreRes) => {
                                        const userFirestore = userFirestoreRes.data();
                                        dispatch({
                                            type: 'USER_SIGN_UP',
                                            payload: {user, userFirestore}
                                        });
                                        addLocalStorage(user, userFirestore);
                                    })
                                    .catch(() => setErrorText('Could not fetch user data'))
                            })
                            .catch(() => userAuth.user.delete())
                    })
            })
            .catch(error => setErrorText(error.message))
    }
}

export const userLogin = (email, password, history, setErrorText) => {
    return (dispatch, getState) => {
        auth.signInWithEmailAndPassword(email, password)  
            .then((userAuth) => {
                const user = userAuth.user
                firestore.collection('users').doc(user.uid).get()
                    .then((userFirestoreRes) => {
                        const userFirestore = userFirestoreRes.data();
                        dispatch({
                            type: 'USER_LOGIN',
                            payload: {user, userFirestore}
                        });
                        addLocalStorage(user, userFirestore);
                        if(user.emailVerified){
                            history.push('/');
                        }else{
                            history.push('/email-verification');
                        }
                    })
            })
            .catch(error => setErrorText(error.message))
    }
}

export const userLogout = () => {
    return (dispatch, getState) => {
        removeLocalStorage();
        auth.signOut()
            .then(() => {
                dispatch({
                    type: 'USER_LOGOUT',
                    payload: {user: null, userFirestore: null}
                })
            })
    }
}

export const userRefresh = (user, dispatch) => {
    dispatch({
        type: 'USER_REFRESH',
        payload: {user}
    }) 
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
}