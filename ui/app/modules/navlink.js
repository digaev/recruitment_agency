import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    let isActive = this.context.router.isActive(this.props.to, true);
    let className = isActive ? "active" : "";

    return (
      <li className={className}>
        <Link { ...this.props } activeClassName={className}>{this.props.children}</Link>
      </li>
    )
  }
})
