/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import './style.css'
import Layout from '../../components/Layout'
import { SearchBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'
import { useGetProfiles } from '../../hooks/profile'

function ProfilesList() {
  const { profiles, getProfilesByQuery } = useGetProfiles(5)

  function handleSubmitFilters(filters) {
    let newQuery = ''

    Object.entries(filters).forEach((filter) => {
      newQuery += `&${filter[0]}=${filter[1]}`
    })

    getProfilesByQuery(newQuery)
  }

  function handlePaginate() {}

  return (
    <Layout
      headerLeftChildren={
        <SearchBox
          className="search-box"
          label=""
          placeholder="Buscar vaga"
          // value={jobFilter}
          // onChange={(e) => setJobFilter(e.target.value)}
          // onSearch={onSearchJobs}
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
                knowledge={user.knowledge}
              />
            ))}
          </div>

          <Pagination onPageChange={handlePaginate} />
        </div>
      </section>
    </Layout>
  )
}

export default ProfilesList
