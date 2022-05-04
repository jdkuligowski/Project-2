import React from 'react'

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <img src={require('../../images/hungry.gif')} alt="hungry skeleton gif"/>
    </div>
  )
}

export default PageNotFound