import React, { PropTypes } from 'react';
import Cell from './cell';

function Row(props) {
  const cells = props.cells.map((cell, i) =>
    <Cell key={i} size={12 / props.cols}>
      {cell}
    </Cell>,
  );

  return (
    <div className="row">{cells}</div>
  );
}

Row.propTypes = {
  cells: PropTypes.array.isRequired,
  cols: PropTypes.number.isRequired,
};

export default Row;
