/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import LinesEllipsis from 'react-lines-ellipsis'
import { useNavigate } from 'react-router-dom'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import './styles.css'
import Text from '../../components/Text'
import { localDate } from '../../utils/conversions'

function MyJobCard({ jobData, isCreatedJob, onDelete }) {
  const navigate = useNavigate()

  const { jobId, job } = jobData
  const { title, description, site, endingDate } = job

  const isExpired = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return new Date(endingDate) < now
  }, [endingDate])

  return (
    <div className="job">
      {!isCreatedJob && (
        <div
          className={`expired-tag ${isExpired ? 'is-expired' : 'is-opened'}`}
        >
          <Text
            className="is-white"
            text={isExpired ? 'EXPIRADA' : 'ABERTA'}
            size={12}
          />
        </div>
      )}
      <div className="job-top-container">
        <div className="description-container">
          <h3>
            {title}
            <sub>{site}</sub>
          </h3>
          <LinesEllipsis
            text={description}
            maxLine="5"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <span className="due-date">Expira em: {localDate(endingDate)}</span>
      </div>
      <div className="job-card-buttons">
        <ButtonRectangle
          icon="lnr-enter"
          label={isCreatedJob ? undefined : 'Ver mais Detalhes'}
          className="is-blue"
          onClick={() => navigate(`/vagas/${jobId}`)}
        />
        {isCreatedJob && (
          <ButtonRectangle
            icon="lnr-pencil"
            className="is-blue"
            onClick={() => navigate(`/formulariovaga/editar/${jobId}`)}
          />
        )}
        {isCreatedJob && (
          <ButtonRectangle
            icon="lnr-trash"
            className="is-red"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  )
}

MyJobCard.propTypes = {
  jobData: PropTypes.object.isRequired,
  isCreatedJob: PropTypes.bool,
  onDelete: PropTypes.func,
}

MyJobCard.defaultProps = {
  isCreatedJob: true,
  onDelete: () => {},
}

export default MyJobCard
