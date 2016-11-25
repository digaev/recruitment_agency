import React from 'react';
import { Link } from 'react-router';
import EmployeeInfo from './employee-info';
import { Grid } from '../grid';

class EmployeeBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    $.getJSON('http://localhost:3000/employees', (data) => {
      this.setState({ data });
    }).fail((xhr) => {
      console.error(xhr);
    });
  }

  render() {
    const info = this.state.data.map(employee =>
      <div>
        <h3><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
        <EmployeeInfo data={employee} />
      </div>,
    );

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
        <Grid data={info} cols={3} />
      </div>
    );
  }
}

export default EmployeeBox;
