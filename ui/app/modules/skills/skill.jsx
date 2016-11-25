/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.preventDefault();
    if (this.context.onRemove) {
      this.context.onRemove(this.props.skill);
    }
  }

  render() {
    let removeButton = null;
    if (this.context.onRemove) {
      removeButton = (
        <i
          className="glyphicon glyphicon-remove remove-skill"
          onClick={this.onRemove}
        />);
    }

    return (
      <li>
        <span className="label label-default">
          {this.props.children}
        </span>
        {removeButton}
      </li>
    );
  }
}

Skill.propTypes = {
  skill: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

Skill.contextTypes = {
  onRemove: React.PropTypes.func,
};

export default Skill;
