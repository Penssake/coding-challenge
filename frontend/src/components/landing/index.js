import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import GithubUser from '../githubUser'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <GithubUser />
      </div>

    )
  }
}

export default Landing