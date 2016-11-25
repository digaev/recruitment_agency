import React, { PropTypes } from 'react';
import Skill from './skill';

function SkillList(props) {
  const skills = props.skills.map((skill, i) =>
    <Skill key={i} skill={skill}>{skill}</Skill>,
  );

  return (
    <ul className="skill-list">{skills}</ul>
  );
}

SkillList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillList;
