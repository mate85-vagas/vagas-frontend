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
        <Text text="Vagas" size={48} weight="bold" />
        <Text text="Instituto de Computação da UFBA" size={30} />
        <Text
          className="auth-subtitle"
          text="Cadastre-se para ter acesso à todas funcionalidades."
          size={24}
          weight="lighter"
        />
      </div>
      <div className="auth-right-container">
        <div className="card">
          <div className="auth-header">
            <Text text="Cadastro" size={24} weight="bold" color="#13335F" />
            <ButtonArrow onClick={navigateToLogin} />
          </div>
          <form onSubmit={submitRegister}>
            <TextInput
              label="Nome"
              type="text"
              setValue={setName}
              hasError={hasError && isNameInvalid()}
            />
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
            {hasError && (
              <Text
                className="auth-label-error"
                text="Algum campo precisa ser redigitado!"
                size={16}
                weight="bold"
                color="red"
              />
            )}
            <button className="btn-submit" type="submit" aria-label="Cadastrar">
              <Text text="Cadastrar" size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
