import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div className="jumbotron text-center">
        <h1>Recruitment Agency</h1>
        <div className="btn btn-group btn-group-lg">
          <Link className="btn btn-default" to="/vacancies">Вакансии</Link>
          <Link className="btn btn-default" to="/employees">Работники</Link>
        </div>
      </div>
    )
  }
})
