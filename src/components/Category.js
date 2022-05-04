import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import PageNotFound from './utility/PageNotFound'
import Spinner from './utility/Spinner'

const Category = () => {

  const { categoryID } = useParams()
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filteredDishes, setFilteredDishes] = useState([])
  const [filters, setFilters] = useState({
    searchTerm: ''
  })


  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryID}`)
        setCategory(data.meals)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }
    getCategory()
  }, [categoryID])

  const handleChange = (e) => {
    const updatedObj = {
      ...filters,
      [e.target.name]: e.target.value
    }
    setFilters(updatedObj)
    console.log(updatedObj)
  }

  useEffect(() => {
    if (category.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = category.filter(dish => {
        return regexSearch.test(dish.strMeal)
      })
      console.log('filtered', filtered)
      setFilteredDishes(filtered)
    }
  }, [filters, category])


  return (
    <section className="cat-container">
      <h1>{categoryID}</h1>
      <div className="filter-container">
        <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
      </div>
      <div className='cat-detail-grid'>
        {loading ? <Spinner />
          : error ? <p>error</p>
            : !category ? <PageNotFound /> :
              filteredDishes.map(dish => {
                const { idMeal: id, strMeal: name, strMealThumb: img } = dish
                return (
                  <Link to={`/recipe/${id}`} key={id}>
                    <div className='cat-detail-card'>
                      <div className='cat-title'>{name}</div>
                      <img src={img} alt={name} />
                    </div>
                  </Link>
                )
              })}
      </div>
    </section>
  )
}

export default Category