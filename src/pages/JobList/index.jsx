import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Aside from './Aside'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import JobCard from '../../components/JobCard'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { useGetJobs } from '../../hooks/jobs'
import useAuth from '../../hooks/useAuth'
import './style.css'
import './Aside/style.css'
import { SearchBox, SelectBox } from '../../components/FormElements'
import {
  itemsPerPageNumbers,
  itemsPerPageOptions,
  jobFilterLabel,
  jobScholarityLabel,
} from '../../utils/constants/project'
import Text from '../../components/Text'

function JobList() {
  const isInitialMount = useRef(true)
  const { isAuthenticated } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageNumbers[0])
  const [filters, setFilters] = useState({})
  const [tagToRemove, setTagToRemove] = useState('')

  const [jobFilter, setJobFilter] = useState('')

  const { jobs, totalPages, count } = useGetJobs(
    pageNumber,
    itemsPerPage,
    filters
  )

  const formatTagValue = (field, value) => {
    if (field === 'salary' || field === 'workload')
      return `${value.min} - ${value.max}`
    if (field === 'createdAt') return new Date(value).toLocaleDateString()
    if (field === 'scholarity') return jobScholarityLabel[value]
    return value
  }

  const filterTags = () => {
    const filterKeys = Object.keys(filters).filter(
      (field) => field !== 'filter'
    )
    return (
      <ul
        className={`filters ${filterKeys.length > 0 ? 'filters-margin' : ''}`}
      >
        {filterKeys.map((field) => (
          <li key={field} className="selected-filter">
            <span className="filter-label">
              {jobFilterLabel[field]}: {formatTagValue(field, filters[field])}
            </span>
            <button type="button" onClick={() => setTagToRemove(field)}>
              <span className="lnr lnr-cross" />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const applyFilters = (newFilters) => {
    setPageNumber(1)
    setFilters((prevFilters) => ({ ...newFilters, filter: prevFilters.filter }))
  }

  const onClearedFilter = () => setTagToRemove('')

  const onSearchJobs = () => {
    setTagToRemove('all')
    setPageNumber(1)
    setFilters({ filter: jobFilter })
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else if (count === 0) toast.info('Não foram encontradas vagas!')
  }, [count])

  return (
    <Layout
      headerLeftChildren={
        <SearchBox
          className="search-box"
          label=""
          placeholder="Buscar vaga"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          onSearch={onSearchJobs}
          searchButton
        />
      }
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
          <span>Vagas ({count} resultados)</span>
          <span className="page-input-container">
            Exibir
            <SelectBox
              className="page-input"
              initialOption=""
              value={itemsPerPage}
              options={itemsPerPageOptions}
              onChange={(e) => setItemsPerPage(e.target.value)}
            />
          </span>
        </div>

        <div id="jobs-container">
          <Aside
            onSubmitFilters={applyFilters}
            tagToRemove={tagToRemove}
            onClearedFilter={onClearedFilter}
          />
          <div id="jobs">
            {filterTags()}
            <div className="wrap">
              {jobs.length > 0
                ? jobs.map((job) => <JobCard data={job} key={job.id} />)
                : false}
            </div>
            {count > 0 ? (
              <Pagination
                onPageChange={setPageNumber}
                pageNumber={pageNumber}
                totalPages={totalPages}
              />
            ) : (
              <div className="no-results-container">
                <Text
                  className="is-bold is-blue"
                  text="Não foram encontradas vagas"
                  size={24}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default JobList
