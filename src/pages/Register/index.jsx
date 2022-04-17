import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Text from '../../components/Text'
import IconIC from '../../components/IconIC'
import TextInput from '../../components/TextInput'
import ButtonArrow from '../../components/Buttons/ButtonArrow'
import useAuth from '../../hooks/useAuth'
import { isEmailValid } from '../../utils/validations'
import { translate } from '../../utils/translations'
import './styles.css'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [hasError, setHasError] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigateToLogin = () => navigate('/login')

  const isNameInvalid = () => name === ''
  const isEmailInvalid = () => !isEmailValid(email)
  const isPasswordInvalid = () => password === ''

  const isFieldsInvalid = () => {
    return isNameInvalid() || isEmailInvalid() || isPasswordInvalid()
  }

  const submitRegister = async (e) => {
    e.preventDefault()

    if (isFieldsInvalid()) {
      setHasError(true)
      return
    }

    try {
      const token = await register(name, email, password)
      if (token) navigate('/')
    } catch (error) {
      toast.error(
        'Houve algum problema com seu cadastro! Verifique os campos e tente novamente.'
      )
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left-container">
        <IconIC height={150} />
        <Text
          className="is-bold is-white"
          text={translate('site_name')}
          size={48}
        />
        <Text
          className="is-white"
          text="Instituto de Computação da UFBA"
          size={30}
        />
        <Text
          className="auth-subtitle is-white is-light"
          text="Cadastre-se para ter acesso à todas funcionalidades."
          size={24}
        />
      </div>
      <div className="auth-right-container">
        <div className="card">
          <div className="auth-header">
            <Text className="is-blue is-bold" text="Cadastro" size={24} />
            <ButtonArrow onClick={navigateToLogin} />
          </div>
          <form onSubmit={submitRegister}>
            <TextInput
              label="Nome"
              type="text"
              value={name}
              setValue={setName}
              hasError={hasError && isNameInvalid()}
            />
            <TextInput
              label="E-mail"
              type="email"
              value={email}
              setValue={setEmail}
              hasError={hasError && isEmailInvalid()}
            />
            <TextInput
              label="Senha"
              type="password"
              value={password}
              setValue={setPassword}
              hasError={hasError && isPasswordInvalid()}
            />
            {hasError && (
              <Text
                className="is-bold auth-label-error"
                text="Algum campo precisa ser redigitado!"
                size={16}
              />
            )}
            <button className="btn-submit" type="submit" aria-label="Cadastrar">
              <Text className="is-white" text="Cadastrar" size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
