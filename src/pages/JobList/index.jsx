/* eslint-disable func-names */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Aside from '../../components/Aside'
import JobCard from '../../components/JobCard'
import Pagination from '../../components/Pagination'
import api from '../../api'
import './style.css'

function JobList() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await api.get('/vagas').then((response) => {
        setJobs(response.data.rows)
      })
    }

    fetchData()
  }, [])

  const filterTags = () => {
    return (
      <ul className="filters">
        <li className="selected-filter">
          <span className="filter-label">Filtro</span>
          <a href="/">
            <span className="lnr lnr-cross" />
          </a>
        </li>
        <li className="selected-filter">
          <span className="filter-label">Filtro</span>
          <a href="/">
            <span className="lnr lnr-cross" />
          </a>
        </li>
        <li className="selected-filter">
          <span className="filter-label">Filtro</span>
          <a href="/">
            <span className="lnr lnr-cross" />
          </a>
        </li>
        <li className="selected-filter">
          <span className="filter-label">Filtro</span>
          <a href="/">
            <span className="lnr lnr-cross" />
          </a>
        </li>
      </ul>
    )
  }

  const handleSubmitFilters = (value) => {
    if (Object.keys(value).length > 0) {
      setJobs(value.rows)
    }
  }

  return (
    <>
      <Header />
      <section id="main">
        <div id="label">
          <span>Vagas (xx resultados)</span>
          <span>15 Vagas por página</span>
        </div>

        <div id="jobs-container">
          <Aside onSubmitFilters={handleSubmitFilters} />
          <div id="jobs">
            {filterTags()}
            <div className="wrap">
              {jobs.length > 0
                ? jobs.map((job) => <JobCard data={job} key={job.id} />)
                : false}
            </div>
            <Pagination />
          </div>
        </div>
      </section>
    </>
  )
}

export default JobList
