import React from 'react'
import './style.css'

function Pagination() {
  return (
    <div id="pagination">
      <a href="/" className="page-number">
        <i className="lnr lnr-chevron-left" />
      </a>
      <a href="/" className="page-number">
        1
      </a>
      <a href="/" className="page-number">
        2
      </a>
      <span className="current-page">3</span>
      <a href="/" className="page-number">
        4
      </a>
      <a href="/" className="page-number">
        5
      </a>
      <a href="/" className="page-number">
        <i className="lnr lnr-chevron-right" />
      </a>
    </div>
  )
}

export default Pagination
