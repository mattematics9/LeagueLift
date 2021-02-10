import React, { useState } from 'react'
import { userSignUp } from '../../redux/actions/auth'
import { connect } from 'react-redux'


const SignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReenter, setPasswordReenter] = useState('');
    const [errorText, setErrorText] = useState('');

    const {dispatch} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordReenter){
            if(password.length > 6){
                dispatch(userSignUp(name, email, password, setErrorText))
            }else{
                setErrorText('The password must be at least 6 characters.')
            }
        }else{
            setErrorText('The two passwords do not match.')
        }
    }

    const handleChange = (e) => {
        switch (e.target.id){
            case 'name-login':
                setName(e.target.value);
                break;
            case 'email-login':
                setEmail(e.target.value)
                break;
            case 'password-login':
                setPassword(e.target.value)
                break;
            case 'password-reenter-login':
                setPasswordReenter(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <h4 className="center" style={{marginTop: '60px'}}>SIGN UP</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input onChange={handleChange} type="text" id="name-login" name="name-login" value={name}/>
                    <label htmlFor="name-login">Name</label>
                </div>
                <div className="input-field">
                    <input onChange={handleChange} type="email" id="email-login" name="email-login" value={email}/>
                    <label htmlFor="name-login">Email</label>
                </div>
                <div className="input-field">
                    <input onChange={handleChange} type="password" id="password-login" name="password-login" value={password}/>
                    <label htmlFor="password-login">Password</label>
                </div>
                <div className="input-field">
                    <input onChange={handleChange} type="password" id="password-reenter-login" name="password-reenter-login" value={passwordReenter}/>
                    <label htmlFor="password-reenter-login">Re-enter Password</label>
                </div>
                <p className="center red-text">{errorText}</p>
                <div className="input-field center-align" style={{marginTop: '40px'}}>
                    <button className="btn-large">CREATE ACCOUNT</button>
                </div>
                
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(null, mapDispatchToProps)(SignUp)
