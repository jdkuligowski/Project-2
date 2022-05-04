import React, { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import PageNotFound from './utility/PageNotFound'

const Region = () => {

  const { regionID } = useParams()
  const [ region, setRegion ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const [ filteredRegion, setFilteredRegion ] = useState([])
  const [filters, setFilters ] = useState ({
    searchTerm: ''
  })

  useEffect(() => {
    const getRegion = async () => {
      try {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${regionID}`)
        setRegion(data.meals)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }
    getRegion()
  }, [regionID])

  const handleChange = (e) => {
    const updatedObj = {
      ...filters,
      [e.target.name]: e.target.value
    }
    setFilters(updatedObj)
    console.log(updatedObj)
  }

  useEffect(() => {
    if (region.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = region.filter(country => {
        return regexSearch.test(country.strMeal)
      })
      console.log('filtered',filtered)
      setFilteredRegion(filtered)
    }
  }, [filters, region])


  return (
    <section className="region-container">
      <h1>{regionID}</h1>
      <div className="filter-container">
        <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
      </div>
      <div className ="region-detail">
        {loading ? <p>loading</p> 
        : error ? <p>error</p> 
        : !region ? <PageNotFound /> :
        filteredRegion.map(dish => {
          const { idMeal: id, strMeal: name, strMealThumb: img } = dish
          return (
            <Link to={`/recipe/${id}`} key={id}>
              <div className = 'region-tile'>
                <div className = 'area-title'>{name}</div>
                <img src={img} alt ={name}/>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Region