import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const Home = () => {

  const [random, setRandom] = useState(null)

  useEffect(() => {
    const getRandom = async () => {
      try {
        const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        setRandom(data.meals[0].idMeal)
      } catch (error) {
        console.log(error)
      }
    }
    getRandom()
  }, [])

  return (
    <section className='home-container'>
      <h1>RecipeFinder</h1>
      <h5>Search from over 200 recipes from 14 different countries.</h5>
      <section className='home-content'>
        <Link to="/category">
          <div className="categories">
            <h2>Category</h2>
            <p>(Vegan, Chicken, Pork etc.)</p>
          </div>
        </Link>
        <p>or</p>
        <Link to="/region">
          <div className="region">
            <h2>Cuisine</h2>
            <p>(Italian, Indian, Chinese etc.)</p>
          </div>
        </Link>
      </section>
      <section className='home-random'>
        <Link to={`/recipe/${random}`}>
          <button className='btn btn-primary btn-random'>
            Can't decide?
          </button>
        </Link>
      </section>
    </section>
  )
}

export default Home