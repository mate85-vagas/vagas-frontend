import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import TagInput from '../../components/TagInput'
import Text from '../../components/Text'
import {
  useAdminRoutes,
  useGetEmailLists,
  useGetEmailListState,
} from '../../hooks/admin'
import { translate } from '../../utils/translations'
import { isEmailValid } from '../../utils/validations'
import './styles.css'

function ManageEmailList() {
  const navigate = useNavigate()
  const [emailTags, setEmailTags] = useState([])

  const { emailLists } = useGetEmailLists()
  const { createEmailList, deleteEmailList } = useAdminRoutes()

  const { state: emailListState } = useGetEmailListState()

  const updateEmailTags = (tags) => {
    setEmailTags(
      tags.filter((tag) => {
        if (!isEmailValid(tag)) {
          toast.error(`O e-mail '${tag}' não é válido, digite novamente!`)
          return false
        }
        return true
      })
    )
  }

  const saveEmailLists = () => {
    const savedEmails = emailLists.map((emailList) => emailList.email)
    const newEmails = emailTags.filter((email) => !savedEmails.includes(email))
    const deleteEmails = emailLists
      .filter((emailList) => !emailTags.includes(emailList.email))
      .map((emailList) => emailList.id)

    if (newEmails.length > 0)
      createEmailList(newEmails, emailListState).then(async () => {
        await deleteEmailList(deleteEmails)
        navigate('/')
      })
    else if (deleteEmails.length > 0)
      deleteEmailList(deleteEmails).then(() => navigate('/'))
    else navigate('/')
  }

  useEffect(() => {
    setEmailTags(emailLists.map((emailList) => emailList.email))
  }, [emailLists])

  return (
    <div className="option-card-content">
      {emailListState !== undefined ? (
        <>
          <TagInput
            className="tag-input"
            autoComplete={false}
            tags={emailTags}
            setValue={updateEmailTags}
            maxLength={255}
            selectOptions={emailLists.map((emailList) => emailList.email)}
          />
          <ButtonRectangle
            className="is-green"
            label="Salvar"
            onClick={saveEmailLists}
          />
        </>
      ) : (
        <Text text={translate('getting_configs')} />
      )}
    </div>
  )
}

export default ManageEmailList
