import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';

import ArticleOverview from '../ArticleOverview'

const _ = inject(
  'appStore'
)(observer((props) => {
  return (
    <div>
      <ul>
        {props.appStore.articles.map((article, index) => <ArticleOverview key={article.id} id={article.id} title={article.title} />)}
      </ul>
    </div>
  );
}));

export default _;
