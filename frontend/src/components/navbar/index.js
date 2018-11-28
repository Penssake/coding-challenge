import React, {Component} from 'react'
import Link from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md">
        <div className="nav">
          <h1><FontAwesomeIcon icon={['fab', 'github']}/> GitHub Gallery</h1>
        </div>
      </nav>
    )
  }
}

export default Nav