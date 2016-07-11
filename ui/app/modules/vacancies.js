import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { Grid, EmployeeInfo, VacancyInfo } from './grid'


const VacancyBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    const url = 'http://localhost:3000/vacancies';

    axios.get(url).then((response) => {
      this.setState({ data: response.data });
    }).catch((error) => {
      console.error(error);
    })
  },

  render() {
    const info = this.state.data.map((vacancy) => {
      return (
        <div>
          <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
          <VacancyInfo data={vacancy} />
        </div>
      )
    });

    return (
      <div className="row">
        <h1>Вакансии</h1>
        <hr />
        <div className="text-center">
          <Link to="/vacancies/new" className="btn btn-primary btn-lg">
            Добавить вакансию
          </Link>
        </div>
        <hr />
        <Grid data={info} cols="3" />
      </div>
    )
  }
});

const Vacancy = React.createClass({
  getInitialState: () => {
    return { data: {} }
  },

  componentDidMount: function() {
    const url = 'http://localhost:3000/vacancies/' + this.props.params.vacancyId;

    axios.get(url).then((response) => {
      this.setState({ data: response.data })
    }).catch((error) => {
      console.error(error);
    })
  },

  render() {
    // FIXME
    if (!this.state.data.id) {
      return <div />
    }

    const matched = this.state.data.employees.matched.map((employee) => {
      return (
        <div>
          <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
          <EmployeeInfo data={employee} />
        </div>
      )
    });

    const others = this.state.data.employees.others.map((employee) => {
      return (
        <div>
          <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
          <EmployeeInfo data={employee} />
        </div>
      )
    });

    return (
      <div>
        <h1>{this.state.data.title}</h1>
        <hr />

        <div className="row">
          <div className="col-md-12">
            <VacancyInfo data={this.state.data} />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <h3>Самые подходящие работники</h3>
            <hr />
            <Grid data={matched} cols="2" />
          </div>

          <div className="col-md-6">
            <h3>Частично подходящие работники</h3>
            <hr />
            <Grid data={others} cols="2" />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = { VacancyBox, Vacancy, VacancyInfo }
