import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../Text'
import './styles.css'

function ButtonRectangle({ label, onClick, id, className, isSubmit }) {
  return (
    <button
      id={id}
      className={`button btn-rect ${className}`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      <Text text={label} size={17} weight="bold" />
    </button>
  )
}

ButtonRectangle.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool,
}

ButtonRectangle.defaultProps = {
  label: 'Button',
  id: 'button',
  className: '',
  onClick: () => {},
  isSubmit: false,
}

export default ButtonRectangle
