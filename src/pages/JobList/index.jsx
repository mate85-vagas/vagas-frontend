import React from 'react'
import Aside from '../../components/Aside'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import JobCard from '../../components/JobCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import useAuth from '../../hooks/useAuth'
import './style.css'
import '../../components/Aside/style.css'

function JobList() {
  const { isAuthenticated } = useAuth()

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
          <Aside />
          <div id="jobs">
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
            <div className="wrap">
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </div>
            <Pagination />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default JobList
