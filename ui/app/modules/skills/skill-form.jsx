import React, { PropTypes } from 'react';

class SkillForm extends React.Component {
  constructor() {
    super();
    this.addSkill = this.addSkill.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
  }

  getChildContext() {
    return {
      onRemove: this.removeSkill,
    };
  }

  addSkill(skill) {
    const skills = this.props.fields.skills;
    if (skills.length > 0 && !skills[0].valid) {
      skills.removeField(0);
    }
    if (!skill || skills.map(s => s.value.toLowerCase()).includes(skill.toLowerCase())) {
      return;
    }
    skills.addField(skill);
  }

  removeSkill(skill) {
    const i = this.props.fields.skills.findIndex(field =>
      field.value === skill,
    );
    if (i !== -1) {
      this.props.fields.skills.removeField(i);
    }
  }
}

SkillForm.propTypes = {
  fields: PropTypes.object.isRequired,
};

SkillForm.childContextTypes = {
  onRemove: React.PropTypes.func,
};

export default SkillForm;
