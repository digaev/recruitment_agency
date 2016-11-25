import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import App from './modules/app';
import Home from './modules/home';
import store from './modules/store';

import { EmployeeBox, EmployeeForm, Employee } from './modules/employees';
import { VacancyBox, VacancyForm, Vacancy } from './modules/vacancies';

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
), document.getElementById('app'));
