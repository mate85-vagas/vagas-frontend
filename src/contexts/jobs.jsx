/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useMemo, useState } from 'react'
import api from '../api'

const JobsContext = createContext({})

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [isFetching, setFetching] = useState(false)

  const getJobById = useCallback(async (id) => {
    setFetching(true)

    const response = await api.get(`vagas/${id}`)

    const job = response.data

    setFetching(false)
  }, [])

  const jobsList = useMemo(() => jobs, [jobs])

  return (
    <JobsContext.Provider value={{ isFetching, jobsList, getJobById }}>
      {children}
    </JobsContext.Provider>
  )
}

export default JobsContext
