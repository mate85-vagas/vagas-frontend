import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function BottomHeader({ leftChildren, rightChildren }) {
  return (
    <div className="bottom-header">
      <div className="bottom-header-left">{leftChildren}</div>
      <div className="bottom-header-right">{rightChildren}</div>
    </div>
  )
}

BottomHeader.propTypes = {
  leftChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  rightChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

BottomHeader.defaultProps = {
  leftChildren: <div />,
  rightChildren: <div />,
}

export default BottomHeader
