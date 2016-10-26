import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import {inject, observer, Provider } from 'mobx-react';
import { Link } from 'react-router';

const styles = {
  base: {
    width: '60%',
    margin: 'auto'
  }
}

const _ = Radium((props) => {
  return (
    <StyleRoot style={styles.base}>
      <header>
        <Grid width="1/2">
          <Cell align="left">
            Logo
          </Cell>
          <Cell align="right">
            <nav>
              <ul>
                <li><Link to="/">Overview</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </Cell>
        </Grid>
      </header>
      <main>
        {props.children}
      </main>
      <footer></footer>
    </StyleRoot>
  );
});

export default _;
