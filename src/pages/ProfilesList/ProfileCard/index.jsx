import React from 'react'
import PropTypes from 'prop-types'
import ButtonRectangle from '../../../components/Buttons/ButtonRectangle'
import './style.css'

function ProfileCard({ id, name, resume, knowledge }) {
  return (
    <div className="profile-card" id={`profile-${id}`}>
      <div className="left-container">
        <h3>{name}</h3>
        <span>{knowledge}</span>
      </div>
      <div className="right-container">
        <ButtonRectangle
          label="Perfil"
          className="is-blue"
          onClick={() => {
            if (resume) window.open(`${resume}`)
          }}
        />
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  resume: PropTypes.string,
  knowledge: PropTypes.string,
}

ProfileCard.defaultProps = {
  id: 0,
  name: 'User Name',
  resume: '/',
  knowledge: '',
}

export default ProfileCard
