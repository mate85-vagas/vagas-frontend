/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'
import { assignDefined } from '../utils/object'

export const useGetUserById = (id) => {
  const [user, setUser] = useState()

  useEffect(async () => {
    if (!id) return
    const response = await api.get(`/usuarios/${id}`)

    if (response.data.message) {
      toast.error(response.data.message)
      return
    }

    setUser(response.data)
  }, [id])

  return user
}

export const useUserRoutes = () => {
  const updateUser = async (id, { name, email, password }) => {
    const userUpdateData = assignDefined({}, { name, email, password })
    const response = await api.patch(`/usuarios/${id}`, userUpdateData)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  return { updateUser }
}
