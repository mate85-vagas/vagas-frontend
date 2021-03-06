import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import IconIC from '../../IconIC'
import UserAvatar from './UserAvatar'
import Text from '../../Text'
import useAuth from '../../../hooks/useAuth'
import ButtonArrow from '../../Buttons/ButtonArrow'
import { translate } from '../../../utils/translations'
import './styles.css'
import { useGetUserById } from '../../../hooks/user'

function Header({ hasReturnButton, returnUrl, headerChildren }) {
  const navigate = useNavigate()
  const { isAuthenticated, userId } = useAuth()

  const user = useGetUserById(userId)

  const navigateToLogin = () => navigate('/login')

  return (
    <div className={`top-header ${hasReturnButton ? 'shadow' : ''}`}>
      <div className="header-right-container">
        <Link to="/">
          <IconIC height={80} />
        </Link>

        <div className="title-container">
          <Text
            className="is-bold is-white"
            text={translate('site_name')}
            size={26}
          />
          <Text
            className="is-white"
            text="Instituto de Computação da UFBA"
            size={18}
          />
        </div>
      </div>
      <div className="header-left-container">
        {headerChildren && (
          <div className="header-children-container">{headerChildren}</div>
        )}
        {isAuthenticated ? (
          <>
            {user && (
              <Text
                className="is-white is-bold"
                text={`Bem vindo, ${user && user.name}`}
                size={17}
              />
            )}
            <UserAvatar />
          </>
        ) : (
          <div className="login-btn-container">
            <button
              className="button is-ghost"
              type="button"
              onClick={navigateToLogin}
            >
              <Text className="is-bold is-white" text="Entrar" size={18} />
            </button>
          </div>
        )}
        {hasReturnButton && (
          <div className="arrow-container">
            <ButtonArrow onClick={() => navigate(returnUrl || -1)} />
          </div>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  hasReturnButton: PropTypes.bool,
  returnUrl: PropTypes.string,
  headerChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Header.defaultProps = {
  hasReturnButton: false,
  returnUrl: '',
  headerChildren: undefined,
}

export default Header
