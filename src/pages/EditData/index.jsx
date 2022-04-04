import React from 'react'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import { DateBox } from '../../components/FormElements'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import './styles.css'

function EditData() {
  return (
    <Layout isFinalPage>
      <div className="edit-data">
        <div className="card">
          <div className="card-title">
            <Text className="is-bold is-blue" text="Editar dados" size={24} />
          </div>
          <form autoComplete="off">
            <Text
              className="is-light is-italic"
              text="Informações cadastrais"
              size={18}
            />
            <div className="form-user">
              <TextInput
                className="margin-input"
                label="E-mail"
                type="email"
                autoComplete={false}
              />
              <TextInput label="Senha" type="password" autoComplete={false} />
            </div>
            <Text
              className="is-light is-italic"
              text="Informações do perfil"
              size={18}
            />
            <div className="form-horizontal form-profile-1">
              <DateBox label="Data de Nascimento" labelLarge />
            </div>
            <div className="form-horizontal">
              <TextInput
                className="margin-input"
                label="Habilidades comportamentais"
                subLabel="(use vírgulas para separar diferentes habilidades)"
                type="text"
                autoComplete={false}
              />
              <TextInput
                label="Conhecimentos e tecnologias"
                subLabel="(use vírgulas para separar diferentes conhecimentos)"
                type="text"
                autoComplete={false}
              />
            </div>
            <div className="form-horizontal">
              <TextInput
                className="margin-input"
                label="Idiomas"
                subLabel="(use vírgulas para separar diferentes idiomas)"
                type="text"
                autoComplete={false}
              />
              <TextInput
                label="URL do Linkedin"
                type="text"
                autoComplete={false}
              />
            </div>
            <ButtonRectangle className="btn-save is-green" label="Salvar" />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditData
