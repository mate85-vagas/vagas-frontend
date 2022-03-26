import React from 'react'
import IconIC from '../IconIC'
import UserAvatar from './UserAvatar'
import Text from '../Text'
import './styles.css'

function Header() {
  return (
    <div className="top-header">
      <div className="right-container">
        <IconIC height={100} />
        <div className="title-container">
          <Text text="Vagas" size={26} weight="bold" />
          <Text text="Instituto de Computação da UFBA" size={18} weight={400} />
        </div>
      </div>
      <div className="left-container">
        <UserAvatar />
      </div>
    </div>
  )
}

export default Header
