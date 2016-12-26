import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './home.css'

function Home () {
  return <p styleName='stuff'>home</p>
}

export default CSSModules(Home, styles)
