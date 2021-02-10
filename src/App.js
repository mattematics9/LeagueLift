import './App.css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/nav/Navbar'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import EmailVerification from './components/auth/EmailVerification'
import PasswordReset from './components/auth/PasswordReset'
import { connect } from 'react-redux'


function App({currentUser}) {

  console.log(currentUser);

  let routes;

  if (currentUser.user && currentUser.user.emailVerified){
    routes = (
      <>
        <Route exact path='/' component={Home}/>
        <Route path='/email-verification' component={EmailVerification}/>
      </>
    )

  } else if (currentUser.user && !currentUser.user.emailVerified){
    console.log('whhhattt')
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

export default connect(mapStateToprops)(App);
