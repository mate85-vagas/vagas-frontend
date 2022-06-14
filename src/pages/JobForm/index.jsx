import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import { DateBox, SelectBox } from '../../components/FormElements'
import Layout from '../../components/Layout'
import ConfirmModal from '../../components/Modals/ConfirmModal'
import TagInput from '../../components/TagInput'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import { useGetEmailLists, useGetEmailListState } from '../../hooks/admin'
import { useGetJobById, useJobRoutes } from '../../hooks/jobs'
import { useSearchObject } from '../../hooks/url'
import useAuth from '../../hooks/useAuth'
import {
  DEFAULT_SALARY,
  jobScholarities,
  jobTypes,
} from '../../utils/constants/project'
import { translate } from '../../utils/translations'
import { isEmailValid } from '../../utils/validations'
import './styles.css'

// Component that renders the page to create, edit or delete a job
function JobForm() {
  const navigate = useNavigate()
  const [search] = useSearchObject()

  const params = useParams()
  const isCreationForm = params.type === 'criar'

  const { userId } = useAuth()

  const { job, jobId } = useGetJobById(params.id)

  const { emailLists } = useGetEmailLists()
  const { state: emailListState } = useGetEmailListState()

  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [saveModalOpened, setSaveModalOpened] = useState(false)
  const [createModalOpened, setCreateModalOpened] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [endingDate, setEndingDate] = useState('')
  const [site, setSite] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [type, setType] = useState('')
  const [workload, setWorkload] = useState('')
  const [salary, setSalary] = useState(DEFAULT_SALARY)
  const [emailsToSend, setEmailsToSend] = useState([])

  const [hasError, setHasError] = useState(false)

  const { createJob, updateJob, deleteJob } = useJobRoutes()

  const fromHome = useMemo(() => search.home === '1', [search])

  const isTitleInvalid = () => title === ''
  const isDescriptionInvalid = () => description === ''
  const isStartingDateInvalid = () => startingDate === ''
  const isEndingDateInvalid = () => endingDate === ''
  const isSiteInvalid = () => site === ''
  const isScholarityInvalid = () => scholarity === ''
  const isTypeInvalid = () => type === ''
  const isWorkloadInvalid = () => workload === ''

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

  const onSaveConfirm = async () => {
    if (hasJobChanges()) {
      if (
        isTitleInvalid() ||
        isDescriptionInvalid() ||
        isStartingDateInvalid() ||
        isEndingDateInvalid() ||
        isSiteInvalid() ||
        isScholarityInvalid() ||
        isTypeInvalid() ||
        isWorkloadInvalid()
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
          salary || DEFAULT_SALARY,
          endingDate,
          startingDate,
          userId,
          emailsToSend
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
          salary || DEFAULT_SALARY,
          endingDate,
          startingDate,
          userId
        )
      }
    }

    navigate('/minhasvagas?criadas=1')
  }

  const onSave = (e) => {
    e.preventDefault()
    if (isCreationForm) setCreateModalOpened(true)
    else setSaveModalOpened(true)
  }

  const onDeleteJob = async () => {
    await deleteJob(jobId).then(() => {
      navigate('/minhasvagas?criadas=1')
    })
  }

  const updateEmailToSend = (emails) => {
    setEmailsToSend(
      emails.filter((email) => {
        if (!isEmailValid(email)) {
          toast.error(`O e-mail '${email}' não é válido, digite novamente!`)
          return false
        }
        return true
      })
    )
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
            label="Salário/Bolsa/Vencimento"
            type="number"
            value={`${salary}`}
            setValue={(value) => setSalary(value)}
            placeholder={`${DEFAULT_SALARY}`}
            autoComplete={false}
            maxLength={255}
          />
        </div>
        {isCreationForm ? (
          <>
            {emailListState && (
              <div className="form-horizontal">
                <TagInput
                  className="tag-input"
                  label="Divulgar vaga para quais listas de e-mail?"
                  autoComplete={false}
                  tags={emailsToSend}
                  setValue={updateEmailToSend}
                  selectOptions={emailLists.map((emailList) => emailList.email)}
                  creatable={false}
                />
              </div>
            )}
            <ButtonRectangle
              className="btn-save is-blue"
              label="Criar Vaga"
              isSubmit
            />
          </>
        ) : (
          <div className="form-horizontal">
            <ButtonRectangle
              className="btn-save is-red margin-input"
              label="Deletar Vaga"
              onClick={() => setDeleteModalOpened(true)}
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
    <Layout returnUrl={fromHome ? '/' : ''} isFinalPage>
      <ConfirmModal
        title="Deletar Vaga"
        description={`Deseja realmente deletar a vaga "${
          job && job.title
        }"? A ação não poderá ser desfeita!`}
        onConfirm={() => onDeleteJob()}
        onCancel={() => setDeleteModalOpened(false)}
        opened={deleteModalOpened}
        isDangerous
      />
      <ConfirmModal
        title="Salvar Vaga"
        description={`Deseja realmente salvar a vaga "${job && job.title}"?`}
        onConfirm={() => onSaveConfirm()}
        onCancel={() => setSaveModalOpened(false)}
        opened={saveModalOpened}
      />
      <ConfirmModal
        title="Criar Vaga"
        description="Deseja realmente criar essa vaga?"
        onConfirm={() => onSaveConfirm()}
        onCancel={() => setCreateModalOpened(false)}
        opened={createModalOpened}
      />
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
