/* eslint-disable import/prefer-default-export */
import React from 'react'
import PropTypes from 'prop-types'

function SelectBox({
  selectName,
  selectId,
  options,
  initialOption,
  label,
  event,
}) {
  return (
    <>
      {label ? <span className="label">{label}</span> : false}
      <select name={selectName} id={selectId} onChange={(e) => event(e)}>
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
  event: PropTypes.func,
}

SelectBox.defaultProps = {
  selectName: 'select_box',
  selectId: 'select-box',
  options: [],
  initialOption: 'Select --',
  label: 'Label',
  event: null,
}

function SearchBox({
  label,
  placeholder,
  inputName,
  inputId,
  event,
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
          onChange={(e) => event(e)}
        />
        <button
          type="submit"
          id="search-box-submit"
          onClick={
            searchButton
              ? () => event()
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
  event: PropTypes.func,
  searchButton: PropTypes.bool,
}

SearchBox.defaultProps = {
  label: 'Label',
  placeholder: 'Placeholder',
  inputName: 'serch_form',
  inputId: 'search-form',
  event: null,
  searchButton: false,
}

function DateBox({ label, event }) {
  return (
    <>
      <span className="label">{label}</span>
      <input
        type="date"
        name="job_start_date"
        id="job-date"
        onChange={(e) => event(e)}
      />
    </>
  )
}

DateBox.propTypes = {
  label: PropTypes.string,
  event: PropTypes.func,
}

DateBox.defaultProps = {
  label: 'Label',
  event: null,
}

function BlueButton({ label, event, id }) {
  return (
    <button type="submit" id={id} onClick={() => event()}>
      {label}
    </button>
  )
}

BlueButton.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  event: PropTypes.func,
}

BlueButton.defaultProps = {
  label: 'Button',
  id: 'button',
  event: null,
}

export { SelectBox, SearchBox, DateBox, BlueButton }
