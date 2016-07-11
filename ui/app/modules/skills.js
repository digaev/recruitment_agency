import React from 'react'
import axios from 'axios'

const SkillList = React.createClass({
  render() {
    let skills = this.props.skills.map((skill, i) => {
      return <Skill key={i}>{skill}</Skill>
    })

    return (
      <div {...this.props}>{skills}</div>
    )
  }
})

const Skill = React.createClass({
  render() {
    return (
      <span className="label label-default" style={{marginRight: '.33em'}}>
        {this.props.children}
      </span>
    )
  }
})

const SkillInputGroup = React.createClass({
  getInitialState() {
    return { skills: [], selected: [] };
  },

  componentDidMount () {
    const url = 'http://localhost:3000/skills';

    $("input#skill").typeahead({
      source: (query, process) => {
        if (this.state.skills.length == 0) {
          axios.get(url).then((response) => {
            this.setState({skills: response.data});
            process(this.state.skills);
          }).catch((error) => {
            console.error(error);
          })
        } else {
          process(this.state.skills);
        }
      },
      updater: (skill) => {
        this.addSkill(skill);
      }
    });
  },

  addSkill (skill) {
    if (!skill) {
      return;
    }
    let state = this.state;
    if (state.selected.indexOf(skill) == -1) {
      state.skills = state.skills.concat([skill]);
      state.selected = state.selected.concat([skill]);
      this.setState(state);
      this.props.fields.skill_list.addField(skill);
    }
  },

  render() {
    return (
      <div>
        <label htmlFor="skill">Навыки</label>
        <div className={"input-group" + (this.props.fields.skill.touched && this.props.fields.skill.error ? ' has-error' : '')}>
          <input className="form-control" id="skill" placeholder="Навыки" autoComplete="off" {...this.props.fields.skill} />
          <div className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={() => this.addSkill(this.props.fields.skill.value) }>
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
        <SkillList skills={this.state.selected} style={{marginTop: 5, marginBottom: 10}} />
      </div>
    )
  }
})

module.exports = { SkillList, Skill, SkillInputGroup }
