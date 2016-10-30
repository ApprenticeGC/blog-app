import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
// import { color } from 'color';
import { Grid, Cell } from 'radium-grid';
import {inject, observer, Provider } from 'mobx-react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { logoIcon, facebookIcon, twitterIcon, googlePlusIcon } from './icons';


import {
  cyan500, cyan700,
  pinkA50, pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const RLink = Radium(Link);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey300,
    accent1Color: darkBlack
  }
});

const styles = {
  base: {
    width: '70%',
    margin: 'auto',

    '@media (min-width: 20em)': {
      width: '90%'
    },
    //
    '@media (min-width: 60em)': {
      width: '53em'
    }//,
    //
    // '@media (min-width: 900px)': {
    //   width: '70%'
    // },

    // '@media (min-width: 60em)': {
    //   maxWidth: '50em'
    // }
  },
  header: {
    height: '3em',
    borderBottom: '1px solid #999'
  },
  footer: {
    borderTop: '1px solid #999'
  },
  logoListSection: {
    listStyle: 'none outside none',
    margin: '-0.25em 0',
    padding: 0,
    textAlign: 'center'
  },
  listSection: {
    listStyle: 'none outside none',
    margin: '0.5em 0',
    padding: 0,
    textAlign: 'center'
  },
  listItem: {
    display: 'inline',
    margin: '0 0.5em'
  },
  rlink: {
    textDecoration: 'none',
    color: '#666',
    fontWeight: '700',

    ':active': {
      color: '#555'
    },

    ':hover': {
      color: '#111'
    },

    ':visited': {
      color: '#555'
    }
  }
};

const HeaderSection = Radium((props) => {
  return (
    <header style={styles.header}>
      <Grid width="1/2">
        <Cell align="left">
          <ul style={styles.logoListSection}>
            <li style={styles.listItem}><Link to="/">{logoIcon()}</Link></li>
          </ul>
        </Cell>
        <Cell align="right">
          <nav>
            <ul style={styles.listSection}>
              <li style={styles.listItem}>
                <RLink style={[styles.rlink]} to="/">Overview</RLink>
              </li>
              <li style={styles.listItem}>
                <RLink style={[styles.rlink]} to="/about">About</RLink>
              </li>
            </ul>
          </nav>
        </Cell>
      </Grid>
    </header>
  );
});

const FooterSection = Radium((props) => {
  return (
    <footer style={styles.footer}>
      <Grid width="1/2">
        <Cell align="left">
        </Cell>
        <Cell align="right">
          <nav>
            <ul style={styles.listSection}>
              <li style={styles.listItem}>{facebookIcon()}</li>
              <li style={styles.listItem}>{twitterIcon()}</li>
              <li style={styles.listItem}>{googlePlusIcon()}</li>
            </ul>
          </nav>
        </Cell>
      </Grid>
    </footer>
  );
});

const _ = Radium((props) => {
  return (
    <StyleRoot style={styles.base}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HeaderSection />
          <main>
            {props.children}
          </main>
          <FooterSection />
        </div>
      </MuiThemeProvider>
    </StyleRoot>
  );
});

export default _;
