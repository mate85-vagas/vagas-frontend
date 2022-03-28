/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { SearchBox, SelectBox, DateBox, Button } from '../FormElements'
import api from '../../api'
import './style.css'

function Aside({ onSubmitFilters }) {
  const [jobType, setJobType] = useState(null)
  const [jobSite, setJobSite] = useState(null)
  const [jobWorkload, setJobWorkload] = useState(null)
  const [jobScholarity, setJobScholarity] = useState(null)
  const [jobStartDate, setJobStartDate] = useState(null)
  const [jobMinSalary, setJobMinSalary] = useState(0)
  const [jobMaxSalary, setJobMaxSalary] = useState(0)
  const [hasFilters, setHasFilters] = useState(false)
  const [filterQuery, setFilterQuery] = useState('/vagas?')
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    if (hasFilters) {
      const fetchData = async () => {
        await api.get(filterQuery).then((response) => {
          setFilteredJobs(response.data)
        })
      }

      fetchData()
    }
  }, [filterQuery])

  useEffect(() => {
    onSubmitFilters(filteredJobs)
  }, [filteredJobs])

  const jobTypes = [
    {
      id: 0,
      value: 'estagio',
      label: 'Estágio',
    },
    {
      id: 1,
      value: 'trabalho',
      label: 'Trabalho',
    },
    {
      id: 2,
      value: 'extensao',
      label: 'Extensão',
    },
    {
      id: 3,
      value: 'complementar',
      label: 'CH Complementar',
    },
    {
      id: 4,
      value: 'pesquisa',
      label: 'Pesquisa',
    },
    {
      id: 5,
      value: 'outro',
      label: 'Outro',
    },
  ]
  const jobScholarities = [
    {
      id: 0,
      value: 'supinc',
      label: 'Superior Incompleto',
    },
    {
      id: 1,
      value: 'supc',
      label: 'Superior Completo',
    },
    {
      id: 2,
      value: 'posgrad',
      label: 'Pós-Graduação',
    },
  ]
  const jobWorkloads = [
    {
      id: 0,
      value: '10',
      label: '10 Horas',
    },
    {
      id: 1,
      value: '15',
      label: '15 Horas',
    },
    {
      id: 2,
      value: '20',
      label: '20 Horas',
    },
    {
      id: 3,
      value: '30',
      label: '30 Horas',
    },
    {
      id: 4,
      value: '40',
      label: '40 Horas',
    },
    {
      id: 5,
      value: '44',
      label: '44 Horas',
    },
  ]

  const handleSubmitFilters = () => {
    const filters = {}

    if (jobType) filters.type = jobType
    if (jobWorkload) filters.workload = jobWorkload
    if (jobScholarity) filters.scholarity = jobScholarity
    if (jobStartDate) filters.createdAt = jobStartDate
    if (jobSite) filters.site = jobSite
    if (jobMinSalary) filters.min = jobMinSalary
    if (jobMaxSalary) filters.max = jobMaxSalary

    if (Object.keys(filters).length > 0) {
      setFilterQuery('/vagas?')
      Object.keys(filters).forEach((key, index) => {
        setFilterQuery((state) => {
          if (index === 0) {
            return `${state}${key}=${filters[key]}`
          }
          return `${state}&${key}=${filters[key]}`
        })
      })
      console.log(filterQuery)
      setHasFilters(true)
    }
  }

  const handleSalaryChange = (value) => {
    setJobMinSalary(value[0])
    setJobMaxSalary(value[1])
  }

  return (
    <aside>
      <h2>Filtros</h2>

      <div id="filters-form">
        <Slider
          range
          min={300}
          max={30000}
          count
          startPoint={300}
          step={10}
          onChange={handleSalaryChange}
        />
        <span className="job-salary-value">
          {jobMinSalary} &mdash; {jobMaxSalary}
        </span>

        <SelectBox
          selectName="type"
          selectId="job-type"
          label="Tipo"
          initialOption="Selecionar tipo"
          options={jobTypes}
          onChange={(e) => setJobType(e.target.value)}
        />

        <SearchBox
          label="Localidade"
          placeholder="Pesquisar localidade"
          inputName="site"
          inputId="job-locate"
          onChange={(e) => setJobSite(e.target.value)}
        />

        <SelectBox
          selectName="workload"
          selectId="job-hour"
          label="Carga horária"
          initialOption="Selecionar carga"
          options={jobWorkloads}
          onChange={(e) => setJobWorkload(e.target.value)}
        />

        <SelectBox
          selectName="scholarity"
          selectId="job-scholarity"
          label="Escolaridade"
          initialOption="Selecionar escolaridade"
          options={jobScholarities}
          onChange={(e) => setJobScholarity(e.target.value)}
        />

        <DateBox
          label="Selecionar data inicial"
          name="startingDate"
          onChange={(e) => setJobStartDate(e.target.value)}
        />

        <Button
          label="Aplicar filtros"
          id="filters-submit"
          onClick={handleSubmitFilters}
          scheme="blue"
        />
      </div>
    </aside>
  )
}

export default Aside
