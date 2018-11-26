import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

const __API_URL__ = 'http://localhost:3000'

class GithubUser extends Component {
  render() {
    return (
      <div className="github-user">
        <h1>USER</h1>
      </div>

    )
  }
}

export default GithubUser