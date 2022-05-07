import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../Text'
import './styles.css'

function ButtonRectangle({ label, onClick, id, className, isSubmit, icon }) {
  return (
    <button
      id={id}
      className={`button btn-rect ${className}`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {icon && <span className={`lnr ${icon}`} />}
      {label && <Text className="is-bold is-white" text={label} size={17} />}
    </button>
  )
}

ButtonRectangle.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool,
}

ButtonRectangle.defaultProps = {
  label: undefined,
  icon: undefined,
  id: 'button',
  className: '',
  onClick: () => {},
  isSubmit: false,
}

export default ButtonRectangle
