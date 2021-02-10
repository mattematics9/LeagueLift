import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk));

const UserProvider = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default UserProvider
