/* eslint-disable react/style-prop-object */
/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Button } from '../FormElements'

function JobCard({ data }) {
  const { title, description, site, endingDate, id } = data

  return (
    <div className="job">
      <h3>
        {title}
        <sub>{site}</sub>
      </h3>
      <p>{description}</p>
      <span className="due-date">Expira em: {endingDate}</span>
      <Button
        label="Ver mais detalhes"
        scheme="gray"
        onClick={() => {
          document.location.href = `${document.location.href}vagas/${id}`
        }}
      />
    </div>
  )
}

JobCard.defaultProps = {
  data: {},
}

JobCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
}

export default JobCard
