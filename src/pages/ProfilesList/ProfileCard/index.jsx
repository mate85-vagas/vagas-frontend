/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ButtonRectangle from '../../../components/Buttons/ButtonRectangle'
import './style.css'
import Tag from '../../../components/Tag'
import Text from '../../../components/Text'
import { translate } from '../../../utils/translations'
import useProfiles from '../../../hooks/useProfiles'

function ProfileCard({ profile }) {
  console.log(profile)
  const { id, user, technologies } = profile

  const navigate = useNavigate()

  const { setSelectedProfile } = useProfiles()

  const onProfileClick = () => {
    setSelectedProfile(profile)
    navigate(`/verperfil/${id}`)
  }

  return (
    <div className="card-link">
      <div className="profile-card" id={`profile-${id}`}>
        <div className="left-container">
          <h3>{user.name}</h3>
          {technologies ? (
            <ul className="filters">
              {technologies.split(';').map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </ul>
          ) : (
            <Text text={translate('not_informed')} size={16} />
          )}
        </div>
        <div className="right-container">
          <ButtonRectangle
            label="Perfil"
            className="is-blue"
            onClick={onProfileClick}
          />
        </div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
}

ProfileCard.defaultProps = {
  profile: {},
}

export default ProfileCard
