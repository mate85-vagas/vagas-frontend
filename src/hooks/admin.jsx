/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api'
import { handleNotAuthorized } from '../utils/requests'

export const useGetEmailLists = (userId) => {
  const navigate = useNavigate()
  const [emailLists, setEmailLists] = useState([])

  useEffect(async () => {
    if (!userId) return

    const response = await api.get(`/email-list`, { userId })

    if (response.data.message && response.data.error) {
      toast.error(response.data.message)
      handleNotAuthorized(response, navigate)
      return
    }

    setEmailLists(response.data)
  }, [userId])

  return { emailLists }
}

export const useGetEmailListState = () => {
  const navigate = useNavigate()
  const [state, setState] = useState()

  useEffect(async () => {
    const response = await api.get(`/email-list/verificacao`)

    if (response.data.message && response.data.error) {
      toast.error(response.data.message)
      handleNotAuthorized(response, navigate)
      return
    }

    setState(response.data)
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

  const manageEmailListState = async (state, userId) => {
    const response = await api.patch(`/email-list`, { state, userId })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    handleNotAuthorized(response, navigate)
  }

  const updateEmailList = async (emails, state) => {
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

  return {
    sendInvite,
    manageEmailListState,
    updateEmailList,
  }
}
