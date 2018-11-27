
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

let container = document.getElementById('app')
document.body.appendChild(container)

ReactDOM.render(
  <App />,
  container)