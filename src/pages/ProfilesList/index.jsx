/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import { SearchBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'
import { useGetProfiles } from '../../hooks/profile'
import { sanitizeStringToSearch } from '../../utils/conversions'
import ButtonRectangle from '../../components/Buttons/ButtonRectangle'

function ProfilesList() {
  const navigate = useNavigate()

  const itensPerPage = 5
  const [searchedTerm, setSearchedTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { profiles, getProfilesByQuery, count } = useGetProfiles(itensPerPage)
  const totalPages = Math.ceil(count / itensPerPage)

  function handleSubmitFilters(filters) {
    let newQuery = ''

    Object.entries(filters).forEach((filter) => {
      const sanitizedValue = sanitizeStringToSearch(filter[1])
      if (!sanitizedValue) return
      newQuery += `&${filter[0]}=${sanitizedValue}`
    })

    getProfilesByQuery(newQuery)
  }

  function handlePaginate() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      getProfilesByQuery(`&pageNumber=${currentPage + 1}`)
    } else {
      setCurrentPage(1)
      getProfilesByQuery(`&pageNumber=1`)
    }
  }

  function handleHeaderSearch() {
    getProfilesByQuery(`&technologies=${sanitizeStringToSearch(searchedTerm)}`)
  }

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
          value={searchedTerm}
          onChange={(e) => setSearchedTerm(e.target.value)}
          onSearch={handleHeaderSearch}
          searchButton
        />
      }
    >
      <section id="profiles-container">
        <Aside handleSubmitFilters={handleSubmitFilters} />

        <div className="right-container">
          <div id="profiles">
            {profiles?.rows?.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>

          {count / itensPerPage > 1 ? (
            <Pagination
              onPageChange={handlePaginate}
              totalPages={totalPages}
              pageNumber={currentPage}
            />
          ) : (
            false
          )}
        </div>
      </section>
    </Layout>
  )
}

export default ProfilesList
