import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import EmployeeInfo from './employee-info';
import { Grid } from '../grid';
import { VacancyInfo } from '../vacancies';

class Employee extends React.Component {
  constructor() {
    super();
    this.state = { data: {} };
  }

  componentDidMount() {
    $.getJSON(
      `http://localhost:3000/employees/${this.props.params.employeeId}`,
      (data) => {
        this.setState({ data });
      },
    ).fail((xhr) => {
      console.error(xhr);
    });
  }

  render() {
    if (!this.state.data.id) {
      return <div>Loading...</div>;
    }

    const bestVacancies = this.state.data.best_vacancies.map(vacancy =>
      <div>
        <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
        <VacancyInfo data={vacancy} />
      </div>,
    );

    const vacancies = this.state.data.vacancies.map(vacancy =>
      <div>
        <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
        <VacancyInfo data={vacancy} />
      </div>,
    );

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
            <Grid data={bestVacancies} cols={2} />
          </div>

          <div className="col-md-6">
            <h3>Частично подходящие вакансии</h3>
            <hr />
            <Grid data={vacancies} cols={2} />
          </div>
        </div>
      </div>
    );
  }
}

Employee.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Employee;
