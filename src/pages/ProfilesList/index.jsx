/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { SearchBox, SelectBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'
import { useGetProfiles } from '../../hooks/profile'
import { sanitizeStringToSearch } from '../../utils/conversions'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'
import {
  itemsPerPageNumbers,
  itemsPerPageOptions,
  filterLabel,
  scholarityLabel,
} from '../../utils/constants/project'
import Tag from '../../components/Tag'
import useAuth from '../../hooks/useAuth'
import Text from '../../components/Text'

function ProfilesList() {
  const navigate = useNavigate()

  const isInitialMount = useRef(true)
  const { isAuthenticated } = useAuth()

  const [pageNumber, setPageNumber] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageNumbers[2])
  const [filters, setFilters] = useState({ filter: undefined })
  const [tagToRemove, setTagToRemove] = useState('')

  const [profileFilter, setProfileFilter] = useState('')

  const { profiles, totalPages, count } = useGetProfiles(
    pageNumber,
    itemsPerPage,
    filters
  )

  const formatTagValue = (field, value) => {
    if (field === 'scholarity') return scholarityLabel[value]
    return value
  }

  const filterTags = () => {
    const filterKeys = Object.keys(filters).filter(
      (field) => field !== 'filter'
    )
    return (
      <ul className="filters filter-tags">
        {filterKeys.map((field) => (
          <Tag
            key={field}
            label={`${filterLabel[field]}: ${formatTagValue(
              field,
              filters[field]
            )}`}
            onRemove={() => setTagToRemove(field)}
          />
        ))}
      </ul>
    )
  }

  const applyFilters = (newFilters) => {
    setPageNumber(1)
    setFilters((prevFilters) => ({ ...newFilters, filter: prevFilters.filter }))
  }

  const onClearedFilter = () => setTagToRemove('')

  const clearFilters = () => {
    setTagToRemove('all')
    setPageNumber(1)
    setFilters((prevFilters) => ({
      filter: prevFilters.filter,
    }))
  }

  const onSearchProfiles = () => {
    setTagToRemove('all')
    setPageNumber(1)
    setFilters({ filter: sanitizeStringToSearch(profileFilter) })
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else if (count === 0) toast.info('Não foram encontrados perfis!')
  }, [count])

  return (
    <Layout
      superHeaderChildren={
        <ButtonRectangle
          key="btn-profile"
          label="Pesquisar Vagas"
          onClick={() => navigate('/')}
          className="is-blue header-button"
        />
      }
      headerLeftChildren={
        <SearchBox
          className="search-box"
          label=""
          placeholder="Pesquisar perfil por tecnologia"
          value={profileFilter}
          onChange={(e) => setProfileFilter(e.target.value)}
          onSearch={onSearchProfiles}
          searchButton
        />
      }
    >
      <section id="main">
        <div id="profiles-container">
          <Aside
            onSubmitFilters={applyFilters}
            tagToRemove={tagToRemove}
            onClearedFilter={onClearedFilter}
            onClearFilters={clearFilters}
          />

          <div className="right-container">
            <div id="label">
              <span>Perfis ({count} resultados)</span>
              <span className="page-input-container">
                Exibir
                <SelectBox
                  className="page-input"
                  initialOption=""
                  value={itemsPerPage}
                  options={itemsPerPageOptions}
                  onChange={(e) => {
                    setItemsPerPage(e.target.value)
                    setPageNumber(1)
                  }}
                />
              </span>
            </div>

            {filterTags()}

            <div id="profiles">
              {profiles?.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {count > 0 ? (
              <Pagination
                onPageChange={setPageNumber}
                pageNumber={pageNumber}
                totalPages={totalPages}
              />
            ) : (
              <div className="no-results-container">
                <Text
                  className="is-bold is-blue"
                  text="Não foram encontrados perfis"
                  size={24}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProfilesList
