import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userLogin } from '../../redux/actions/auth'
import { connect } from 'react-redux'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const {dispatch, history} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password, history, setErrorText))
    }

    const handleChange = (e) => {
        switch (e.target.id){
            case 'email-login':
                setEmail(e.target.value)
                break;
            case 'password-login':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <h4 className="center" style={{marginTop: '60px'}}>LOGIN</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input onChange={handleChange} type="email" id="email-login" name="email-login" value={email}/>
                    <label htmlFor="name-login">Email</label>
                </div>
                <div className="input-field">
                    <input onChange={handleChange} type="password" id="password-login" name="password-login" value={password}/>
                    <label htmlFor="password-login">Password</label>
                </div>
                <p className="center red-text">{errorText}</p>
                <div className="input-field center-align" style={{marginTop: '40px'}}>
                    <button className="btn-large">LOGIN</button>
                </div>     
            </form>
            <div className="container center" style={{marginTop: '40px'}}>
                <span><Link to='/password-reset'>Forgot Password?</Link></span>
                <span style={{marginLeft: '30px'}}><Link to='/signup'>Create Account</Link></span>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(null, mapDispatchToProps)(Login)
