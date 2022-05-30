import React from 'react'
import Layout from '../../components/Layout'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import TextInput from '../../components/TextInput'
import './style.css'

function ResetPassword() {
  return (
    <Layout isFinalPage>
      <section className="reset-password-page">
        <h2 className="reset-password-page-title">Cadastrar nova senha</h2>
        <TextInput label="Nova senha" />
        <TextInput label="Repita a nova senha" />
        <ButtonRectangle
          className="reset-password-page-button is-green"
          label="Salvar"
        />
      </section>
    </Layout>
  )
}

export default ResetPassword
