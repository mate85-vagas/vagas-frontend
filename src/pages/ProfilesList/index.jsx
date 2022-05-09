/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import './style.css'
import Layout from '../../components/Layout'
import { SearchBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'
import { useGetProfiles } from '../../hooks/profile'

function ProfilesList() {
  const itensPerPage = 5
  const [searchedTerm, setSearchedTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { profiles, getProfilesByQuery, count } = useGetProfiles(itensPerPage)
  const totalPages = Math.ceil(count / itensPerPage)

  function handleSubmitFilters(filters) {
    let newQuery = ''

    Object.entries(filters).forEach((filter) => {
      newQuery += `&${filter[0]}=${filter[1]}`
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
    getProfilesByQuery(`&technologies=${searchedTerm}`)
  }

  return (
    <Layout
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
            {profiles?.rows?.map((user) => (
              <ProfileCard
                key={user.id}
                id={user.id}
                name={user.user.name}
                resume={user.linkResume}
                technologies={user.technologies}
              />
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
