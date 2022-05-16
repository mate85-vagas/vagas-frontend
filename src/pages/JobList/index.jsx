import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
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
  filterLabel,
  scholarityLabel,
} from '../../utils/constants/project'
import Text from '../../components/Text'
import Tag from '../../components/Tag'
import { localDate, sanitizeStringToSearch } from '../../utils/conversions'

// Component that renders the main page. It contains the job list, a filter, and a
// search bar. Here, the user can go to the login, profile and their jobs list pages
function JobList() {
  const navigate = useNavigate()

  const isInitialMount = useRef(true)
  const { isAuthenticated } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageNumbers[2])
  const [filters, setFilters] = useState({ filter: undefined })
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
    if (field === 'createdAt') return localDate(value)
    if (field === 'scholarity') return scholarityLabel[value]
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
          <Tag
            key={field}
            label={`${filterLabel[field]}: ${formatTagValue(
              field,
              filters[field]
            )}`}
            onRemove={() => setTagToRemove(field)}
          />
        ))}
      </ul>
    )
  }

  const applyFilters = (newFilters) => {
    setPageNumber(1)
    setFilters((prevFilters) => ({ ...newFilters, filter: prevFilters.filter }))
  }

  const onClearedFilter = () => setTagToRemove('')

  const clearFilters = () => {
    setTagToRemove('all')
    setPageNumber(1)
    setFilters((prevFilters) => ({
      filter: prevFilters.filter,
    }))
  }

  const onSearchJobs = () => {
    setTagToRemove('all')
    setPageNumber(1)
    setFilters({ filter: sanitizeStringToSearch(jobFilter) })
  }

  const createJob = () => {
    if (isAuthenticated) navigate('/formulariovaga/criar')
    else navigate('/login?criarvaga=1')
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else if (count === 0) toast.info('Não foram encontradas vagas!')
  }, [count])

  return (
    <Layout
      superHeaderChildren={[
        <ButtonRectangle
          key="btn-add-job"
          label="Cadastrar Vaga"
          onClick={createJob}
          className="is-blue header-button"
        />,
        <ButtonRectangle
          key="btn-profile"
          label="Pesquisar Perfis"
          onClick={() => navigate('/perfis')}
          className="is-blue header-button"
        />,
        isAuthenticated ? (
          <ButtonRectangle
            key="btn-jobs"
            label="Minhas Vagas"
            className="is-blue header-button"
            onClick={() => navigate('/minhasvagas')}
          />
        ) : null,
      ]}
      headerLeftChildren={
        <SearchBox
          className="main-search-box"
          label=""
          placeholder="Buscar vaga"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          onSearch={onSearchJobs}
          searchButton
        />
      }
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
            onClearFilters={clearFilters}
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
