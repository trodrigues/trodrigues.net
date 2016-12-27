import React from 'react'

export default function About () {
  return <p>about</p>
}

About.renderTitle = (baseTitle, currentTitle) => {
  return baseTitle + ' this is the about title'
}
