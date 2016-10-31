import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
// import {inject, observer, Provider} from 'mobx-react';
import { Link} from 'react-router';

const RLink = Radium(Link);

const styles = {
  rlink: {
    textDecoration: 'none',
    color: '#555',

    ':active': {
      color: '#555'
    },

    ':hover': {
      color: '#888'
    },

    ':visited': {
      color: '#555'
    }
  },
  categoryListSection: {
    listStyle: 'none outside none',
    margin: '-1em 0',
    padding: 0,
    // width: '20em',
    borderLeft: '2px solid #aaa'
  },
  categoryListItem: {
    color: '#999',
    display: 'inline',
    margin: '0 0em',
    padding: '0 0.2em'
  },
  listSection: {
    listStyle: 'none outside none',
    margin: '-1em 0',
    padding: 0
  },
  listItem: {
    color: '#999',
    display: 'inline',
    margin: '0 0.5em'
  }
};

const _ = (props) => {
  const { id, title, categories, tags } = props;

  return (
    <div>
      <div>
        <ul style={styles.categoryListSection}>
          {categories.map((categorey, index) =>
            <li key={index} style={styles.categoryListItem}>
              {categorey}
            </li>
          )}
        </ul>
      </div>
      <RLink style={styles.rlink} to={ `articles/${id}` }>
        <h2>{title}</h2>
      </RLink>
      <div>
        <ul style={styles.listSection}>
          {tags.map((tag, index) =>
            <li key={index} style={styles.listItem}>
              {tag}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default _;
