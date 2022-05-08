import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, SearchBox, SelectBox } from '../../../components/FormElements'
import { jobScholarities } from '../../../utils/constants/project'
import './style.css'

function Aside({ handleSubmitFilters }) {
  const [filterQuery, setFilterQuery] = useState({})

  return (
    <aside>
      <SearchBox
        inputName="name"
        placeholder="Pesquisar nome"
        label="Nome"
        onChange={(e) =>
          setFilterQuery((state) => {
            return { ...state, name: e.target.value }
          })
        }
      />

      <SelectBox
        options={jobScholarities}
        selectName="scholarity"
        label="Escolaridade"
        initialOption="Selecionar escolaridade"
        onChange={(e) =>
          setFilterQuery((state) => {
            return { ...state, scholarity: e.target.value }
          })
        }
      />

      <SearchBox
        inputName="technologies"
        placeholder="Pesquisar tecnologia"
        label="Tecnologias"
        onChange={(e) =>
          setFilterQuery((state) => {
            return { ...state, technologies: e.target.value }
          })
        }
      />

      <SearchBox
        inputName="languages"
        placeholder="Pesquisar idioma"
        label="Idiomas"
        onChange={(e) =>
          setFilterQuery((state) => {
            return { ...state, languages: e.target.value }
          })
        }
      />

      <SearchBox
        inputName="knowledge"
        placeholder="Pesquisar habilidade"
        label="Habilidades"
        onChange={(e) =>
          setFilterQuery((state) => {
            return { ...state, knowledge: e.target.value }
          })
        }
      />

      <Button
        label="Aplicar filtros"
        id="filters-submit"
        onClick={() => handleSubmitFilters(filterQuery)}
        scheme="blue"
      />
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
