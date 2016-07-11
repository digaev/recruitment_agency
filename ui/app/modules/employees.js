import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { Grid, EmployeeInfo, VacancyInfo } from './grid'


const EmployeeBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    const url = 'http://localhost:3000/employees';

    axios.get(url).then((response) => {
      this.setState({ data: response.data });
    }).catch((error) => {
      console.error(error);
    })
  },

  render() {
    const info = this.state.data.map((employee) => {
      return (
        <div>
          <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
          <EmployeeInfo data={employee} />
        </div>
      )
    });

    return (
      <div className="row">
        <h1>Работники</h1>
        <hr />
        <div className="text-center">
          <Link to="/employees/new" className="btn btn-primary btn-lg">
            Добавить работника
          </Link>
        </div>
        <hr />
        <Grid data={info} cols="3" />
      </div>
    )
  }
});

const Employee = React.createClass({
  getInitialState: () => {
    return { data: {} }
  },

  componentDidMount: function() {
    const url = 'http://localhost:3000/employees/' + this.props.params.employeeId;

    axios.get(url).then((response) => {
      this.setState({ data: response.data })
    }).catch((error) => {
      console.error(error)
    })
  },

  render() {
    // FIXME
    if (!this.state.data.id) {
      return <div />
    }

    const matched = this.state.data.vacancies.matched.map((vacancy) => {
      return (
        <div>
          <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
          <VacancyInfo data={vacancy} />
        </div>
      )
    });

    const others = this.state.data.vacancies.others.map((vacancy) => {
      return (
        <div>
          <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.name}</Link></h3>
          <VacancyInfo data={vacancy} />
        </div>
      )
    });

    return (
      <div>
        <h1>{this.state.data.name}</h1>
        <hr />

        <div className="row">
          <div className="col-md-12">
            <EmployeeInfo data={this.state.data} />
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <h3>Самые подходящие вакансии</h3>
            <hr />
            <Grid data={matched} cols="2" />
          </div>

          <div className="col-md-6">
            <h3>Частично подходящие вакансии</h3>
            <hr />
            <Grid data={others} cols="2" />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = { EmployeeBox, Employee, EmployeeInfo }
