import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import superagent from 'superagent'


const __API_URL__ = 'http://localhost:3000'
let initialState = null

class GithubUser extends Component {
  constructor(props) {
    super(props)
    this.state = {initialState}

  }

  componentDidMount() {
    console.log('API ATTEMPT', __API_URL__)
    return superagent
      .get(`${__API_URL__}/api/github/users`)
      .then(response => console.log(response.text))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container">
        <h1>HEY</h1>
        <div></div>
      </div>

    )
  }
}

export default GithubUser