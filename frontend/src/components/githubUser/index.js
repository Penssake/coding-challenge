import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import superagent from 'superagent'
import './index.scss'
import $ from 'jquery'

const __API_URL__ = 'http://localhost:3000'

class GithubUser extends Component {
  constructor(props) {
    super(props)
    this.state = null

    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
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

  onMouseEnterHandler(e) {
    let user = e.target.dataset.user
    let element = e.target
    return superagent
      .get(`${__API_URL__}/api/github/user/followers/${user}`)
      .then(response => {
        if(response.body) {
          element.className += 'followed'
        }
      })
      .catch(err => console.log(err))
  }

  onMouseLeaveHandler(e) {
    let elementLeave = e.target
    elementLeave.className = ''
    console.log(elementLeave.className)
  }

  render() {
    let renderData = undefined
    if(this.state) {
      renderData = this.state.userState.map((mappedUser, i) => (
        <span key={i}>
          <img src={mappedUser.avatar} />
          <p onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} data-user={mappedUser.login}>{mappedUser.login}
          </p>
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