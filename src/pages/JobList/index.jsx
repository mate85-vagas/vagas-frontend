import React from 'react'
import Header from '../../components/Header'
import Aside from '../../components/Aside'
import JobCard from '../../components/JobCard'
import Pagination from '../../components/Pagination'
import './style.css'

function JobList() {
  return (
    <>
      <Header />
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
    </>
  )
}

export default JobList
