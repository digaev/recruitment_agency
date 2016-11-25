import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from './navlink';

function App(props) {
  return (
    <div>
      <nav className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
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
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
