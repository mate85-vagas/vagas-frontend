import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import './styles.css'

function TextInput({ label, type }) {
  return (
    <div className="text-input">
      <Text text={label} size={18} weight="bold" color="#333333" />
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input className="input" type={type} />
          </p>
        </div>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

TextInput.defaultProps = {
  // label: <div />,
}

export default TextInput
