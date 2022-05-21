import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, SearchBox, SelectBox } from '../../../components/FormElements'
import { jobScholarities } from '../../../utils/constants/project'
import './style.css'

function Aside({
  onSubmitFilters,
  tagToRemove,
  onClearedFilter,
  onClearFilters,
}) {
  const [name, setName] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [languages, setLanguages] = useState('')
  const [knowledge, setKnowledge] = useState('')
  const [toSubmit, setToSubmit] = useState(false)

  const hasFilters = () => {
    return (
      name !== '' ||
      scholarity !== '' ||
      technologies !== '' ||
      languages !== '' ||
      knowledge !== ''
    )
  }

  const handleSubmitFilters = () => {
    const filters = {}

    if (name) filters.name = name
    if (scholarity) filters.scholarity = scholarity
    if (technologies) filters.technologies = technologies
    if (languages) filters.languages = languages
    if (knowledge) filters.knowledge = knowledge

    onSubmitFilters(filters)
  }

  useEffect(() => {
    if (tagToRemove === '') return

    if (tagToRemove === 'all') {
      setName('')
      setScholarity('')
      setTechnologies('')
      setLanguages('')
      setKnowledge('')

      onClearedFilter()
      return
    }

    if (tagToRemove === 'name') setName('')
    else if (tagToRemove === 'scholarity') setScholarity('')
    else if (tagToRemove === 'technologies') setTechnologies('')
    else if (tagToRemove === 'languages') setLanguages('')
    else if (tagToRemove === 'knowledge') setKnowledge('')

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
      <SearchBox
        inputName="name"
        placeholder="Pesquisar nome"
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <SelectBox
        selectName="scholarity"
        label="Escolaridade"
        initialOption="Selecionar escolaridade"
        value={scholarity}
        options={jobScholarities}
        onChange={(e) => setScholarity(e.target.value)}
      />

      <SearchBox
        inputName="technologies"
        placeholder="Pesquisar tecnologia"
        label="Tecnologia"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
      />

      <SearchBox
        inputName="languages"
        placeholder="Pesquisar idioma"
        label="Idioma"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
      />

      <SearchBox
        inputName="knowledge"
        placeholder="Pesquisar habilidade"
        label="Habilidade"
        value={knowledge}
        onChange={(e) => setKnowledge(e.target.value)}
      />

      <Button
        label="Aplicar Filtros"
        id="filters-submit"
        onClick={handleSubmitFilters}
        scheme="blue"
      />

      {hasFilters() && (
        <Button
          label="Limpar Filtros"
          id="btn-filters-clear"
          onClick={onClearFilters}
          scheme="blue"
        />
      )}
    </aside>
  )
}

Aside.propTypes = {
  onSubmitFilters: PropTypes.func,
  tagToRemove: PropTypes.string,
  onClearedFilter: PropTypes.func,
  onClearFilters: PropTypes.func,
}

Aside.defaultProps = {
  onSubmitFilters: () => {},
  tagToRemove: '',
  onClearedFilter: () => {},
  onClearFilters: () => {},
}

export default Aside
