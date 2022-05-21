/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import Layout from '../../components/Layout'
import ConfirmModal from '../../components/Modals/ConfirmModal'
import Text from '../../components/Text'
import { useJobRoutes } from '../../hooks/jobs'
import useAuth from '../../hooks/useAuth'
import { useSearchObject } from '../../hooks/url'
import { useGetAppliedJobs, useGetCreatedJobs } from '../../hooks/user'
import { translate } from '../../utils/translations'
import MyJobCard from './MyJobCard'
import './styles.css'

// Component that renders the page to view created and applied jobs. Also, the user
// can edit the ones they created and add new jobs
function MyJob() {
  const navigate = useNavigate()
  const [search] = useSearchObject()

  const showCreatedJobs = useMemo(() => search.criadas === '1', [search])

  const { userId } = useAuth()

  const [isCreatedJobs, setIsCreatedJobs] = useState(showCreatedJobs)
  const [modalJob, setModalJob] = useState()

  const {
    getCreatedJobs,
    createdJobs,
    count: totalCreated,
  } = useGetCreatedJobs(userId)
  const { appliedJobs, count: totalApplied } = useGetAppliedJobs(userId)

  const { deleteJob } = useJobRoutes()

  const onDelete = async (jobId) => {
    await deleteJob(jobId).then(() => {
      getCreatedJobs()
      setModalJob()
    })
  }

  const renderEmptyInfoText = () => (
    <div className="no-results-container">
      <Text
        className="is-bold is-blue"
        text="Não foram encontradas vagas"
        size={24}
      />
    </div>
  )

  const renderCreatedJobs = () => (
    <div className="jobs-container">
      <Text
        className="jobs-title"
        text={`Vagas criadas (${totalCreated} resultados)`}
        size={20}
      />
      {createdJobs.length > 0 ? (
        <div className="jobs-list">
          {createdJobs.map((job) => (
            <MyJobCard
              key={job.jobId}
              jobData={job}
              isCreatedJob
              onDelete={() => setModalJob(job)}
            />
          ))}
        </div>
      ) : (
        renderEmptyInfoText()
      )}
    </div>
  )

  const renderAppliedJobs = () => (
    <div className="jobs-container">
      <div className="jobs-title">
        <Text
          className="title-margin"
          text={`Vagas aplicadas (${totalApplied} resultados)`}
          size={20}
        />
        <Text text={translate('applied_job_warning')} />
      </div>
      {appliedJobs.length > 0 ? (
        <div className="jobs-list">
          {appliedJobs.map((job) => (
            <MyJobCard key={job.jobId} jobData={job} isCreatedJob={false} />
          ))}
        </div>
      ) : (
        renderEmptyInfoText()
      )}
    </div>
  )

  const jobButtonColor = (selected) => (selected ? 'is-green' : 'is-blue')

  return (
    <Layout
      headerLeftChildren={[
        <ButtonRectangle
          key="btn-created-jobs"
          label="Vagas Criadas"
          className={`${jobButtonColor(isCreatedJobs)} btn-margin`}
          onClick={() => setIsCreatedJobs(true)}
        />,
        <ButtonRectangle
          key="btn-applied-jobs"
          label="Vagas Aplicadas"
          className={`${jobButtonColor(!isCreatedJobs)}`}
          onClick={() => setIsCreatedJobs(false)}
        />,
      ]}
      headerRightChildren={[
        <ButtonRectangle
          key="btn-add-jobs"
          label="Criar Vaga"
          className="is-blue btn-margin"
          onClick={() => navigate('/formulariovaga/criar')}
        />,
        <ButtonRectangle
          key="btn-back"
          label="Voltar"
          className="is-blue"
          onClick={() => navigate('/')}
        />,
      ]}
    >
      <div className="my-jobs">
        <ConfirmModal
          title="Deletar Vaga"
          description={`Deseja realmente deletar a vaga "${
            modalJob && modalJob.job.title
          }"? A ação não poderá ser desfeita!`}
          onConfirm={() => onDelete(modalJob.jobId)}
          onCancel={() => setModalJob()}
          opened={modalJob !== undefined}
          isDangerous
        />
        {isCreatedJobs ? renderCreatedJobs() : renderAppliedJobs()}
      </div>
    </Layout>
  )
}

export default MyJob
