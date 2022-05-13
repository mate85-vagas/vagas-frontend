/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, SearchBox, SelectBox } from '../../../components/FormElements'
import { jobScholarities } from '../../../utils/constants/project'
import './style.css'

function Aside({ handleSubmitFilters }) {
  const [filterQuery, setFilterQuery] = useState({})
  const [name, setName] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [languages, setLanguages] = useState('')
  const [knowledge, setKnowledge] = useState('')

  const clearFilters = () => {
    setName('')
    setScholarity('')
    setTechnologies('')
    setLanguages('')
    setKnowledge('')
    setFilterQuery({})
    handleSubmitFilters({})
  }

  const hasFilters = () => {
    return (
      name !== '' ||
      scholarity !== '' ||
      technologies !== '' ||
      languages !== '' ||
      knowledge !== ''
    )
  }

  return (
    <aside>
      <h2>Filtros</h2>
      <SearchBox
        inputName="name"
        placeholder="Pesquisar nome"
        label="Nome"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setFilterQuery((state) => {
            return { ...state, name: e.target.value }
          })
        }}
      />

      <SelectBox
        options={jobScholarities}
        selectName="scholarity"
        label="Escolaridade"
        initialOption="Selecionar escolaridade"
        value={scholarity}
        onChange={(e) => {
          setScholarity(e.target.value)
          setFilterQuery((state) => {
            return { ...state, scholarity: e.target.value }
          })
        }}
      />

      <SearchBox
        inputName="technologies"
        placeholder="Pesquisar tecnologia"
        label="Tecnologias"
        value={technologies}
        onChange={(e) => {
          setTechnologies(e.target.value)
          setFilterQuery((state) => {
            return { ...state, technologies: e.target.value }
          })
        }}
      />

      <SearchBox
        inputName="languages"
        placeholder="Pesquisar idioma"
        label="Idiomas"
        value={languages}
        onChange={(e) => {
          setLanguages(e.target.value)
          setFilterQuery((state) => {
            return { ...state, languages: e.target.value }
          })
        }}
      />

      <SearchBox
        inputName="knowledge"
        placeholder="Pesquisar habilidade"
        label="Habilidades"
        value={knowledge}
        onChange={(e) => {
          setKnowledge(e.target.value)
          setFilterQuery((state) => {
            return { ...state, knowledge: e.target.value }
          })
        }}
      />

      <Button
        label="Aplicar Filtros"
        id="filters-submit"
        onClick={() => handleSubmitFilters(filterQuery)}
        scheme="blue"
      />

      {hasFilters() && (
        <Button
          label="Limpar Filtros"
          id="btn-filters-clear"
          onClick={clearFilters}
          scheme="blue"
        />
      )}
    </aside>
  )
}

Aside.propTypes = {
  handleSubmitFilters: PropTypes.func,
}

Aside.defaultProps = {
  handleSubmitFilters: null,
}

export default Aside
