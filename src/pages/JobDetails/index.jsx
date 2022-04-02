import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetJobById } from '../../hooks/jobs'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import { localDate, numberToReais } from '../../utils/conversions'
import { jobScholarityLabel, jobTypeLabel } from '../../utils/constants/project'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import './styles.css'

function JobDetails() {
  const params = useParams()
  const job = useGetJobById(params.id)

  const renderDetailItem = (
    title,
    description,
    className = 'side-detail-item',
    descriptionSize = 16
  ) => (
    <div className={className}>
      <Text className="is-bold" text={title} size={18} />
      <Text text={description} size={descriptionSize} />
    </div>
  )

  return (
    <Layout
      headerRightChildren={
        <ButtonRectangle className="is-blue" label="Vagas" />
      }
    >
      <div className="job-details">
        <div className="card detail-card">
          {job ? (
            <>
              <div className="detail-top-container">
                <div>
                  <Text
                    className="is-blue is-bold"
                    text={job.title}
                    size={24}
                  />
                  <Text text="Frederico Araújo Durão" size={22} />
                  <Text
                    className="is-blue is-bold description-title"
                    text="Descrição da vaga"
                    size={20}
                  />
                  <Text text={job.description} size={18} />
                </div>
                <div className="detail-menu">
                  {renderDetailItem(
                    'Período da Candidatura',
                    `${localDate(job.createdAt)} - ${localDate(job.endingDate)}`
                  )}
                  {renderDetailItem(
                    'Início do Trabalho',
                    `${localDate(job.startingDate)}`
                  )}
                  {renderDetailItem(
                    'Tipo de Vaga',
                    `${jobTypeLabel[job.type]}`
                  )}
                  {renderDetailItem('Carga horária', `${job.workload} horas`)}
                  {renderDetailItem('Salário', `${numberToReais(job.salary)}`)}
                  {renderDetailItem('Localidade', `${job.site}`)}
                  {renderDetailItem(
                    'Escolaridade',
                    `${jobScholarityLabel[job.scholarity]}`,
                    ''
                  )}
                </div>
              </div>
              <div>
                <div>
                  <Text className="is-blue is-bold" text="Contato" size={20} />
                </div>
                <div className="bottom-details">
                  {renderDetailItem(
                    'Nome do responsável pela vaga',
                    'Frederico Araújo Durão',
                    'bottom-detail-item',
                    18
                  )}
                  {renderDetailItem('E-mail', 'computacao@ufba.br', '', 18)}
                  <div className="btn-apply-container">
                    <ButtonRectangle className="is-green" label="Aplicar" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Text
              text="Carregando detalhes da vaga..."
              size={24}
              weight="bold"
              color="#13335F"
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default JobDetails
