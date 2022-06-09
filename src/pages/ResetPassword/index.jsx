/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import TextInput from '../../components/TextInput'
import './style.css'
import { usePasswordRecovery } from '../../hooks/user'
import { isPasswordValid } from '../../utils/validations'

const ResetPassword = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { token } = params
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { sendRecoveryLink } = usePasswordRecovery()

  const handleSubmitPassword = () => {
    if (password === password2) {
      if (!isPasswordValid(password)) {
        toast.error('A senha precisa ter no mínimo 6 dígitos!')
        return
      }

      sendRecoveryLink({ token, password })
        .then(() => {
          toast.success('Senha alterada')
          setTimeout(() => {
            navigate('/login')
          }, 1000)
        })
        .catch(() => toast.error('Algo não funcionou como esperado'))
    } else {
      toast.error('As senhas não coincidem.')
    }
  }

  return (
    <Layout isFinalPage>
      <section className="reset-password-page">
        <h2 className="reset-password-page-title">Cadastrar nova senha</h2>
        <TextInput
          label="Nova senha"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <TextInput
          label="Repita a nova senha"
          type="password"
          value={password2}
          setValue={setPassword2}
        />
        <ButtonRectangle
          className="reset-password-page-button is-green"
          label="Salvar"
          onClick={handleSubmitPassword}
        />
      </section>
    </Layout>
  )
}

export default ResetPassword
