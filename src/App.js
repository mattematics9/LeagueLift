import './App.css'
import { useEffect } from 'react'
import { auth, firestore } from './firebase/config'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/nav/Navbar'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import EmailVerification from './components/auth/EmailVerification'
import PasswordReset from './components/auth/PasswordReset'
import { connect } from 'react-redux'


function App({dispatch, currentUser}) {

  console.log(currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user){
          // setTimeout(() => {
            firestore.collection('users').doc(user.uid).get()
              .then(userFirestoreRes => {
                const userFirestore = userFirestoreRes.data();
                dispatch(user, userFirestore);
              })
          // }, 600);
        }else{ 
          dispatch(null, null);
        }
    });
  },[dispatch])

  let routes;

  if (currentUser.user && currentUser.user.emailVerified){
    routes = (
      <>
        <Route exact path='/' component={Home}/>
        <Route path='/email-verification' component={EmailVerification}/>
      </>
    )

  } else if (currentUser.user && !currentUser.user.emailVerified){
    routes = (
      <>
        <Route path='/email-verification' component={EmailVerification}/>
        <Redirect to='/email-verification'/>
      </>
    )

  } else if (!currentUser.user){
    routes = (
      <>
        <Route exact path='/' component={Home}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={Login}/>
        <Route path='/password-reset' component={PasswordReset}/>
      </>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {routes}
      </BrowserRouter>
    </div>
  );
}

const mapStateToprops = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (user, userFirestore) => {
        dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              user,
              userFirestore
            }
        })
    }
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(App);
