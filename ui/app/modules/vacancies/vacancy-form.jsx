import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ModalDialog from '../forms/modal-dialog';
import { SkillInput, SkillList, SkillForm } from '../skills';

const formFields = [
  'title', 'salary', 'address', 'expire_at', 'skills[]',
];

class VacancyForm extends SkillForm {
  static handleSubmit(values) {
    return new Promise((resolve, reject) => {
      $.post('http://localhost:3000/vacancies', values, () => {
        resolve();
        $('#modal-dialog').modal('show');
      }).fail((xhr) => {
        reject(xhr.responseJSON);
      });
    });
  }

  componentDidMount() {
    $('input#expire_at').datetimepicker({ format: 'YYYY-MM-DD' });
  }

  render() {
    const { fields: {
      title, salary, address, expire_at, skills,
    }, handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(VacancyForm.handleSubmit)}>
          <legend>Добавить вакансию</legend>
          <div className={`form-group${title.touched && title.error ? ' has-error' : ''}`}>
            <label htmlFor="title">Название</label>
            <input className="form-control" id="title" placeholder="Название" type="text" {...title} />
            {title.touched && title.error && <p className="help-block">{title.error}</p>}
          </div>

          <div className={`form-group${salary.touched && salary.error ? ' has-error' : ''}`}>
            <label htmlFor="salary">Зарплата</label>
            <input className="form-control" id="salary" placeholder="Зарплата" type="number" min="1" {...salary} />
            {salary.touched && salary.error && <p className="help-block">{salary.error}</p>}
          </div>

          <div className={`form-group${expire_at.touched && expire_at.error ? ' has-error' : ''}`} style={{ position: 'relative' }}>
            <label htmlFor="expire_at">Срок действия</label>
            <input className="form-control" id="expire_at" placeholder="Срок действия" {...expire_at} />
            {expire_at.touched && expire_at.error && <p className="help-block">{expire_at.error}</p>}
          </div>

          <div className={`form-group${address.touched && address.error ? ' has-error' : ''}`}>
            <label htmlFor="address">Контактная информация</label>
            <textarea className="form-control" id="address" placeholder="Контактная информация" type="text" {...address} />
            {address.touched && address.error && <p className="help-block">{address.error}</p>}
          </div>

          <div className={`form-group${(skills.length > 0 && skills[0].error ? ' has-error' : '')}`}>
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
        <ModalDialog title="Вакансии" message="Вакансия добавлена!" url="/vacancies" />
      </div>
    );
  }
}

VacancyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'vacancyForm',
  fields: formFields,
})(VacancyForm);
