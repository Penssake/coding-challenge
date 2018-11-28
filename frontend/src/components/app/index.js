import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from '../landing'
import Nav from '../navbar'

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Nav />
            <Route exact path="/" component={Landing} />
          </div>
        </BrowserRouter>
      </div>

    )
  }
}

export default App