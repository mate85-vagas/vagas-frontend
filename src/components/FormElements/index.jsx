/* eslint-disable import/prefer-default-export */
import React from 'react'
import PropTypes from 'prop-types'

function SelectBox({
  selectName,
  selectId,
  options,
  initialOption,
  label,
  onChange,
}) {
  return (
    <>
      {label ? <span className="label">{label}</span> : false}
      <select name={selectName} id={selectId} onChange={(e) => onChange(e)}>
        <option>{initialOption}</option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.id}>
              {option.label}
            </option>
          )
        })}
      </select>
    </>
  )
}

SelectBox.propTypes = {
  selectName: PropTypes.string,
  selectId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
  initialOption: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

SelectBox.defaultProps = {
  selectName: 'select_box',
  selectId: 'select-box',
  options: [],
  initialOption: 'Select --',
  label: 'Label',
  onChange: null,
}

/**
 * Return a input type search element.
 *
 * If you want to the search icons doesn't fire any function, set the variable searchButton false.
 */
function SearchBox({
  label,
  placeholder,
  inputName,
  inputId,
  onChange,
  searchButton,
}) {
  return (
    <>
      <span className="label">{label}</span>
      <div className="search-box">
        <input
          type="search"
          placeholder={placeholder}
          name={inputName}
          id={inputId}
          onChange={(e) => onChange(e)}
        />
        <button
          type="submit"
          id="search-box-submit"
          onClick={
            searchButton
              ? () => onChange()
              : () => {
                  return false
                }
          }
          className={searchButton ? 'active-button' : 'inactive-button'}
        >
          <span className="lnr lnr-magnifier" />
        </button>
      </div>
    </>
  )
}

SearchBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  onChange: PropTypes.func,
  searchButton: PropTypes.bool,
}

SearchBox.defaultProps = {
  label: 'Label',
  placeholder: 'Placeholder',
  inputName: 'serch_form',
  inputId: 'search-form',
  onChange: null,
  searchButton: false,
}

function DateBox({ label, onChange }) {
  return (
    <>
      <span className="label">{label}</span>
      <input
        type="date"
        name="job_start_date"
        id="job-date"
        onChange={(e) => onChange(e)}
      />
    </>
  )
}

DateBox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
}

DateBox.defaultProps = {
  label: 'Label',
  onChange: null,
}

function Button({ label, onClick, id, style }) {
  return (
    <button type="submit" id={id} className={style} onClick={() => onClick()}>
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
}

Button.defaultProps = {
  label: 'Button',
  id: 'button',
  onClick: null,
  style: 'button',
}

export { SelectBox, SearchBox, DateBox, Button }
