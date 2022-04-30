import React from 'react'
import ButtonRectangle from '../../../components/Buttons/ButtonRectangle'
import './style.css'

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="left-container">
        <h3>Nome do usuário</h3>
        <span>Outra info</span>
      </div>
      <div className="right-container">
        <ButtonRectangle label="Perfil" className="is-blue" />
      </div>
    </div>
  )
}

export default ProfileCard
