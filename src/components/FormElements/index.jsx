/* eslint-disable import/prefer-default-export */
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Text from '../Text'

function SelectBox({
  className,
  selectName,
  selectId,
  options,
  initialOption,
  label,
  labelLarge,
  value,
  onChange,
  hasError,
}) {
  return (
    <div className={`control ${className}`}>
      {label && (
        <Text
          className="label is-bold"
          text={label}
          size={labelLarge ? 18 : 16}
        />
      )}
      {/* {label ? <span className="label">{label}</span> : false} */}
      <div className="select">
        <select
          name={selectName}
          id={selectId}
          className={`input ${
            hasError ? 'is-danger' : ''
          } default-form-element select-box`}
          onChange={(e) => onChange(e)}
          value={value}
        >
          {initialOption !== '' && <option value="">{initialOption}</option>}
          {options.map((option) => {
            return (
              <option value={option.value} key={option.id}>
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

SelectBox.propTypes = {
  className: PropTypes.string,
  selectName: PropTypes.string,
  selectId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
  initialOption: PropTypes.string,
  label: PropTypes.string,
  labelLarge: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
}

SelectBox.defaultProps = {
  className: '',
  selectName: 'select_box',
  selectId: 'select-box',
  options: [],
  initialOption: 'Select --',
  label: '',
  labelLarge: false,
  onChange: null,
  hasError: false,
  value: '',
}

/**
 * Return a input type search element.
 *
 * If you want to the search icons doesn't fire any function, set the variable searchButton false.
 */
function SearchBox({
  className,
  label,
  placeholder,
  inputName,
  inputId,
  onChange,
  searchButton,
  onSearch,
  value,
}) {
  return (
    <div className={`control ${className}`}>
      {label && <span className="label">{label}</span>}
      <div className="search-box">
        <input
          placeholder={placeholder}
          name={inputName}
          id={inputId}
          value={value}
          className="input default-form-element"
          onChange={(e) => onChange(e)}
        />
        <button
          type="submit"
          id="search-box-submit"
          onClick={onSearch}
          className={`${searchButton ? 'active-button' : 'inactive-button'}`}
        >
          {searchButton && (
            <Text className="is-blue is-bold" text="Pesquisar" size={17} />
          )}
          <span className="lnr lnr-magnifier" />
        </button>
      </div>
    </div>
  )
}

SearchBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchButton: PropTypes.bool,
  value: PropTypes.string.isRequired,
}

SearchBox.defaultProps = {
  className: '',
  label: 'Label',
  placeholder: 'Placeholder',
  inputName: 'serch_form',
  inputId: 'search-form',
  onChange: null,
  onSearch: () => {},
  searchButton: false,
}

function DateBox({
  className,
  labelLarge,
  label,
  value,
  onChange,
  name,
  hasError,
}) {
  return (
    <div className={`control ${className}`}>
      <Text
        className="label is-bold"
        text={label}
        size={labelLarge ? 18 : 16}
      />
      <input
        type="date"
        name={name}
        id="job-date"
        className={`input ${hasError ? 'is-danger' : ''} default-form-element`}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  )
}

DateBox.propTypes = {
  className: PropTypes.string,
  labelLarge: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  hasError: PropTypes.bool,
}

DateBox.defaultProps = {
  className: '',
  labelLarge: false,
  label: 'Label',
  value: null,
  onChange: null,
  name: null,
  hasError: false,
}

function Button({ label, onClick, id, scheme }) {
  return (
    <button
      type="submit"
      id={id}
      className={scheme ? `default-button ${scheme}` : 'default'}
      onClick={() => onClick()}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  scheme: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  label: 'Button',
  id: 'button',
  scheme: '',
  onClick: null,
}

export { SelectBox, SearchBox, DateBox, Button }
