/* eslint-disable func-names */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import Aside from '../../components/Aside'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import JobCard from '../../components/JobCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'

import api from '../../api'
import useAuth from '../../hooks/useAuth'
import './style.css'
import '../../components/Aside/style.css'

function JobList() {
  const [jobs, setJobs] = useState([])
  const { isAuthenticated } = useAuth()

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
    <Layout
      headerLeftChildren={[
        <div className="search-box">
          <input
            type="search"
            placeholder="Pesquisar vaga"
            name="job_locate"
            id="job-locate"
          />
          <button type="submit" id="search-box-submit">
            <span className="lnr lnr-magnifier" />
          </button>
        </div>,
      ]}
      headerRightChildren={[
        <ButtonRectangle
          key="btn-profile"
          label="Pesquisar Perfis"
          className="is-gray"
        />,
        isAuthenticated ? (
          <ButtonRectangle
            key="btn-jobs"
            label="Minhas Vagas"
            className="is-blue bottom-header-margin"
          />
        ) : null,
      ]}
    >
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
    </Layout>
  )
}

export default JobList
