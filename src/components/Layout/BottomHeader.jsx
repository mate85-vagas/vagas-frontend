import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function BottomHeader({ leftChildren, rightChildren }) {
  return (
    <div className="bottom-header">
      {leftChildren && <div className="bottom-header-left">{leftChildren}</div>}
      {rightChildren && (
        <div className="bottom-header-right">{rightChildren}</div>
      )}
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
  leftChildren: undefined,
  rightChildren: undefined,
}

export default BottomHeader
