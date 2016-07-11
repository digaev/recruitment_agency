import React from 'react'
import { render } from 'react-dom'
import NavLink from './navlink'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div style={{paddingTop: '80px'}}>
        <nav className="navbar navbar-fixed-top navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand" >Company</Link>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/vacancies">Вакансии</NavLink>
                <NavLink to="/employees">Работники</NavLink>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
})
