/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function Pagination({ onPageChange, totalPages, pageNumber }) {
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) =>
      i +
      1 +
      (pageNumber > 3
        ? totalPages - pageNumber >= 3
          ? pageNumber - 3
          : totalPages - 5
        : 0)
  )

  return (
    <div id="pagination">
      {pageNumber > 1 && (
        <button
          className="page-number"
          type="button"
          onClick={() => onPageChange(pageNumber - 1)}
        >
          <i className="lnr lnr-chevron-left" />
        </button>
      )}
      {pages.map((page) => {
        if (page === pageNumber) {
          return (
            <span key={page} className="current-page">
              {page}
            </span>
          )
        }
        return (
          <button
            key={page}
            className="page-number"
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      })}
      {totalPages - pageNumber > 0 && (
        <button
          className="page-number"
          type="button"
          onClick={() => onPageChange(pageNumber + 1)}
        >
          <i className="lnr lnr-chevron-right" />
        </button>
      )}
    </div>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
}

Pagination.defaultProps = {}

export default Pagination
