import { useEffect } from 'react'
import LoggedInNav from './LoggedInNav'
import SignedOutNav from './SignedOutNav'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import MobileNav from './MobileNav'


const Navbar = (props) => {

    const { user } = props;

    useEffect(() => {
        var sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav, {});
    }, [])

    return (
        <>
            <nav className="nav-wrapper red darken-3">
                <Link to="/" className="brand-logo" style={{marginLeft: "30px"}}>LeagueLift</Link>
                <Link to="" className="sidenav-trigger" data-target="mobile-nav">
                    <i className="material-icons">menu</i>
                </Link>
                {user? <LoggedInNav/>: <SignedOutNav/>}   
            </nav>
            <MobileNav/>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user
    }
}
export default connect(mapStateToProps)(Navbar)
