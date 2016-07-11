import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { SkillInputGroup } from './skills'
import ModalDialog from './modal_dialog'
import axios from 'axios'


const employeeFormFields = [
  'employee.name',
  'employee.address',
  'employee.phone',
  'employee.email',
  'employee.salary',
  'employee.status',
  'employee.skill',
  'employee.skill_list[]'
];

const submitEmployeeForm = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/employees', values).then((response) => {
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

class EmployeeForm extends Component {
  render() {
    const { fields: { employee }, handleSubmit, submitting, resetForm } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(submitEmployeeForm)}>
          <legend>Добавить работника</legend>
          <div className={"form-group" + (employee.name.touched && employee.name.error ? ' has-error' : '')}>
            <label htmlFor="name">Имя</label>
            <input className="form-control" id="name" placeholder="Имя" type="text" {...employee.name} />
            {employee.name.touched && employee.name.error && <p className="help-block">{employee.name.error}</p>}
          </div>

          <div className={"form-group" + (employee.phone.touched && employee.phone.error ? ' has-error' : '')}>
            <label htmlFor="phone">Телефон</label>
            <input type="tel" className="form-control" id="phone" placeholder="Телефон" type="text" {...employee.phone} />
            {employee.phone.touched && employee.phone.error && <p className="help-block">{employee.phone.error}</p>}
          </div>

          <div className={"form-group" + (employee.email.touched && employee.email.error ? ' has-error' : '')}>
            <label htmlFor="phone">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" type="text" {...employee.email} />
            {employee.email.touched && employee.email.error && <p className="help-block">{employee.email.error}</p>}
          </div>

          <div className={"form-group" + (employee.status.touched && employee.status.error ? ' has-error' : '')}>
            <label htmlFor="status">Статус</label>
            <select className="form-control" id="status" name="status" {...employee.status}>
              <option></option>
              <option value="busy">Занят</option>
              <option value="free">Свободен</option>
            </select>
            {employee.status.touched && employee.status.error && <p className="help-block">{employee.status.error}</p>}
          </div>

          <div className={"form-group" + (employee.salary.touched && employee.salary.error ? ' has-error' : '')}>
            <label htmlFor="salary">Зарплата</label>
            <input className="form-control" id="salary" placeholder="Зарплата" type="text" type="number" min="1" {...employee.salary} />
            {employee.salary.touched && employee.salary.error && <p className="help-block">{employee.salary.error}</p>}
          </div>

          <div className={"form-group" + (employee.address.touched && employee.address.error ? ' has-error' : '')}>
            <label htmlFor="address">Контактная информация</label>
            <input type="text" className="form-control" id="address" placeholder="Контактная информация" type="text" {...employee.address} />
            {employee.address.touched && employee.address.error && <p className="help-block">{employee.address.error}</p>}
          </div>

          <SkillInputGroup fields={employee} />
          <button className="btn btn-primary btn-lg" type="submit" disabled={submitting} style={{ marginRight: 10 }}>Отправить</button>
        </form>
        <ModalDialog message="Работник успешно добавлен!" url="/employees" />
      </div>
    )
  }
}

EmployeeForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired
}

EmployeeForm = reduxForm({
  form: 'employeeForm',
  fields: employeeFormFields
})(EmployeeForm);

export default EmployeeForm
