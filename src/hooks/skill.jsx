/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'

export const useGetSkills = () => {
  const [skills, setSkills] = useState([])

  useEffect(async () => {
    const response = await api.get(`/habilidades`)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    setSkills(response.data.rows)
  }, [])

  return skills
}

export const useSkillRoutes = () => {
  const createSkill = async (descriptions) => {
    if (!descriptions || descriptions.length === 0) {
      toast.error(
        'O campo "Descrição" não pode estar vazio para criar uma habilidade.'
      )
      return
    }

    const response = await api.post(`/habilidades/multiplas`, {
      content: descriptions.map((description) => ({ description })),
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  return { createSkill }
}
