/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'

export const useGetJobById = (id) => {
  const [job, setJob] = useState()
  const [user, setUser] = useState()

  useEffect(async () => {
    if (!id) return
    const response = await api.get(`/vagas/${id}`)

    if (!response.data.job || !response.data.user) {
      toast.error(response.data.message)
      return
    }

    setJob(response.data.job)
    setUser(response.data.user)
  }, [id])

  return { job, user }
}

export const useJobRoutes = () => {
    const createJob = async (
      jobId,
      description,
      scholarity,
      title,
      type,
      site,
      workload,
      salary,
      endingDate,
      stardingDate
    ) => {
      if(stardingDate === undefined || endingDate === undefined)
      toast.error('Os campos "Incio" e "Fim" não podem estar vazio.')

      const response = await api.post(`/vagas`,{
        jobId,
        description,
        scholarity,
        title,
        type,
        site,
        workload,
        salary,
        endingDate,
        stardingDate
      })

      if(response.data.message){
        if(response.data.error) toast.error(response.data.message)
        else toast.success(response.data.message)
      }
    }
    const updateJob = async (
      id,
      jobId,
      description,
      scholarity,
      title,
      type,
      site,
      workload,
      salary,
      endingDate,
      stardingDate
    ) => {
      if(stardingDate === undefined || endingDate === undefined)
      toast.error('Os campos "Incio" e "Fim" não podem estar vazio.')

      const response= await api.patch(`/vagas/${id}`,{
        jobId,
        description,
        scholarity,
        title,
        type,
        site,
        workload,
        salary,
        endingDate,
        stardingDate,
      })

      if(response.data.message){
        if(response.data.error) toast.error(response.data.message)
        else toast.success(response.data.message)
      }
    }
    
    const deleteJob = async (id) => {
      const response = await api.delete(`/vagas/${id}`)
      if(response.data.message) toast.error(response.data.message)
    }
    return {createJob, updateJob, deleteJob}

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

    if (response.data.message) {
      toast.error(response.data.message)
      return
    }

    setJobs(response.data.rows)
    setCount(response.data.count)
    setTotalPages(Math.ceil(response.data.count / itemsPerPage))
  }, [pageNumber, itemsPerPage, filters])

  return { jobs, totalPages, count }
}
