import React from 'react'
import { SkillList } from './skills'
import { splitArrayIntoChunks } from './common'

const Grid = React.createClass({
  render() {
    const grid = splitArrayIntoChunks(this.props.data, this.props.cols);
    const rows = grid.map((cells, i) => {
      return <Row cells={cells} key={i} cols={this.props.cols} />
    });

    return (
      <div>{rows}</div>
    )
  }
});

const Row = React.createClass({
  getInitialState() {
    return { cells: this.props.cells }
  },

  render () {
    return (
      <div className="row">
        {
          this.state.cells.map((cell, i) => {
            return <Cell content={cell} key={i} size={12 / this.props.cols} />
          })
        }
      </div>
    )
  }
});

const Cell = React.createClass({
  render () {
    return (
      <div className={"col-md-" + this.props.size + " col-xs-12"}>
        {this.props.content}
      </div>
    )
  }
});

const EmployeeInfo = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>Имя: {this.props.data.name}</li>
          <li>Email: {this.props.data.email}</li>
          <li>Телефон: {this.props.data.phone}</li>
          <li>Зарплата: {this.props.data.salary}</li>
          <li>Контакты: {this.props.data.address}</li>
        </ul>
        <SkillList skills={this.props.data.skills} />
      </div>
    )
  }
});

const VacancyInfo = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>Добавлено: {this.props.data.created}</li>
          <li>Срок действия: {this.props.data.expire}</li>
          <li>Зарплата: {this.props.data.salary}</li>
          <li>Контакты: {this.props.data.address}</li>
        </ul>
        <SkillList skills={this.props.data.skills} />
      </div>
    )
  }
});

module.exports = { Grid, EmployeeInfo, VacancyInfo }
