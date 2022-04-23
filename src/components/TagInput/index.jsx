/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Text from '../Text'
import './styles.css'
import { translate } from '../../utils/translations'

function TagInput({
  className,
  label,
  subLabel,
  tags,
  setValue,
  hasError,
  maxLength,
  selectOptions,
}) {
  const onChangeSelection = (newSelection) => {
    setValue(newSelection.map((selectionValue) => selectionValue.value))
  }

  const options = useMemo(() => {
    return selectOptions.map((value) => ({ value, label: value }))
  }, [selectOptions])

  const value = useMemo(
    () => tags.map((tag) => ({ value: tag, label: tag })),
    [tags]
  )

  return (
    <div className={`tag-input ${className}`}>
      <Text
        className={`is-bold ${label ? 'input-label' : ''}`}
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
            <Select
              className="multiselect"
              value={value}
              onChange={onChangeSelection}
              options={options}
              isMulti
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: hasError ? 'red' : provided.borderColor,
                }),
              }}
              noOptionsMessage={() => translate('no_options')}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

TagInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  tags: PropTypes.array,
  setValue: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  maxLength: PropTypes.number,
  selectOptions: PropTypes.array,
}

TagInput.defaultProps = {
  className: '',
  label: '',
  subLabel: '',
  tags: [],
  hasError: false,
  maxLength: null,
  selectOptions: [],
}

export default TagInput
