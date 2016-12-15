import React, {PropTypes} from 'react'
import { Link } from 'react-router'

export default function App ({children}) {
  return (
    <div>
      <h1>App</h1>
      <ul>
        <li><Link to="/about">About</Link></li>
      </ul>

      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object
}
