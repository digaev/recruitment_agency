import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import App from './modules/app'
import Home from './modules/home'
import { VacancyBox, Vacancy } from './modules/vacancies'
import VacancyForm from './modules/vacancy_form'
import EmployeeForm from './modules/employee_form'
import { EmployeeBox, Employee } from './modules/employees'

let store = createStore(
  combineReducers({
    form: formReducer
  })
);

render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />

          <Route path="/vacancies" component={VacancyBox} />
          <Route path="/vacancies/new" component={VacancyForm} />
          <Route path="/vacancies/:vacancyId" component={Vacancy} />

          <Route path="/employees" component={EmployeeBox} />
          <Route path="/employees/new" component={EmployeeForm} />
          <Route path="/employees/:employeeId" component={Employee} />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('app')
)
