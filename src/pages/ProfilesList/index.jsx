import React from 'react'
import './style.css'
import Layout from '../../components/Layout'
import { SearchBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'

function ProfilesList() {
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
        <Aside />

        <div className="right-container">
          <div id="profiles">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>

          <Pagination />
        </div>
      </section>
    </Layout>
  )
}

export default ProfilesList
