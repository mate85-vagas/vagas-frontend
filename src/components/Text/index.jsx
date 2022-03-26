import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function Text({ className, text, size, weight, color }) {
  return (
    <p
      className={`${className} text`}
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
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
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
}

Text.defaultProps = {
  className: '',
  text: '',
  size: 16,
  weight: 'normal',
  color: 'white',
}

export default Text
