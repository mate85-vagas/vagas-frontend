/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'

export const useGetProfileById = (id, displayError = true) => {
  const [profile, setProfile] = useState()

  useEffect(async () => {
    if (id === -1) return
    const response = await api.get(`/perfis/${id}`)

    if (response.data.message) {
      if (displayError) toast.error(response.data.message)
      return
    }

    setProfile(response.data)
  }, [id])

  return profile
}

export const useProfileRoutes = () => {
  const createProfile = async (
    userId,
    birthDate,
    scholarity,
    searchable,
    knowledge,
    technologies,
    languages,
    linkResume
  ) => {
    if (searchable === undefined)
      toast.error('O campo "Aparecer na busca" não pode estar vazio.')

    const response = await api.post(`/perfis`, {
      userId,
      birthDate,
      scholarity,
      searchable,
      knowledge,
      technologies,
      languages,
      linkResume,
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  const updateProfile = async (
    id,
    userId,
    birthDate,
    scholarity,
    searchable,
    knowledge,
    technologies,
    languages,
    linkResume
  ) => {
    if (searchable === undefined)
      toast.error('O campo "Aparecer na busca" não pode estar vazio.')

    const response = await api.patch(`/perfis/${id}`, {
      userId,
      birthDate,
      scholarity,
      searchable,
      knowledge,
      technologies,
      languages,
      linkResume,
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  const deleteProfile = async (id) => {
    const response = await api.delete(`/perfis/${id}`)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  return { createProfile, updateProfile, deleteProfile }
}
