import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import superagent from 'superagent'
import './index.scss'

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
      renderData = this.state.userState.map((mappedUser) => (
        <span>
          <img src={mappedUser.avatar} data-user={'banana'}></img>
          <p className='caption'>{mappedUser.login}</p>
        </span>)
      )}
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='container'>
              {renderData}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default GithubUser