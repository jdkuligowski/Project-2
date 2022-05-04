import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import PageNotFound from './utility/PageNotFound'

const Regions = () => {

  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setErrors] = useState(false)
  const [filteredRegions, setFilteredRegions] = useState([])
  const [filters, setFilters] = useState({
    searchTerm: ''
  })

  useEffect(() => {

    const getRegions = async () => {
      try {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        console.log(data)
        setRegions(data.meals)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
      setLoading(false)
    }
    getRegions()
  }, [])


  const handleChange = (e) => {
    const updatedObj = {
      ...filters,
      [e.target.name]: e.target.value
    }
    setFilters(updatedObj)
    console.log(updatedObj)
  }

  useEffect(() => {
    if (regions.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = regions.filter(country => {
        return regexSearch.test(country.strArea)
      })
      console.log('filtered', filtered)
      setFilteredRegions(filtered)
    }
  }, [filters, regions])

  return (
    <section className='region-container'>
      <h1>Cuisines</h1>
      <div className="filter-container">
        <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
      </div>
      <div className="region-detail">
        {loading ? <p>loading</p>
          : error ? <p>error</p>
            : !regions ? <PageNotFound /> :
              filteredRegions.map((region, index) => {
                const { strArea } = region
                return (
                  <Link to={`/region/${strArea}`} key={index}>
                    <div className='region-tile'>
                      <div className='area-title'>{strArea}</div>
                      <div className='flag-container' id={strArea}>
                      </div>
                    </div>
                  </Link>
                )
              })}
      </div>
    </section>
  )
}

export default Regions