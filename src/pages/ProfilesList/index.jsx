/* eslint-disable no-unused-vars */
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
  const [searchedTerm, setSearchedTerm] = useState(null)
  const { profiles, getProfilesByQuery, count } = useGetProfiles(5)
  const totalPages = Math.ceil(count / 5)
  const [currentPage, setCurrentPage] = useState(1)

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

  return (
    <Layout
      headerLeftChildren={
        <SearchBox
          className="search-box"
          label=""
          placeholder="Pesquisar perfil por tecnologia"
          value={searchedTerm}
          onChange={(e) => setSearchedTerm(e.target.value)}
          onSearch={() => getProfilesByQuery(`&knowledge=${searchedTerm}`)}
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
                name={user.user.name}
                resume={user.linkResume}
                technologies={user.technologies}
              />
            ))}
          </div>

          {count / 5 > 1 ? (
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
