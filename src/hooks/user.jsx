/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api'
import { assignDefined } from '../utils/object'
import { handleNotAuthorized } from '../utils/requests'

export const useGetUserById = (id) => {
  const navigate = useNavigate()
  const [user, setUser] = useState()

  useEffect(async () => {
    if (!id) return
    const response = await api.get(`/usuarios/${id}`)

    if (response.data.message) {
      if (response.data.error) {
        toast.error(response.data.message)
        handleNotAuthorized(response, navigate)
        return
      }
      toast.success(response.data.message)
    }

    setUser(response.data)
  }, [id])

  return user
}

export const useGetCreatedJobs = (userId) => {
  const navigate = useNavigate()
  const [createdJobs, setCreatedJobs] = useState([])
  const [count, setCount] = useState(0)

  const getCreatedJobs = async () => {
    if (!userId) return
    const response = await api.get(`/usuarios/${userId}/vagas/criadas`)

    if (response.data.message) {
      if (response.data.error) {
        toast.error(response.data.message)
        handleNotAuthorized(response, navigate)
        return
      }
      toast.success(response.data.message)
    }

    setCreatedJobs(response.data.rows)
    setCount(response.data.count)
  }

  useEffect(() => {
    getCreatedJobs()
  }, [userId])

  return { getCreatedJobs, createdJobs, count }
}

export const useGetAppliedJobs = (userId) => {
  const navigate = useNavigate()
  const [appliedJobs, setAppliedJobs] = useState([])
  const [count, setCount] = useState(0)

  const getAppliedJobs = async () => {
    if (!userId) return
    const response = await api.get(`/usuarios/${userId}/vagas/aplicadas`)

    if (response.data.message) {
      if (response.data.error) {
        toast.error(response.data.message)
        handleNotAuthorized(response, navigate)
        return
      }
      toast.success(response.data.message)
    }

    setAppliedJobs(response.data.rows)
    setCount(response.data.count)
  }

  useEffect(() => {
    getAppliedJobs()
  }, [userId])

  return { getAppliedJobs, appliedJobs, count }
}

export const useUserRoutes = () => {
  const navigate = useNavigate()

  const updateUser = async (id, { name, email, password }) => {
    const userUpdateData = assignDefined({}, { name, email, password })
    const response = await api.patch(`/usuarios/${id}`, userUpdateData)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    handleNotAuthorized(response, navigate)
  }

  return { updateUser }
}

export const usePasswordRecovery = () => {
  const sendRecoveryLink = useCallback(async (body) => {
    return new Promise((resolve, reject) => {
      api
        .post('/usuarios/recuperacao/senha', body)
        .then((response) => {
          if (response.data.error) {
            reject()
            return
          }

          resolve()
        })
        .catch(reject)
    })
  }, [])

  return { sendRecoveryLink }
}
