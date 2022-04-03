import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import BottomHeader from './BottomHeader'

function Layout({
  children,
  isFinalPage,
  headerLeftChildren,
  headerRightChildren,
}) {
  return (
    <div className="layout">
      <Header hasReturnButton={isFinalPage} />
      {!isFinalPage && (
        <BottomHeader
          leftChildren={headerLeftChildren}
          rightChildren={headerRightChildren}
        />
      )}
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
  isFinalPage: PropTypes.bool,
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
  isFinalPage: false,
  headerLeftChildren: <div />,
  headerRightChildren: <div />,
}

export default Layout
