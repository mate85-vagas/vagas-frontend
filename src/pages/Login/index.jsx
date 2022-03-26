/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Text from '../../components/Text'
import IconIC from '../../components/IconIC'
import './styles.css'
import TextInput from '../../components/TextInput'

function Login() {
  return (
    <div className="login-page">
      <div className="left-container">
        <IconIC height={150} />
        <Text text="Vagas" size={48} weight={700} />
        <Text text="Instituto de Computação da UFBA" size={30} weight={400} />
        <Text text="Bem-vindo(a) de volta!" size={24} weight="normal, 400" />
      </div>
      <div className="right-container">
        <div className="card">
          <Text text="Login" size={24} weight={600} color="#13335F" />
          <TextInput label="E-mail" type="email" />
          <TextInput label="Senha" type="email" />
        </div>
      </div>
    </div>
  )
}

export default Login
