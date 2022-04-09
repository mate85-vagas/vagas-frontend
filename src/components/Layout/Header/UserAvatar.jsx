import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Text from '../../Text'
import './styles.css'

function UserAvatar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const dropdownItem = (label, onClick) => (
    <div className="dropdown-item">
      <button
        className="button is-ghost btn-dropdown"
        type="button"
        onClick={onClick}
      >
        <Text
          className="text-dropdown is-blue is-bold"
          text={label}
          size={16}
        />
      </button>
    </div>
  )

  return (
    <div className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <div className="user-avatar">
          <span className="lnr lnr-user" />
        </div>
      </div>
      <div className="dropdown-menu" id="user-dropdown-menu" role="menu">
        <div className="dropdown-content">
          {dropdownItem('Ver Perfil', () => navigate('/verperfil'))}
          {dropdownItem('Editar Dados', () => navigate('/editardados'))}
          {dropdownItem('Sair', logout)}
        </div>
      </div>
    </div>
  )
}

export default UserAvatar
