import React from 'react'
import PropTypes from 'prop-types'

function Header({ pageTitle }) {
  return <div>{pageTitle}</div>
}

Header.propTypes = {
  pageTitle: PropTypes.string,
}

Header.defaultProps = {
  pageTitle: '',
}

export default Header
