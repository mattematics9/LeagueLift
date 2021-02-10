import React, { useState } from 'react'
import { auth } from '../../firebase/config'
import { Link } from 'react-router-dom'

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let actionCodeSettings = {url: 'http://localhost:3000/login'}
        auth.sendPasswordResetEmail(email, actionCodeSettings)
            .then(() => {
                setEmailSent(true);
                setMessage(`An password reset email has been sent to ${email}`)
            })
            .catch((error) => {
                setEmailSent(false);
                switch(error.code){
                    case 'auth/user-not-found':
                        setMessage(`A user with the email ${email} was not found.  Please re-enter your email and try again.`);
                        break;
                    default:
                        setMessage(error.message)
                }
            })
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const text = emailSent? 
        <p className="blue-text">{message}<span style={{marginLeft: '30px'}}><Link to="/login"><button className="btn-small">LOGIN</button></Link></span></p>:
        <p className="red-text">{message}</p>;


    return (
        <div className="container center-align">
            <h3 style={{marginTop: '70px'}}>Forgot your password?</h3>
            <h5>No worries...</h5>
            <form onSubmit={handleSubmit} style={{marginTop: '60px'}}>
                <div className="input-field">
                    <input onChange={handleChange} type="email" id="password-reset-email" value={email}/>
                    <label htmlFor="password-reset-email">Email</label>
                </div>
                <p style={{marginTop: '30px'}}>Send a password reset email</p>
                <button className="btn-large" style={{marginTop: '20px'}}>SEND</button>
            </form>
            {text}
        </div>
    )
}

export default PasswordReset
