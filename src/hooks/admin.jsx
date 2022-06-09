/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api'
import { handleNotAuthorized } from '../utils/requests'

export const useGetEmailLists = () => {
  const navigate = useNavigate()
  const [emailLists, setEmailLists] = useState([])

  useEffect(async () => {
    const response = await api.get(`/email-list`)

    if (response.data.message && response.data.error) {
      toast.error(response.data.message)
      handleNotAuthorized(response, navigate)
      return
    }

    setEmailLists(response.data.rows)
  }, [])

  return { emailLists }
}

export const useGetEmailListState = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(true)

  useEffect(async () => {
    const response = await api.get(`/email-list/verificacao`)

    if (response.data.message && response.data.error) {
      toast.error(response.data.message)
      handleNotAuthorized(response, navigate)
      return
    }

    setState(response.data.status)
  }, [])

  return { state }
}

export const useAdminRoutes = () => {
  const navigate = useNavigate()

  const sendInvite = async (email) => {
    const response = await api.post(`/usuarios/convite`, { email })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    handleNotAuthorized(response, navigate)
  }

  const manageEmailListState = async (state) => {
    const response = await api.patch(`/email-list`, { state })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    handleNotAuthorized(response, navigate)
  }

  const createEmailList = async (emails, state) => {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/email-list`,
          emails.map((email) => ({ email, isActive: state }))
        )
        .then((response) => {
          if (response.data.message) {
            if (response.data.error) {
              toast.error(response.data.message)
              handleNotAuthorized(response, navigate)
              reject()
            } else {
              toast.success(response.data.message)
              resolve()
            }
          }
        })
    })
  }

  const deleteEmailList = async (ids) => {
    return new Promise((resolve, reject) => {
      api
        .delete(`/email-list/${ids.join(',')}`)
        .then((response) => {
          if (response.data.message) {
            if (response.data.error) {
              toast.error(response.data.message)
              handleNotAuthorized(response, navigate)
              reject()
            } else {
              toast.success(response.data.message)
              resolve()
            }
          }
        })
        .catch(reject)
    })
  }

  return {
    sendInvite,
    manageEmailListState,
    createEmailList,
    deleteEmailList,
  }
}
