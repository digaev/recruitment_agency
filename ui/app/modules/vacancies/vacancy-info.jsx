import React, { PropTypes } from 'react';
import { SkillList } from '../skills';

function VacancyInfo(props) {
  return (
    <div>
      <ul>
        <li>Добавлено: {props.data.created_at}</li>
        <li>Срок действия: {props.data.expire_at}</li>
        <li>Зарплата: {props.data.salary}</li>
        <li>Контакты: {props.data.address}</li>
      </ul>
      <SkillList skills={props.data.skills} />
    </div>
  );
}

VacancyInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VacancyInfo;
