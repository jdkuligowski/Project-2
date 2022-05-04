import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import PageNotFound from './utility/PageNotFound'
import Spinner from './utility/Spinner'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setErrors] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState([])
  const [filters, setFilters] = useState({
    searchTerm: ''
  })

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        console.log(data)
        setCategories(data.categories)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
      setLoading(false)
    }
    getCategories()
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
    if (categories.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = categories.filter(category => {
        return regexSearch.test(category.strCategory)
      })
      console.log('filtered', filtered)
      setFilteredCategories(filtered)
    }
  }, [filters, categories])


  return (
    <section className='category-container'>
      <h1>Categories</h1>
      <div className="filter-container">
        <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
      </div>
      <div className="category-content">
        {loading ? <Spinner />
          : error ? <p>error</p>
            : !categories ? <PageNotFound /> :
              filteredCategories.map(category => {
                const { strCategory, idCategory, strCategoryThumb } = category
                return (
                  <Link to={`/category/${strCategory}`} key={idCategory}>
                    <div className='category-tile'>
                      <div className='category-title'>{strCategory}</div>
                      <img src={strCategoryThumb} alt='category' />
                    </div>
                  </Link>
                )
              })}
      </div>
    </section>
  )
}


export default Categories