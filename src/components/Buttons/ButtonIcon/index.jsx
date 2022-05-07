import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function ButtonIcon({ onClick, icon }) {
  return (
    <button className="icon-button" type="button" onClick={onClick}>
      <span className={`lnr ${icon}`} />
    </button>
  )
}

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
}

export default ButtonIcon
