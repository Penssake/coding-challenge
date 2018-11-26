import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from '../landing'

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Landing} />
        </BrowserRouter>
      </div>

    )
  }
}

export default App