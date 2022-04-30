/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, SearchBox, SelectBox } from '../../../components/FormElements'
import { jobScholarities } from '../../../utils/constants/project'
import './style.css'

function Aside() {
  const [name, setName] = useState('')
  const [scholarity, setScholarity] = useState('')
  const [languages, setLanguages] = useState('')
  const [habilities, setHabilities] = useState('')

  return (
    <aside>
      <SearchBox
        inputName="name"
        placeholder="Pesquisar nome"
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <SelectBox
        options={jobScholarities}
        selectName="scholarity"
        label="Escolaridade"
        initialOption="Selecionar escolaridade"
        onChange={(e) => setScholarity(e.target.value)}
      />

      <SearchBox
        inputName="skills"
        placeholder="Pesquisar tecnologia"
        label="Tecnologias"
      />

      <SearchBox
        inputName="languages"
        onChange={(e) => setLanguages(e.target.value)}
        placeholder="Pesquisar idioma"
        label="Idiomas"
      />

      <SearchBox
        inputName="habilities"
        onChange={(e) => setHabilities(e.target.value)}
        placeholder="Pesquisar habilidade"
        label="Habilidades"
      />

      <Button
        label="Aplicar filtros"
        id="filters-submit"
        // onClick={handleSubmitFilters}
        scheme="blue"
      />
    </aside>
  )
}

export default Aside
