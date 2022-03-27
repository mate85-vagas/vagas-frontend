import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function ButtonArrow({ onClick, right }) {
  return (
    <button className="arrow-button" type="button" onClick={onClick}>
      <span className={`lnr lnr-arrow-${right ? 'right' : 'left'}`} />
    </button>
  )
}

ButtonArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  right: PropTypes.bool,
}

ButtonArrow.defaultProps = {
  right: true,
}

export default ButtonArrow
