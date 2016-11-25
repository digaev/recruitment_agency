import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import VacancyInfo from './vacancy-info';
import { EmployeeInfo } from '../employees';
import { Grid } from '../grid';

class Vacancy extends React.Component {
  constructor() {
    super();
    this.state = { data: {} };
  }

  componentDidMount() {
    $.getJSON(
      `http://localhost:3000/vacancies/${this.props.params.vacancyId}`,
      (data) => { this.setState({ data }); },
    ).fail((xhr) => {
      console.error(xhr);
    });
  }

  render() {
    if (!this.state.data.id) {
      return <div>Loading...</div>;
    }

    const bestEmployees = this.state.data.best_employees.map(employee =>
      <div>
        <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
        <EmployeeInfo data={employee} />
      </div>,
    );

    const employees = this.state.data.employees.map(employee =>
      <div>
        <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
        <EmployeeInfo data={employee} />
      </div>,
    );

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
            <Grid data={bestEmployees} cols={2} />
          </div>

          <div className="col-md-6">
            <h3>Частично подходящие работники</h3>
            <hr />
            <Grid data={employees} cols={2} />
          </div>
        </div>
      </div>
    );
  }
}

Vacancy.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Vacancy;
