import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import superagent from 'superagent'

const __API_URL__ = 'http://localhost:3000'

class GithubUser extends Component {
  constructor(props) {
    super(props)
    this.state = null
  }

  componentDidMount() {
    console.log('API ATTEMPT', __API_URL__)
    return superagent
      .get(`${__API_URL__}/api/github/users`)
      .then(response => {
        console.log(response)
        this.setState({
          userState: response.body,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    let renderData = undefined
    if(this.state) {
      renderData = this.state.userState.map((mappedUser) => <li>{mappedUser.login}</li>)
    }
    return (
      <div className="container">
        <h1>GithubUser List</h1>
        <ul>
          {renderData}
        </ul>
      </div>

    )
  }
}

export default GithubUser