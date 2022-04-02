/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import api from '../api'

export const useGetJobById = (id) => {
  const [job, setJob] = useState()

  useEffect(async () => {
    const response = await api.get(`/vagas/${id}`)
    setJob(response.data)
  }, [id])

  return job
}
