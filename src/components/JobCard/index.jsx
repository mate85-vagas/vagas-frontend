import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

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
      <a href={`/vagas/${id}`} className="see-details">
        Ver mais detalhes
      </a>
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
