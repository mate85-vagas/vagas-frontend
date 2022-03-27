import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconIC from '../IconIC'
import UserAvatar from './UserAvatar'
import Text from '../Text'
import ButtonRectangle from '../Buttons/ButtonRectangle'
import useAuth from '../../hooks/useAuth'
import './styles.css'

function Header() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const navigateToLogin = () => navigate('/login')

  return (
    <div className="top-header">
      <div className="header-right-container">
        <IconIC height={100} />
        <div className="title-container">
          <Text text="Vagas" size={26} weight="bold" />
          <Text text="Instituto de Computação da UFBA" size={18} weight={400} />
        </div>
      </div>
      <div className="header-left-container">
        {isAuthenticated ? (
          <UserAvatar />
        ) : (
          <div className="login-btn-container">
            <ButtonRectangle
              label="Entrar"
              className="is-blue"
              onClick={navigateToLogin}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
