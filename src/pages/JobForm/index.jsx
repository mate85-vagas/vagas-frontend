import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import { DateBox, SelectBox } from '../../components/FormElements'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import { useGetJobById, useJobRoutes } from '../../hooks/jobs'
import useAuth from '../../hooks/useAuth'
import { jobScholarities, jobTypes } from '../../utils/constants/project'
import { translate } from '../../utils/translations'
import './styles.css'

function JobForm() {
  const navigate = useNavigate()
  const params = useParams()
  const isCreationForm = params.type === 'criar'

  const { userId } = useAuth()

  const { job, jobId } = useGetJobById(params.id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [endingDate, setEndingDate] = useState('')
  const [site, setSite] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [type, setType] = useState('')
  const [workload, setWorkload] = useState('')
  const [salary, setSalary] = useState('')

  const [hasError, setHasError] = useState(false)

  const { createJob, updateJob, deleteJob } = useJobRoutes()

  const isTitleInvalid = () => title === ''
  const isDescriptionInvalid = () => description === ''
  const isStartingDateInvalid = () => startingDate === ''
  const isEndingDateInvalid = () => endingDate === ''
  const isSiteInvalid = () => site === ''
  const isScholarityInvalid = () => scholarity === ''
  const isTypeInvalid = () => type === ''
  const isWorkloadInvalid = () => workload === ''
  const isSalaryInvalid = () => salary === ''

  const hasJobChanges = () => {
    if (job) {
      return (
        title !== job.title ||
        description !== job.description ||
        startingDate !== job.startingDate ||
        endingDate !== job.endingDate ||
        site !== job.site ||
        scholarity !== job.scholarity ||
        type !== job.type ||
        workload !== job.workload ||
        salary !== job.salary
      )
    }
    return true
  }

  const onSave = async (e) => {
    e.preventDefault()
    if (hasJobChanges()) {
      if (
        isTitleInvalid() ||
        isDescriptionInvalid() ||
        isStartingDateInvalid() ||
        isEndingDateInvalid() ||
        isSiteInvalid() ||
        isScholarityInvalid() ||
        isTypeInvalid() ||
        isWorkloadInvalid() ||
        isSalaryInvalid()
      ) {
        toast.error(translate('mandatory_not_filled'))
        setHasError(true)
        return
      }

      if (isCreationForm) {
        await createJob(
          description,
          scholarity,
          title,
          type,
          site,
          workload,
          salary,
          endingDate,
          startingDate,
          userId
        )
      } else if (job) {
        await updateJob(
          jobId,
          description,
          scholarity,
          title,
          type,
          site,
          workload,
          salary,
          endingDate,
          startingDate,
          userId
        )
      }
    }

    navigate('/')
  }

  const onDeleteJob = async (e) => {
    e.preventDefault()
    await deleteJob(jobId).then(() => {
      navigate('/')
    })
  }

  useEffect(() => {
    if (!job) return
    setTitle(job.title)
    setDescription(job.description)
    setStartingDate(job.startingDate)
    setEndingDate(job.endingDate)
    setSite(job.site)
    setScholarity(job.scholarity)
    setType(job.type)
    setWorkload(job.workload)
    setSalary(job.salary)
  }, [job])

  const renderCard = () => (
    <>
      <div className="card-title">
        <Text
          className="is-bold is-blue"
          text={isCreationForm ? 'Cadastrar vaga' : 'Editar vaga'}
          size={24}
        />
      </div>
      <form autoComplete="off" onSubmit={onSave}>
        <TextInput
          label="Título"
          type="text"
          value={title}
          setValue={setTitle}
          autoComplete={false}
          maxLength={255}
          hasError={hasError && isTitleInvalid()}
        />
        <TextInput
          label="Descrição"
          multiline
          value={description}
          setValue={setDescription}
          hasError={hasError && isDescriptionInvalid()}
        />
        <div className="form-horizontal form-margin-top">
          <DateBox
            className="margin-input"
            label="Data de Início do Trabalho"
            labelLarge
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            hasError={hasError && isStartingDateInvalid()}
          />
          <DateBox
            label="Data de Fim das Candidaturas"
            labelLarge
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
            hasError={hasError && isEndingDateInvalid()}
          />
        </div>
        <div className="form-horizontal">
          <TextInput
            className="margin-input"
            label="Localidade"
            value={site}
            setValue={setSite}
            type="text"
            autoComplete={false}
            maxLength={255}
            hasError={hasError && isSiteInvalid()}
          />
          <SelectBox
            className="form-margin-top"
            label="Escolaridade"
            labelLarge
            value={scholarity}
            onChange={(e) => setScholarity(e.target.value)}
            initialOption="Selecionar Escolaridade"
            options={jobScholarities}
            hasError={hasError && isScholarityInvalid()}
          />
        </div>
        <div className="form-horizontal">
          <SelectBox
            className="form-margin-top margin-input"
            label="Tipo da Vaga"
            labelLarge
            initialOption="Selecionar Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={jobTypes}
            hasError={hasError && isTypeInvalid()}
          />
          <TextInput
            className="margin-input"
            label="Carga Horária"
            type="number"
            value={`${workload}`}
            setValue={setWorkload}
            autoComplete={false}
            hasError={hasError && isWorkloadInvalid()}
          />
          <TextInput
            label="Salário"
            type="number"
            value={`${salary}`}
            setValue={setSalary}
            autoComplete={false}
            maxLength={255}
            hasError={hasError && isSalaryInvalid()}
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
              onClick={onDeleteJob}
            />
            <ButtonRectangle
              className="btn-save is-green"
              label="Salvar Vaga"
              isSubmit
            />
          </div>
        )}
      </form>
    </>
  )

  const renderInfoText = (text) => (
    <Text className="is-bold is-blue" text={text} size={24} />
  )

  return (
    <Layout isFinalPage>
      <div className="job-form">
        <div className="card">
          {isCreationForm || job
            ? renderCard()
            : renderInfoText('Carregando formulário...')}
        </div>
      </div>
    </Layout>
  )
}

export default JobForm
