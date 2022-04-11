/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import { DateBox, SelectBox } from '../../components/FormElements'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import { useGetProfileById, useProfileRoutes } from '../../hooks/profile'
import useAuth from '../../hooks/useAuth'
import { useGetUserById, useUserRoutes } from '../../hooks/user'
import {
  appearOnSearchOptions,
  jobScholarities,
} from '../../utils/constants/project'
import { translate } from '../../utils/translations'
import './styles.css'

function EditData() {
  const navigate = useNavigate()
  const { userId } = useAuth()

  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [searchable, setSearchable] = useState(false)
  const [knowledge, setKnowledge] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [languages, setLanguages] = useState('')
  const [linkResume, setLinkResume] = useState('')

  const [hasError, setHasError] = useState(false)

  const user = useGetUserById(userId)
  const profile = useGetProfileById(user && user.profileId, false)

  const { updateUser } = useUserRoutes()
  const { createProfile, updateProfile } = useProfileRoutes()

  const isScholarityInvalid = () => scholarity === ''
  const isBirthDateInvalid = () => birthDate === ''
  const isKnowledgeInvalid = () => knowledge === ''
  const isTechnologiesInvalid = () => technologies === ''

  const hasProfileChanges = () => {
    if (profile) {
      return (
        birthDate !== profile.birthDate ||
        scholarity !== profile.scholarity ||
        searchable !== profile.searchable ||
        knowledge !== profile.knowledge ||
        technologies !== profile.technologies ||
        languages !== profile.languages ||
        linkResume !== profile.linkResume
      )
    }
    return (
      birthDate !== '' ||
      scholarity !== '' ||
      searchable !== false ||
      knowledge !== '' ||
      technologies !== '' ||
      languages !== '' ||
      linkResume !== ''
    )
  }

  const onSave = async (e) => {
    e.preventDefault()
    if (user.email !== email) await updateUser(userId, { email })
    if (hasProfileChanges()) {
      if (
        isScholarityInvalid() ||
        isBirthDateInvalid() ||
        isKnowledgeInvalid() ||
        isTechnologiesInvalid()
      ) {
        toast.error(translate('mandatory_not_filled'))
        setHasError(true)
        return
      }

      if (user.profileId !== -1) {
        await updateProfile(
          user.profileId,
          userId,
          birthDate,
          scholarity,
          searchable,
          knowledge,
          technologies,
          languages,
          linkResume
        )
      } else {
        await createProfile(
          userId,
          birthDate,
          scholarity,
          searchable,
          knowledge,
          technologies,
          languages,
          linkResume
        )
      }
    }

    navigate('/')
  }

  useEffect(() => {
    if (!user) return
    setEmail(user.email)
  }, [user])

  useEffect(() => {
    if (!profile) return
    setBirthDate(profile.birthDate)
    setScholarity(profile.scholarity)
    setSearchable(profile.searchable)
    setKnowledge(profile.knowledge)
    setTechnologies(profile.technologies)
    setLanguages(profile.languages)
    setLinkResume(profile.linkResume)
  }, [profile])

  return (
    <Layout isFinalPage>
      <div className="edit-data">
        <div className="card">
          <div className="card-title">
            <Text className="is-bold is-blue" text="Editar dados" size={24} />
          </div>
          {user && (user.profileId === -1 || profile) ? (
            <form autoComplete="off" onSubmit={onSave}>
              <Text
                className="is-light is-italic"
                text="Informações cadastrais"
                size={18}
              />
              <div className="form-user">
                <TextInput
                  label="E-mail"
                  type="email"
                  autoComplete={false}
                  value={email}
                  setValue={setEmail}
                />
              </div>
              <Text
                className="is-light is-italic"
                text="Informações do perfil"
                size={18}
              />
              <div className="form-horizontal form-profile-1">
                <SelectBox
                  className="margin-input"
                  label="Escolaridade"
                  labelLarge
                  initialOption="Selecionar Escolaridade"
                  value={scholarity}
                  options={jobScholarities}
                  onChange={(e) => setScholarity(e.target.value)}
                  hasError={hasError && isScholarityInvalid()}
                />
                <DateBox
                  className="margin-input"
                  label="Data de Nascimento"
                  labelLarge
                  onChange={(e) => setBirthDate(e.target.value)}
                  value={birthDate}
                  hasError={hasError && isBirthDateInvalid()}
                />
                <SelectBox
                  label="Aparecer na busca?"
                  labelLarge
                  initialOption=""
                  value={searchable}
                  options={appearOnSearchOptions}
                  onChange={(e) => setSearchable(e.target.value)}
                />
              </div>
              <div className="form-horizontal">
                <TextInput
                  className="margin-input"
                  label="Habilidades comportamentais"
                  subLabel="(use vírgulas para separar diferentes habilidades)"
                  type="text"
                  autoComplete={false}
                  value={knowledge}
                  hasError={hasError && isKnowledgeInvalid()}
                  setValue={setKnowledge}
                  maxLength={255}
                />
                <TextInput
                  label="Conhecimentos e tecnologias"
                  subLabel="(use vírgulas para separar diferentes conhecimentos)"
                  type="text"
                  autoComplete={false}
                  value={technologies}
                  hasError={hasError && isTechnologiesInvalid()}
                  setValue={setTechnologies}
                  maxLength={255}
                />
              </div>
              <div className="form-horizontal">
                <TextInput
                  className="margin-input"
                  label="Idiomas"
                  subLabel="(use vírgulas para separar diferentes idiomas)"
                  type="text"
                  autoComplete={false}
                  value={languages}
                  setValue={setLanguages}
                  maxLength={255}
                />
                <TextInput
                  label="URL do Linkedin"
                  type="text"
                  autoComplete={false}
                  value={linkResume}
                  setValue={setLinkResume}
                  maxLength={255}
                />
              </div>
              <ButtonRectangle
                className="btn-save is-green"
                label="Salvar"
                isSubmit
              />
            </form>
          ) : (
            <Text
              className="is-bold is-blue"
              text="Carregando usuário e perfil..."
              size={24}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default EditData
