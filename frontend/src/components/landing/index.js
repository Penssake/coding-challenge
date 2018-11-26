import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import GithubUser from '../githubUser'

const __API_URL__ = 'http://localhost:3000'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Landing</h1>
        <GithubUser />
      </div>

    )
  }
}

export default Landing