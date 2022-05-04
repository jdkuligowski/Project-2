import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const SiteNavbar = () => {

  const navigate = useNavigate()

  const getRandom = async () => {
    try {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      navigate(`/recipe/${data.meals[0].idMeal}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar bg="secondary" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">🍽</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to="/category">Categories</Nav.Link>
          <Nav.Link as={Link} to="/region">Cuisines</Nav.Link>
          <Nav.Link as={Link} to="/favorites">❤️</Nav.Link>
          <Nav.Link onClick={getRandom} className="btn random">Random</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNavbar