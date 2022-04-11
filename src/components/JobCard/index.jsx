/* eslint-disable react/style-prop-object */
/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import LinesEllipsis from 'react-lines-ellipsis'
import { Button } from '../FormElements'

function JobCard({ data }) {
  const { title, description, site, endingDate, id } = data

  return (
    <div className="job">
      <div className="job-top-container">
        <div className="description-container">
          <h3>
            {title}
            <sub>{site}</sub>
          </h3>
          <LinesEllipsis
            text={description}
            maxLine="10"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <span className="due-date">Expira em: {endingDate}</span>
      </div>
      <div>
        <Button
          label="Ver mais detalhes"
          scheme="gray"
          onClick={() => {
            document.location.href = `${document.location.href}vagas/${id}`
          }}
        />
      </div>
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
