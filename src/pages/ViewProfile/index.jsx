import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import { useGetProfileById } from '../../hooks/profile'
import useAuth from '../../hooks/useAuth'
import { useGetUserById } from '../../hooks/user'
import { jobScholarityLabel } from '../../utils/constants/project'
import { translate } from '../../utils/translations'
import './styles.css'

function ViewProfile() {
  const { userId } = useAuth()

  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [knowledge, setKnowledge] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [languages, setLanguages] = useState('')
  const [linkResume, setLinkResume] = useState('')

  const user = useGetUserById(userId)
  const profile = useGetProfileById(user && user.profileId, false)

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

  return (
    <Layout isFinalPage>
      <div className="view-profile">
        <div className="card">
          <div className="card-title">
            <Text
              className="is-bold is-blue"
              text="Fulano da Silva"
              size={24}
            />
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
          <div className="profile-row margin-bottom">
            <div className="profile-field margin-input">
              <Text
                className="is-bold"
                text="Habilidades comportamentais"
                size={18}
              />
              <Text
                className=""
                text={knowledge || translate('not_informed')}
                size={16}
              />
            </div>
            <div className="profile-field">
              <Text
                className="is-bold"
                text="Conhecimentos e tecnologias"
                size={18}
              />
              <Text
                text={technologies || translate('not_informed')}
                size={16}
              />
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-field margin-input">
              <Text className="is-bold" text="URL do Linkedin" size={18} />
              <Text text={linkResume || translate('not_informed')} size={16} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewProfile
