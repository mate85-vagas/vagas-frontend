/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import 'rc-slider/assets/index.css'
import { jobTypes, jobScholarities } from '../../../utils/constants/project'
import {
  SearchBox,
  SelectBox,
  DateBox,
  Button,
} from '../../../components/FormElements'
import './style.css'
import SliderInput from '../../../components/SliderInput'

function Aside({ onSubmitFilters, tagToRemove, onClearedFilter }) {
  const [jobType, setJobType] = useState(null)
  const [jobSite, setJobSite] = useState(null)
  const [jobScholarity, setJobScholarity] = useState(null)
  const [jobStartDate, setJobStartDate] = useState(null)
  const [jobMinWorkload, setJobMinWorkload] = useState(0)
  const [jobMaxWorkload, setJobMaxWorkload] = useState(0)
  const [jobMinSalary, setJobMinSalary] = useState(0)
  const [jobMaxSalary, setJobMaxSalary] = useState(0)
  const [toSubmit, setToSubmit] = useState(false)

  const handleSubmitFilters = () => {
    const filters = {}

    if (jobType) filters.type = jobType
    if (jobScholarity) filters.scholarity = jobScholarity
    if (jobStartDate) filters.createdAt = jobStartDate
    if (jobSite) filters.site = jobSite
    if (jobMinWorkload || jobMaxWorkload) {
      filters.workload = {
        min: jobMinWorkload,
        max: jobMaxWorkload,
      }
    }
    if (jobMinSalary || jobMaxSalary) {
      filters.salary = {
        min: jobMinSalary,
        max: jobMaxSalary,
      }
    }

    onSubmitFilters(filters)
  }

  const handleSalaryChange = (value) => {
    setJobMinSalary(value[0])
    setJobMaxSalary(value[1])
  }

  const handleWorkloadChange = (value) => {
    setJobMinWorkload(value[0])
    setJobMaxWorkload(value[1])
  }

  useEffect(() => {
    if (tagToRemove === '') return

    if (tagToRemove === 'all') {
      setJobType('')
      setJobScholarity('')
      setJobStartDate('')
      setJobSite('')
      setJobMaxWorkload(0)
      setJobMinWorkload(0)
      setJobMaxSalary(0)
      setJobMinSalary(0)

      return
    }

    if (tagToRemove === 'type') setJobType('')
    else if (tagToRemove === 'scholarity') setJobScholarity('')
    else if (tagToRemove === 'createdAt') setJobStartDate('')
    else if (tagToRemove === 'site') setJobSite('')
    else if (tagToRemove === 'workload') {
      setJobMaxWorkload(0)
      setJobMinWorkload(0)
    } else if (tagToRemove === 'salary') {
      setJobMaxSalary(0)
      setJobMinSalary(0)
    }

    setToSubmit(true)
  }, [tagToRemove])

  useEffect(() => {
    if (!toSubmit) return
    handleSubmitFilters()
    setToSubmit(false)
    onClearedFilter()
  }, [toSubmit])

  return (
    <aside>
      <h2>Filtros</h2>

      <div id="filters-form">
        <SliderInput
          label="Salário"
          min={300}
          max={30000}
          startPoint={300}
          step={10}
          onChange={handleSalaryChange}
          minValue={jobMinSalary}
          maxValue={jobMaxSalary}
        />

        <SelectBox
          selectName="type"
          selectId="job-type"
          label="Tipo"
          initialOption="Selecionar tipo"
          value={jobType}
          options={jobTypes}
          onChange={(e) => setJobType(e.target.value)}
        />

        <SearchBox
          label="Localidade"
          placeholder="Pesquisar localidade"
          inputName="site"
          inputId="job-locate"
          value={jobSite}
          onChange={(e) => setJobSite(e.target.value)}
        />

        <SliderInput
          label="Carga horária"
          min={0}
          max={60}
          startPoint={0}
          step={5}
          onChange={handleWorkloadChange}
          minValue={jobMinWorkload}
          maxValue={jobMaxWorkload}
        />

        <SelectBox
          selectName="scholarity"
          selectId="job-scholarity"
          label="Escolaridade"
          initialOption="Selecionar escolaridade"
          value={jobScholarity}
          options={jobScholarities}
          onChange={(e) => setJobScholarity(e.target.value)}
        />

        <DateBox
          label="Selecionar data inicial"
          name="startingDate"
          onChange={(e) => setJobStartDate(e.target.value)}
          value={jobStartDate}
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
