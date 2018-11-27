import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import GithubUser from '../githubUser'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <h1>Landing</h1>
        <GithubUser />
      </div>

    )
  }
}

export default Landing