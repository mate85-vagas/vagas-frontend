import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetJobById } from '../../hooks/jobs'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import { localDate, numberToReais } from '../../utils/conversions'
import { jobScholarityLabel, jobTypeLabel } from '../../utils/constants/project'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import './styles.css'
import { translate } from '../../utils/translations'

function JobDetails() {
  const params = useParams()
  const { job, user } = useGetJobById(params.id)

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
    <Layout isFinalPage>
      <div className="job-details">
        <div className="card detail-card">
          {job && user ? (
            <>
              <div className="detail-top-container">
                <div>
                  <Text
                    className="is-blue is-bold"
                    text={job.title}
                    size={24}
                  />
                  <Text text={user.name} size={22} />
                  <Text
                    className="is-blue is-bold description-title"
                    text="Descrição da vaga"
                    size={20}
                  />
                  <Text
                    className="description-container"
                    text={job.description}
                    size={18}
                  />
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
                    user.name,
                    'bottom-detail-item',
                    18
                  )}
                  {renderDetailItem('E-mail', user.email, '', 18)}
                  <div className="btn-apply-container">
                    <ButtonRectangle
                      className="is-green"
                      label={translate('apply_to_job')}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Text
              className="is-bold is-blue"
              text="Carregando detalhes da vaga..."
              size={24}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default JobDetails
