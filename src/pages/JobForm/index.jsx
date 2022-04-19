import React from 'react'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import { DateBox, SelectBox } from '../../components/FormElements'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import { jobScholarities, jobTypes } from '../../utils/constants/project'
import './styles.css'

function JobForm() {
  const isCreationForm = false

  return (
    <Layout isFinalPage>
      <div className="job-form">
        <div className="card">
          <div className="card-title">
            <Text
              className="is-bold is-blue"
              text={isCreationForm ? 'Cadastrar vaga' : 'Editar vaga'}
              size={24}
            />
          </div>
          <form autoComplete="off">
            <TextInput
              label="Título"
              type="text"
              autoComplete={false}
              maxLength={255}
            />
            <TextInput label="Descrição" multiline />
            <div className="form-horizontal form-margin-top">
              <DateBox
                className="margin-input"
                label="Data de Início do Trabalho"
                labelLarge
              />
              <DateBox label="Data de Fim das Candidaturas" labelLarge />
            </div>
            <div className="form-horizontal">
              <TextInput
                className="margin-input"
                label="Localidade"
                type="text"
                autoComplete={false}
                maxLength={255}
              />
              <SelectBox
                className="form-margin-top"
                label="Escolaridade"
                labelLarge
                initialOption="Selecionar Escolaridade"
                options={jobScholarities}
              />
            </div>
            <div className="form-horizontal">
              <SelectBox
                className="form-margin-top margin-input"
                label="Tipo da Vaga"
                labelLarge
                initialOption="Selecionar Tipo"
                options={jobTypes}
              />
              <TextInput
                className="margin-input"
                label="Carga Horária"
                type="number"
                autoComplete={false}
              />
              <TextInput
                label="Salário"
                type="number"
                autoComplete={false}
                maxLength={255}
              />
            </div>
            {isCreationForm ? (
              <ButtonRectangle
                className="btn-save is-blue"
                label="Criar Vaga"
                isSubmit
              />
            ) : (
              <div className="form-horizontal">
                <ButtonRectangle
                  className="btn-save is-red margin-input"
                  label="Deletar Vaga"
                />
                <ButtonRectangle
                  className="btn-save is-green"
                  label="Salvar Vaga"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default JobForm
