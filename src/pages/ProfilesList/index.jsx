import React from 'react'
import './style.css'
import Layout from '../../components/Layout'
import { SearchBox } from '../../components/FormElements'
import Aside from './Aside'
import Pagination from '../../components/Pagination'
import ProfileCard from './ProfileCard'

function ProfilesList() {
  const pseudoUser = [
    { id: 0, name: 'Carolaine Vieira', resume: 'fb.com' },
    { id: 1, name: 'Natan Moura', resume: '/' },
    { id: 2, name: 'Victor Pinheiro', resume: '/' },
  ]

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
            {pseudoUser.map((user) => (
              <ProfileCard
                key={user.id}
                name={user.name}
                resume={user.resume}
              />
            ))}
          </div>

          <Pagination />
        </div>
      </section>
    </Layout>
  )
}

export default ProfilesList
