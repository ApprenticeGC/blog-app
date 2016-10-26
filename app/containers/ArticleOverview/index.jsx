import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
// import {inject, observer, Provider} from 'mobx-react';
import { Link} from 'react-router';

const _ = (props) => {
  const { id, title } = props;

  return (
    <div>
      <Link to={ `articles/${id}` }>
        {title}
      </Link>
    </div>
  );
};

export default _;
