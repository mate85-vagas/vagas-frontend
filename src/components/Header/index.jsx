import React from 'react'
import IconIC from '../IconIC'
import UserAvatar from './UserAvatar'
import Text from '../Text'
import './styles.css'
import useAuth from '../../hooks/useAuth'

function Header() {
  const { isAuthenticated } = useAuth()

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
        {isAuthenticated ? <UserAvatar /> : <div />}
      </div>
    </div>
  )
}

export default Header
