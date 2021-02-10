import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase/config'
import { userRefresh } from '../../redux/actions/auth'

const EmailVerification = (props) => {

    const { user, dispatch, history } = props

    useEffect(() => {
        var unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user);
            if(user.emailVerified){
                userRefresh(user, dispatch);
                history.push('/');
            }
        })
        return () => {unsubscribe()}
    }, [dispatch,history])

    const handleClick = () => {
        let actionCodeSettings = {url: 'http://localhost:3000/email-verification'}
        user.sendEmailVerification(actionCodeSettings);
    }

    return (
        <div className="container">
            <h4 className="center" style={{marginTop: '70px'}}>A verification email has been sent to {user.email}.</h4>
            <h5 className="center" style={{marginTop: '40px'}}>Go to your email and click the link to verify your email.</h5>
            <div className="center" style={{marginTop: '40px'}}>
                <button onClick={handleClick} className="btn">Re-send verification Email</button>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification)
