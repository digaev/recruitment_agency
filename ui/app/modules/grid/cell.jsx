import React, { PropTypes } from 'react';

function Cell(props) {
  return (
    <div className={`col-md-${props.size} col-xs-12`}>
      {props.children}
    </div>
  );
}

Cell.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Cell;
