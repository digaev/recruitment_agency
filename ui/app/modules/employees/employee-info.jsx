import React, { PropTypes } from 'react';
import { SkillList } from '../skills';

function EmployeeInfo(props) {
  return (
    <div>
      <ul>
        <li>Имя: {props.data.name}</li>
        <li>Email: {props.data.email}</li>
        <li>Телефон: {props.data.phone}</li>
        <li>Зарплата: {props.data.salary}</li>
        <li>Контакты: {props.data.address}</li>
      </ul>
      <SkillList skills={props.data.skills} />
    </div>
  );
}

EmployeeInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EmployeeInfo;
