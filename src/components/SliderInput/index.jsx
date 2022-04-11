import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import Text from '../Text'
import './styles.css'

function SliderInput({
  label,
  min,
  max,
  step,
  startPoint,
  onChange,
  minValue,
  maxValue,
}) {
  return (
    <>
      <Text className="is-bold salary-label" text={label} size={16} />
      <Slider
        range
        min={min}
        max={max}
        count
        startPoint={startPoint}
        step={step}
        onChange={onChange}
        value={[minValue, maxValue]}
      />
      <span className="job-salary-value">
        {minValue} &mdash; {maxValue}
      </span>
    </>
  )
}

SliderInput.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  startPoint: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
}

SliderInput.defaultProps = {
  label: '',
  onChange: () => {},
}

export default SliderInput
