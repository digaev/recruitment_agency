import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function NavLink(props, context) {
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? 'active' : '';

  return (
    <li className={className}>
      <Link {...props} activeClassName={className}>{props.children}</Link>
    </li>
  );
}

NavLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

NavLink.contextTypes = {
  router: PropTypes.object,
};

export default NavLink;
