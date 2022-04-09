import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import './styles.css'

function TextInput({
  className,
  label,
  subLabel,
  type,
  value,
  setValue,
  hasError,
  autoComplete,
}) {
  return (
    <div className={`text-input ${className}`}>
      <Text
        className="is-bold input-label"
        text={
          <p>
            {label}
            <span className="input-sublabel"> {subLabel}</span>
          </p>
        }
        size={18}
      />
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              className={`input ${hasError ? 'is-danger' : ''}`}
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete={autoComplete ? 'on' : 'new-password'}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  autoComplete: PropTypes.bool,
}

TextInput.defaultProps = {
  className: '',
  subLabel: '',
  value: '',
  hasError: false,
  autoComplete: true,
}

export default TextInput
