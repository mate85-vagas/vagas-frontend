import React from 'react'
import './style.css'

function Aside() {
  return (
    <aside>
      <h2>Filtros</h2>

      <form method="post">
        <span className="label">Salário</span>
        <input type="range" name="job_salary" id="job-salary" />

        <span className="label">Tipo</span>
        <select name="job_type" id="job-type">
          <option>Selecionar tipo de vaga</option>
          <option value="">Opção 1</option>
          <option value="">Opção 2</option>
        </select>

        <span className="label">Localidade</span>
        <div className="search-box">
          <input
            type="search"
            placeholder="Pesquisar localidade"
            name="job_locate"
            id="job-locate"
          />
          <button type="submit" id="search-box-submit">
            <span className="lnr lnr-magnifier" />
          </button>
        </div>

        <span className="label">Carga horária</span>
        <select name="job_hour" id="job-hour">
          <option>Selecinar carga horária</option>
          <option value="">Opção 1</option>
          <option value="">Opção 2</option>
        </select>

        <span className="label">Escolaridade</span>
        <select name="job_grad" id="job-grad">
          <option>Selecionar escolaridade</option>
          <option value="">Opção 1</option>
          <option value="">Opção 2</option>
        </select>

        <span className="label">Data de postagem</span>
        <input type="date" name="job_start_date" id="job-date" />

        <button type="submit" id="filters-submit">
          Aplicar Filtros
        </button>
      </form>
    </aside>
  )
}

export default Aside
