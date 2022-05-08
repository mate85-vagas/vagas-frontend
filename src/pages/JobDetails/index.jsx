import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetJobById, useJobRoutes } from '../../hooks/jobs'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import { localDate, numberToReais } from '../../utils/conversions'
import { jobScholarityLabel, jobTypeLabel } from '../../utils/constants/project'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import './styles.css'
import { translate } from '../../utils/translations'
import ConfirmModal from '../../components/Modals/ConfirmModal'
import useAuth from '../../hooks/useAuth'
import { useGetAppliedJobs } from '../../hooks/user'

// Component that renders the page to see a job details or apply to it
function JobDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const { userId } = useAuth()
  const { applyToJob } = useJobRoutes()
  const { job, user } = useGetJobById(params.id)

  const { appliedJobs } = useGetAppliedJobs(userId)

  const [modalOpened, setModalOpened] = useState(false)

  const isJobApplied = useMemo(
    () =>
      appliedJobs.filter(({ jobId }) => jobId === parseInt(params.id, 10))
        .length > 0,
    [appliedJobs, params]
  )

  const onApplyToJob = async () => {
    await applyToJob(parseInt(params.id, 10), parseInt(userId, 10)).then(
      (hasError) => {
        if (!hasError) navigate('/minhasvagas')
        else setModalOpened(false)
      }
    )
  }

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
      <ConfirmModal
        title="Aplicar para Vaga"
        description={`Deseja realmente aplicar para a vaga "${
          job && job.title
        }"?`}
        onConfirm={() => onApplyToJob()}
        onCancel={() => setModalOpened(false)}
        opened={modalOpened}
      />
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
                      label={translate(
                        isJobApplied ? 'job_applied' : 'apply_to_job'
                      )}
                      onClick={() => setModalOpened(true)}
                      disabled={isJobApplied}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Text
              className="is-bold is-blue"
              text={
                params.id
                  ? 'Carregando detalhes da vaga...'
                  : 'Essa vaga não existe!'
              }
              size={24}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default JobDetails
