import './App.css'
import { useEffect } from 'react'
import { auth, firestore } from './firebase/config'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/nav/Navbar'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import { connect } from 'react-redux'


function App(props) {

  const {dispatch} = props;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user){
          firestore.collection('users').doc(user.uid).get()
            .then(userFirestoreRes => {
              const userFirestore = userFirestoreRes.data();
              dispatch(user, userFirestore);
              sessionStorage.setItem('user', JSON.stringify(user));
              sessionStorage.setItem('userFirestore', JSON.stringify(userFirestore));
            })
        }else{ 
          dispatch(null, null);
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('userFirestore');
        }
    });
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Route exact path='/' component={Home}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={Login}/>
      </BrowserRouter>
    </div>
  );
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

export default connect(null, mapDispatchToProps)(App);
