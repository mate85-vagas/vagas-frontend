import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

function Layout({ children }) {
  return (
    <div>
      aaa
      <Header />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
}

Layout.defaultProps = {
  children: <div />,
}

export default Layout
