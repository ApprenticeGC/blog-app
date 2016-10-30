import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';
import TextField from 'material-ui/TextField';

import ArticleOverview from '../ArticleOverview'

const styles = {
  listSection: {
    listStyle: 'none outside none',
    margin: '1.5em 2em',
    padding: 0
  },
  listItem: {
    // display: 'inline',
    margin: '3em 0'
  }
};

const _ = inject(
  'appStore'
)(observer((props) => {
  const onChange = (e) => {
    const value = e.target.value;

    props.appStore.filterIndexedArticle(value);

    console.log(value);
  };

  return (
    <div>
      <div>
        <TextField
          hintText="Search"
          onChange={onChange}
        />
      </div>
      <ul style={styles.listSection}>
        {props.appStore.indexedArticles.map((article, index) =>
          <li key={article.id} style={styles.listItem}>
            <ArticleOverview
              id={article.id}
              title={article.title}
              categories={article.categories}
              tags={article.tags}
            />
          </li>
        )}
      </ul>
    </div>
  );
}));

export default _;
