import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import BottomHeader from './BottomHeader'

function Layout({ children, headerLeftChildren, headerRightChildren }) {
  return (
    <div>
      <Header />
      <BottomHeader
        leftChildren={headerLeftChildren}
        rightChildren={headerRightChildren}
      />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
  headerLeftChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  headerRightChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Layout.defaultProps = {
  children: <div />,
  headerLeftChildren: <div />,
  headerRightChildren: <div />,
}

export default Layout
