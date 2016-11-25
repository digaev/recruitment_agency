import React, { PropTypes } from 'react';

class SkillInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.input = $('input#skill');
    this.input.typeahead(null, {
      name: 'skills',
      source: new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
          url: 'http://localhost:3000/skills',
          cache: false,
        },
      }),
    });
    this.input.bind('typeahead:select', (e, selected) => {
      e.preventDefault();
      this.addSkill(selected);
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.addSkill(this.input.typeahead('val'));
  }

  addSkill(skill) {
    if (this.props.onSelect) {
      this.props.onSelect(skill);
    }
    this.input.typeahead('val', '');
  }

  render() {
    return (
      <div className="input-group">
        <input
          autoComplete="off"
          className="form-control"
          type="text"
          id="skill"
          placeholder="Навыки"
        />
        <div className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleClick}>
            <i className="glyphicon glyphicon-plus" />
          </button>
        </div>
      </div>
    );
  }
}

SkillInput.propTypes = {
  onSelect: PropTypes.func,
};

export default SkillInput;
