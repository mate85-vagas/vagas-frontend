/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'

export const useGetJobById = (id) => {
  const [job, setJob] = useState()
  const [user, setUser] = useState()
  const [jobId, setJobId] = useState()
  const [userId, setUserId] = useState()

  useEffect(async () => {
    if (!id) return
    const response = await api.get(`/vagas/${id}`)

    if (response.data.message && response.data.error) {
      toast.error(response.data.message)
      return
    }

    setJob(response.data.job)
    setUser(response.data.user)
    setJobId(response.data.jobId)
    setUserId(response.data.userId)
  }, [id])

  return { job, user, jobId, userId }
}

export const useJobRoutes = () => {
  const createJob = async (
    description,
    scholarity,
    title,
    type,
    site,
    workload,
    salary,
    endingDate,
    startingDate,
    userId
  ) => {
    if (startingDate === undefined || endingDate === undefined)
      toast.error('Os campos "Inicio" e "Fim" não podem estar vazio.')

    const response = await api.post(`/vagas`, {
      description,
      scholarity,
      title,
      type,
      site,
      workload,
      salary,
      endingDate,
      startingDate,
      userId,
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }
  const updateJob = async (
    jobId,
    description,
    scholarity,
    title,
    type,
    site,
    workload,
    salary,
    endingDate,
    startingDate,
    userId
  ) => {
    if (startingDate === undefined || endingDate === undefined)
      toast.error('Os campos "Inicio" e "Fim" não podem estar vazio.')

    const response = await api.patch(`/vagas/${jobId}`, {
      description,
      scholarity,
      title,
      type,
      site,
      workload,
      salary,
      endingDate,
      startingDate,
      userId,
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  const deleteJob = async (id) => {
    const response = await api.delete(`/vagas/${id}`)

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  const applyToJob = async (jobId, userId) => {
    const response = await api.post('/vagas/aplicacao', {
      jobId,
      userId,
    })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }

    return response.data
  }

  return { createJob, updateJob, deleteJob, applyToJob }
}

export const useGetJobs = (pageNumber, itemsPerPage, filters) => {
  const [jobs, setJobs] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [count, setCount] = useState(0)

  const buildQuery = () => {
    const query = []
    query.push(`pageNumber=${pageNumber}`)
    query.push(`itemsPerPage=${itemsPerPage}`)
    Object.keys(filters).forEach((field) => {
      if (field === 'salary') {
        query.push(`min=${filters[field].min}`)
        query.push(`max=${filters[field].max}`)
      } else if (field === 'workload') {
        query.push(`chmin=${filters[field].min}`)
        query.push(`chmax=${filters[field].max}`)
      } else if (filters[field]) query.push(`${field}=${filters[field]}`)
    })
    return query.join('&')
  }

  useEffect(async () => {
    const response = await api.get(`/vagas?${buildQuery()}`)

    if (response.data.error && response.data.message) {
      toast.error(response.data.message)
      return
    }

    setJobs(response.data.rows)
    setCount(response.data.count)
    setTotalPages(Math.ceil(response.data.count / itemsPerPage))
  }, [pageNumber, itemsPerPage, filters])

  return { jobs, totalPages, count }
}
