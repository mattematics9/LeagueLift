import React from 'react'
import ReactDOM from 'react-dom'
import UserProvider from './redux/providers/UserProvider'
import App from './App'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>,
  document.getElementById('root')
);