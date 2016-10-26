import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';

import BlockContent from '../BlockContent';

// Can extract as utility function.
const zip = (array1, array2) => {
  const arrayForIteration = (array1.length >= array2.length) ? array2 : array1;
  const zippedArray = arrayForIteration.map((a, index) => [array1[index], array2[index]]);

  return zippedArray;
};

const _ = inject(
  'appStore'
)(observer((props) => {
  const articleId = props.params.articleId;
  const article = props.appStore.articles.find(a => a.id === articleId);
  const detail = article.detail;
  const articleViews = props.appStore.articleLayouts;
  const corespondingViewData = (id) => {
    const resultView = articleViews.find(articleView => articleView.id === id);
    let cells = (<div></div>);
    if (resultView === undefined) {
      cells = detail.map((d, index) =>
        <Cell
          key={d.id}
          width="1"
        >
          <BlockContent content={d.content} />
        </Cell>);
       return cells;
    } else {
      const zippedDetailAndView = zip(detail, resultView.detail);
      cells = zippedDetailAndView.map((zdav, index) => {
        const d = zdav[0];
        const v = zdav[1];
        return (
          <Cell
            key={d.id}
            width={v.width}
            smallWidth="1"
          >
            <BlockContent content={d.content} />
          </Cell>
        );
      });
    }

    return cells;
  }

  return(
    <div>
      <h1>{article.title}</h1>
      <h2>{article.subTitle}</h2>
      <Grid>
        {/*detail.map((d, index) => <Cell key={d.id}><div dangerouslySetInnerHTML={{ __html: md.render(d.content) }}></div></Cell>)*/}
        {corespondingViewData(articleId)}
      </Grid>
    </div>
  );
}));

export default _;
