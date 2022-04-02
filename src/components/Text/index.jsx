import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function Text({ className, text, size }) {
  return (
    <p
      className={`text ${className}`}
      style={{
        fontSize: size,
      }}
    >
      {text}
    </p>
  )
}

Text.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.number,
}

Text.defaultProps = {
  className: '',
  text: '',
  size: 16,
}

export default Text
