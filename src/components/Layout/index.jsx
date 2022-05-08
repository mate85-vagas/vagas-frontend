import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import BottomHeader from './BottomHeader'

function Layout({
  children,
  isFinalPage,
  superHeaderChildren,
  headerLeftChildren,
  headerRightChildren,
}) {
  return (
    <div className="layout">
      <Header
        hasReturnButton={isFinalPage}
        headerChildren={superHeaderChildren}
      />
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isFinalPage: PropTypes.bool,
  superHeaderChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
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
  superHeaderChildren: undefined,
  headerLeftChildren: undefined,
  headerRightChildren: undefined,
}

export default Layout
