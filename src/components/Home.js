import React from 'react'
import {connect} from 'react-redux'

const Home = (props) => {

    const {currentUser} = props;

    return (
        <div>
            <p>{currentUser.userFirestore? `${currentUser.userFirestore.name}`: null}</p>
            <p>{currentUser.user? `${currentUser.user.email}`: null}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Home)
