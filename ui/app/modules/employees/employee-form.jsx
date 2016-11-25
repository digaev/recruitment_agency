import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ModalDialog from '../forms/modal-dialog';
import { SkillInput, SkillList, SkillForm } from '../skills';

const formFields = [
  'name', 'address', 'phone', 'email', 'salary', 'status', 'skills[]',
];

class EmployeeForm extends SkillForm {
  static handleSubmit(values) {
    return new Promise((resolve, reject) => {
      $.post('http://localhost:3000/employees', values, () => {
        resolve();
        $('#modal-dialog').modal('show');
      }).fail((xhr) => {
        reject(xhr.responseJSON);
      });
    });
  }

  render() {
    const { fields: {
      name, address, phone, email, salary, status, skills,
    }, handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(EmployeeForm.handleSubmit)}>
          <legend>Добавить работника</legend>
          <div className={`form-group${name.touched && !name.valid ? ' has-error' : ''}`}>
            <label htmlFor="name">Имя</label>
            <input
              className="form-control"
              id="name"
              placeholder="Имя"
              type="text" {...name}
            />
            {name.touched && name.error && <p className="help-block">{name.error}</p>}
          </div>

          <div className={`form-group${phone.touched && phone.error ? ' has-error' : ''}`}>
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              type="tel"
              placeholder="Телефон" {...phone}
            />
            {phone.touched && phone.error && <p className="help-block">{phone.error}</p>}
          </div>

          <div className={`form-group${email.touched && email.error ? ' has-error' : ''}`}>
            <label htmlFor="phone">Email</label>
            <input
              className="form-control"
              id="email"
              placeholder="Email"
              type="email"
              {...email}
            />
            {email.touched && email.error && <p className="help-block">{email.error}</p>}
          </div>

          <div className={`form-group${status.touched && status.error ? ' has-error' : ''}`}>
            <label htmlFor="status">Статус</label>
            <select className="form-control" id="status" name="status" {...status}>
              <option />
              <option value="busy">Занят</option>
              <option value="free">Свободен</option>
            </select>
            {status.touched && status.error && <p className="help-block">{status.error}</p>}
          </div>

          <div className={`form-group${salary.touched && salary.error ? ' has-error' : ''}`}>
            <label htmlFor="salary">Зарплата</label>
            <input
              className="form-control"
              id="salary"
              min="1"
              placeholder="Зарплата"
              type="number"
              {...salary}
            />
            {salary.touched && salary.error && <p className="help-block">{salary.error}</p>}
          </div>

          <div className={`form-group${address.touched && address.error ? ' has-error' : ''}`}>
            <label htmlFor="address">Контактная информация</label>
            <input
              className="form-control"
              id="address"
              placeholder="Контактная информация"
              type="text"
              {...address}
            />
            {address.touched && address.error && <p className="help-block">{address.error}</p>}
          </div>

          <div className={`form-group${skills.length > 0 && skills[0].error ? ' has-error' : ''}`}>
            <label htmlFor="skill">Навыки</label>
            <SkillInput onSelect={this.addSkill} />
            {skills.length > 0 && skills[0].error && <p className="help-block">{skills[0].error}</p>}
          </div>

          <div className="form-group">
            <SkillList
              skills={skills.filter(s => s.valid).map(s => s.value)}
              onRemove={this.removeSkill}
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            disabled={submitting}
            type="submit"
          >
            Отправить
          </button>
        </form>
        <ModalDialog title="Работники" message="Работник добавлен!" url="/employees" />
      </div>
    );
  }
}

EmployeeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'employeeForm',
  fields: formFields,
})(EmployeeForm);
