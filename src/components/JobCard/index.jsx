import React from 'react'
import './style.css'

function JobCard() {
  return (
    <div className="job">
      <h2>
        Nome da Vaga
        <sub>Local de trabalho</sub>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt adipisci,
        laudantium eius aut voluptates deserunt hic nemo tempore iure harum,
        harum, eveniet dolor consectetur minus molestiae recusandae, architecto
        blanditiis impedit.
      </p>
      <span className="due-date">Expira em: 09/04/2022</span>
      <a href="/" className="see-details">
        Ver mais detalhes
      </a>
    </div>
  )
}

export default JobCard
