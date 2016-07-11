import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { SkillInputGroup } from './skills'
import ModalDialog from './modal_dialog'
import axios from 'axios'


const vacancyFormFields = [
  'vacancy.title',
  'vacancy.salary',
  'vacancy.address',
  'vacancy.expire_at',
  'vacancy.skill',
  'vacancy.skill_list[]'
];

const submitVacancyForm = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/vacancies', values).then((response) => {
      if (response.data.errors === false) {
        resolve()
        $('#myModal').modal('show');
      } else {
        reject(response.data.errors);
      }
    }).catch((error) => {
      console.error(error)
    })
  })
}

class VacancyForm extends Component {
  componentDidMount () {
    $('input#expire_at').datetimepicker({ format: 'YYYY-MM-DD' });
  }

  render() {
    const { fields: { vacancy }, handleSubmit, submitting, resetForm } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(submitVacancyForm)}>
          <legend>Добавить вакансию</legend>
          <div className={"form-group" + (vacancy.title.touched && vacancy.title.error ? ' has-error' : '')}>
            <label htmlFor="title">Название</label>
            <input className="form-control" id="title" placeholder="Название" type="text" {...vacancy.title} />
            {vacancy.title.touched && vacancy.title.error && <p className="help-block">{vacancy.title.error}</p>}
          </div>
          <div className={"form-group" + (vacancy.salary.touched && vacancy.salary.error ? ' has-error' : '')}>
            <label htmlFor="salary">Зарплата</label>
            <input className="form-control" id="salary" placeholder="Зарплата" type="text" type="number" min="1" {...vacancy.salary} />
            {vacancy.salary.touched && vacancy.salary.error && <p className="help-block">{vacancy.salary.error}</p>}
          </div>
          <div className={"form-group" + (vacancy.expire_at.touched && vacancy.expire_at.error ? ' has-error' : '')}>
            <label htmlFor="expire_at">Срок действия</label>
            <div style={{position: 'relative' }}>
              <input className="form-control" id="expire_at" placeholder="Срок действия" {...vacancy.expire_at} />
            </div>
            {vacancy.expire_at.touched && vacancy.expire_at.error && <p className="help-block">{vacancy.expire_at.error}</p>}
          </div>
          <div className={"form-group" + (vacancy.address.touched && vacancy.address.error ? ' has-error' : '')}>
            <label htmlFor="address">Контактная информация</label>
            <textarea className="form-control" id="address" placeholder="Контактная информация" type="text" {...vacancy.address}></textarea>
            {vacancy.address.touched && vacancy.address.error && <p className="help-block">{vacancy.address.error}</p>}
          </div>
          <SkillInputGroup fields={vacancy} />
          <button className="btn btn-primary btn-lg" type="submit" disabled={submitting} style={{ marginRight: 10 }}>Отправить</button>
        </form>
        <ModalDialog message="Вакансия успешно добавлена!" url="/vacancies" />
      </div>
    )
  }
}

VacancyForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired
}

VacancyForm = reduxForm({
  form: 'vacancyForm',
  fields: vacancyFormFields
})(VacancyForm);

export default VacancyForm
