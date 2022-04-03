import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import IconIC from '../../IconIC'
import UserAvatar from './UserAvatar'
import Text from '../../Text'
import ButtonRectangle from '../../Buttons/ButtonRectangle'
import useAuth from '../../../hooks/useAuth'
import './styles.css'
import ButtonArrow from '../../Buttons/ButtonArrow'

function Header({ hasReturnButton }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const navigateToLogin = () => navigate('/login')

  return (
    <div className={`top-header ${hasReturnButton ? 'shadow' : ''}`}>
      <div className="header-right-container">
        <IconIC height={100} />
        <div className="title-container">
          <Text className="is-bold is-white" text="Vagas" size={26} />
          <Text
            className="is-white"
            text="Instituto de Computação da UFBA"
            size={18}
          />
        </div>
      </div>
      <div className="header-left-container">
        {isAuthenticated ? (
          <UserAvatar />
        ) : (
          <div className="login-btn-container">
            <ButtonRectangle
              label="Entrar"
              className="is-gray"
              onClick={navigateToLogin}
            />
          </div>
        )}
        {hasReturnButton && (
          <div className="arrow-container">
            <ButtonArrow onClick={() => navigate(-1)} />
          </div>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  hasReturnButton: PropTypes.bool,
}

Header.defaultProps = {
  hasReturnButton: false,
}

export default Header
