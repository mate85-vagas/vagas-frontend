import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Text from '../../components/Text'
import IconIC from '../../components/IconIC'
import TextInput from '../../components/TextInput'
import ButtonArrow from '../../components/Buttons/ButtonArrow'
import useAuth from '../../hooks/useAuth'
import { isEmailValid } from '../../utils/validations'
import { translate } from '../../utils/translations'
import { keepQueryOnUrl } from '../../utils/conversions'
import { useSearchObject } from '../../hooks/url'
import './styles.css'
import ResetPasswordModal from '../../components/Modals/ResetPassword'

// Component that renders the page to login
function Login() {
  const navigate = useNavigate()
  const [search] = useSearchObject()

  const { login } = useAuth()

  const [hasError, setHasError] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hasCreateJob = useMemo(() => search.criarvaga === '1', [search])

  const navigateToJobList = () => navigate('/')
  const navigateToRegister = () =>
    navigate(keepQueryOnUrl('/register', 'criarvaga=1', hasCreateJob))

  const isEmailInvalid = () => !isEmailValid(email)
  const isPasswordInvalid = () => password === ''

  const isFieldsInvalid = () => {
    return isEmailInvalid() || isPasswordInvalid()
  }

  const [resetPasswordModalOpened, setResetPasswordModalOpened] =
    useState(false)
  const [emailResetPassword, setEmailResetPassword] = useState('')

  const submitLogin = async (e) => {
    e.preventDefault()

    if (isFieldsInvalid()) {
      setHasError(true)
      return
    }

    try {
      await login(email, password)
    } catch (error) {
      toast.error('Usuário ou senha errados.')
    }
  }

  const handleResetPasswordConfirm = () => {
    if (emailResetPassword !== '') {
      setResetPasswordModalOpened(false)
      navigate('/resetarsenha')
    }
  }

  return (
    <div className="auth-page">
      <ResetPasswordModal
        title="Recuperar Acesso"
        description="Insira o email cadastrado no sistema para receber o link de recuperação de senha."
        emailResetPassword={emailResetPassword}
        onEmailChange={setEmailResetPassword}
        onCancel={() => setResetPasswordModalOpened(false)}
        onConfirm={() => handleResetPasswordConfirm()}
        opened={resetPasswordModalOpened}
      />
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
          text="Bem-vindo(a) de volta!"
          size={24}
        />
      </div>
      <div className="auth-right-container">
        <div className="card">
          <div className="auth-header">
            <Text className="is-bold is-blue" text="Login" size={24} />
            <ButtonArrow onClick={navigateToJobList} />
          </div>
          <form onSubmit={submitLogin}>
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
            <button className="btn-submit" type="submit" aria-label="Entrar">
              <Text className="is-white" text="Entrar" size={18} />
            </button>
          </form>
          <button
            className="button is-ghost btn-reset-password"
            type="button"
            onClick={() => setResetPasswordModalOpened(true)}
          >
            <Text
              className="is-gray is-italic"
              text="Esqueceu sua senha?"
              size={15}
            />
          </button>
          <button
            className="button is-ghost btn-register-call"
            type="button"
            onClick={navigateToRegister}
          >
            <Text
              className="is-bold is-blue"
              text="Não tem uma conta? Cadastre-se"
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
