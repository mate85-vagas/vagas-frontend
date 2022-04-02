import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import './styles.css'

function TextInput({ label, type, setValue, hasError }) {
  return (
    <div className="text-input">
      <Text className="is-bold" text={label} size={18} />
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              className={`input ${hasError ? 'is-danger' : ''}`}
              type={type}
              onChange={(e) => setValue(e.target.value)}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
}

TextInput.defaultProps = {
  hasError: false,
}

export default TextInput
