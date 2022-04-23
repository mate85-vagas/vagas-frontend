import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

function Tag({ label, onRemove }) {
  return (
    <li className="selected-filter">
      <span className="filter-label">{label}</span>
      {onRemove && (
        <button type="button" onClick={onRemove}>
          <span className="lnr lnr-cross" />
        </button>
      )}
    </li>
  )
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
}

Tag.defaultProps = {
  onRemove: undefined,
}

export default Tag
