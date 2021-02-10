import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../../redux/actions/auth'


const loggedInLinks = (props) => {

    const {currentUser, dispatch} = props;

    const handleClick = () => {
        dispatch(userLogout());
    }

    const links = currentUser.user.emailVerified? <li><Link to='/'>HOME</Link></li>: null;

    return (
        <>
            {links}
            <li><Link onClick={handleClick} to='/'>SIGN OUT</Link></li>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(loggedInLinks)
