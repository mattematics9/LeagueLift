import { useEffect } from 'react'
import LoggedInLinks from './LoggedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'


const Navbar = (props) => {

    const { user } = props;
    const navLinks = user? <LoggedInLinks/>: <SignedOutLinks/>;

    useEffect(() => {
        var sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav, {});
    }, [])

    return (
        <>
            <nav className="nav-wrapper red darken-3">
                <div className="container">
                    <Link to="/" className="brand-logo">LeagueLift</Link>
                    <Link to="" className="sidenav-trigger" data-target="mobile-nav">
                        <i className="material-icons">menu</i>
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        {navLinks}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav grey lighten-2" id="mobile-nav">
                {navLinks}
            </ul>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user
    }
}
export default connect(mapStateToProps)(Navbar)
