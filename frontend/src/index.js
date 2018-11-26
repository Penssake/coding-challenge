
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

let container = document.getElementById('app')
document.body.appendChild(container)

ReactDOM.render(
  <App />,
  container)