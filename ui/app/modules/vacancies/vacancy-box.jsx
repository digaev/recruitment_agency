import React from 'react';
import { Link } from 'react-router';
import VacancyInfo from './vacancy-info';
import { Grid } from '../grid';

class VacancyBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    $.getJSON('http://localhost:3000/vacancies', (data) => {
      this.setState({ data });
    }).fail((xhr) => {
      console.error(xhr);
    });
  }

  render() {
    const info = this.state.data.map(vacancy =>
      <div>
        <h3><Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
        <VacancyInfo data={vacancy} />
      </div>,
    );

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
        <Grid data={info} cols={3} />
      </div>
    );
  }
}

export default VacancyBox;
