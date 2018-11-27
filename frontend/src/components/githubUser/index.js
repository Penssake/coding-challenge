import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import superagent from 'superagent'

const __API_URL__ = 'http://localhost:3000'

class GithubUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: null,
      avatar: null,
    }

  }

  componentDidMount() {
    console.log('API ATTEMPT', __API_URL__)
    return superagent
      .get(`${__API_URL__}/api/github/users`)
      .then(response => {
        this.setState({
          login: response.body.login,
          avatar: response.body.avatar,
        })
      })
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