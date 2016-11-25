import React, { PropTypes } from 'react';
import Row from './row';
import { splitArrayIntoChunks } from '../common';

function Grid(props) {
  const grid = splitArrayIntoChunks(props.data, props.cols);
  const rows = grid.map((cells, i) =>
    <Row cells={cells} key={i} cols={props.cols} />,
  );

  return (
    <div>{rows}</div>
  );
}

Grid.propTypes = {
  cols: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default Grid;
