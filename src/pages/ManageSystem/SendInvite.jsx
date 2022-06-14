import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import TextInput from '../../components/TextInput'
import { useAdminRoutes } from '../../hooks/admin'
import { isEmailValid } from '../../utils/validations'
import './styles.css'

function SendInvite() {
  const [email, setEmail] = useState('')

  const { sendInvite } = useAdminRoutes()

  const submitInvitation = (e) => {
    e.preventDefault()
    if (!isEmailValid(email)) {
      toast.error('Digite um e-mail válido!')
      return
    }

    sendInvite(email)
    setEmail('')
  }

  return (
    <form className="option-card-content" onSubmit={submitInvitation}>
      <TextInput
        placeholder="E-mail"
        type="email"
        autoComplete={false}
        value={email}
        setValue={setEmail}
      />
      <ButtonRectangle className="is-blue" label="Enviar" isSubmit />
    </form>
  )
}

export default SendInvite
