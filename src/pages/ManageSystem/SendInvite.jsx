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

  const submitInvitation = () => {
    if (!isEmailValid(email)) {
      toast.error('Digite um e-mail válido!')
      return
    }

    sendInvite(email)
    setEmail('')
  }

  return (
    <div className="option-card-content">
      <TextInput
        placeholder="E-mail"
        type="email"
        autoComplete={false}
        value={email}
        setValue={setEmail}
      />
      <ButtonRectangle
        className="is-blue"
        label="Enviar"
        onClick={submitInvitation}
      />
    </div>
  )
}

export default SendInvite
