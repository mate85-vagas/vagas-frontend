import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Text from '../../components/Text'
import IconIC from '../../components/IconIC'
import TextInput from '../../components/TextInput'
import ButtonArrow from '../../components/Buttons/ButtonArrow'
import useAuth from '../../hooks/useAuth'
import { isEmailValid } from '../../utils/validations'
import './styles.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [hasError, setHasError] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigateToJobList = () => navigate('/')
  const navigateToRegister = () => navigate('/register')

  const isEmailInvalid = () => !isEmailValid(email)
  const isPasswordInvalid = () => password === ''

  const isFieldsInvalid = () => {
    return isEmailInvalid() || isPasswordInvalid()
  }

  const submitLogin = async (e) => {
    e.preventDefault()

    if (isFieldsInvalid()) {
      setHasError(true)
      return
    }

    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      toast.error('Usuário ou senha errados.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left-container">
        <IconIC height={150} />
        <Text text="Vagas" size={48} weight="bold" />
        <Text text="Instituto de Computação da UFBA" size={30} />
        <Text
          className="auth-subtitle"
          text="Bem-vindo(a) de volta!"
          size={24}
          weight="lighter"
        />
      </div>
      <div className="auth-right-container">
        <div className="card">
          <div className="auth-header">
            <Text text="Login" size={24} weight="bold" color="#13335F" />
            <ButtonArrow onClick={navigateToJobList} />
          </div>
          <form onSubmit={submitLogin}>
            <TextInput
              label="E-mail"
              type="email"
              setValue={setEmail}
              hasError={hasError && isEmailInvalid()}
            />
            <TextInput
              label="Senha"
              type="password"
              setValue={setPassword}
              hasError={hasError && isPasswordInvalid()}
            />
            <button className="btn-submit" type="submit" aria-label="Entrar">
              <Text text="Entrar" size={18} />
            </button>
          </form>
          <button
            className="button is-ghost btn-register-call without-focus"
            type="button"
            onClick={navigateToRegister}
          >
            <Text
              text="Não tem uma conta? Cadastre-se"
              size={16}
              weight="bold"
              color="#13335F"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
