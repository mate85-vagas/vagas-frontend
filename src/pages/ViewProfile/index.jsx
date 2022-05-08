/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import Layout from '../../components/Layout'
import Tag from '../../components/Tag'
import Text from '../../components/Text'
import { useGetProfileById } from '../../hooks/profile'
import useAuth from '../../hooks/useAuth'
import { useGetUserById } from '../../hooks/user'
import { jobScholarityLabel } from '../../utils/constants/project'
import { translate } from '../../utils/translations'
import './styles.css'

// Component that renders the page to see a profile details
function ViewProfile() {
  const navigate = useNavigate()

  const params = useParams()
  const { userId } = useAuth()

  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [knowledge, setKnowledge] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [languages, setLanguages] = useState('')
  const [linkResume, setLinkResume] = useState('')

  const user = useGetUserById(params.id)
  const profile = useGetProfileById(user && user.profileId, false)

  const isOwnProfile = useMemo(
    () => parseInt(userId, 10) === parseInt(params.id, 10),
    [userId, params]
  )

  const userIsVisible = useMemo(
    () => (profile && profile.searchable) || isOwnProfile,
    [profile, userId, params]
  )

  const onEditProfile = () => {
    navigate('/editardados')
  }

  useEffect(() => {
    if (!user) return
    setEmail(user.email)
  }, [user])

  useEffect(() => {
    if (!profile) return
    setBirthDate(
      profile.birthDate && new Date(profile.birthDate).toLocaleDateString()
    )
    setScholarity(profile.scholarity && jobScholarityLabel[profile.scholarity])
    setKnowledge(profile.knowledge)
    setTechnologies(profile.technologies)
    setLanguages(profile.languages)
    setLinkResume(profile.linkResume)
  }, [profile])

  const renderCard = () => (
    <>
      <div className="card-title">
        <Text className="is-bold is-blue" text={user.name} size={24} />
      </div>
      <div className="profile-row margin-bottom">
        <div className="profile-field margin-input">
          <Text className="is-bold" text="E-mail" size={18} />
          <Text className="" text={email} size={16} />
        </div>
        <div className="profile-field">
          <Text className="is-bold" text="Data de Nascimento" size={18} />
          <Text text={birthDate || translate('not_informed')} size={16} />
        </div>
      </div>
      <div className="profile-row margin-bottom">
        <div className="profile-field margin-input">
          <Text className="is-bold" text="Escolaridade" size={18} />
          <Text
            className=""
            text={scholarity || translate('not_informed')}
            size={16}
          />
        </div>
        <div className="profile-field">
          <Text className="is-bold" text="Idiomas" size={18} />
          <Text text={languages || translate('not_informed')} size={16} />
        </div>
      </div>
      <div className="profile-row">
        <div className="profile-field margin-input">
          <Text
            className="is-bold"
            text="Habilidades comportamentais"
            size={18}
          />
          {knowledge ? (
            <ul className="filters">
              {knowledge.split(';').map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </ul>
          ) : (
            <Text text={translate('not_informed')} size={16} />
          )}
        </div>
        <div className="profile-field">
          <Text
            className="is-bold"
            text="Conhecimentos e tecnologias"
            size={18}
          />
          {technologies ? (
            <ul className="filters">
              {technologies.split(';').map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </ul>
          ) : (
            <Text text={translate('not_informed')} size={16} />
          )}
        </div>
      </div>
      <div className="profile-row">
        <div className="profile-field margin-input">
          <Text
            className="is-bold"
            text={translate('profile_field_resume')}
            size={18}
          />
          <Text text={linkResume || translate('not_informed')} size={16} />
        </div>
      </div>
      {isOwnProfile && (
        <ButtonRectangle
          className="is-green btn-edit-profile"
          label="Editar Perfil"
          onClick={onEditProfile}
        />
      )}
    </>
  )

  const renderInfoText = (text) => (
    <Text className="is-bold is-blue" text={text} size={24} />
  )

  return (
    <Layout isFinalPage>
      <div className="view-profile">
        <div className="card">
          {user && (user.profileId === -1 || profile)
            ? user.profileId === -1 || userIsVisible
              ? renderCard()
              : renderInfoText('Esse perfil não quer ser visualizado!')
            : renderInfoText('Carregando usuário e perfil...')}
        </div>
      </div>
    </Layout>
  )
}

export default ViewProfile
