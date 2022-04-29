/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'

export const useGetTechnologies = () => {
  const [technologies, setTechnologies] = useState([])

  useEffect(async () => {
    const response = await api.get(`/tecnologias`)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    setTechnologies(response.data.rows)
  }, [])

  return technologies
}

export const useTechnologyRoutes = () => {
  const createTechnology = async (descriptions) => {
    if (!descriptions || descriptions.length === 0) {
      toast.error(
        'O campo "Descrição" não pode estar vazio para criar uma tecnologia.'
      )
      return
    }

    const response = await api.post(`/tecnologias`, {
      content: descriptions.map((description) => ({ description })),
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  return { createTechnology }
}
