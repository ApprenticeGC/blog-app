import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';

import Moment from 'react-moment';

// import {Tabs, Tab} from 'material-ui/Tabs';
// import Slider from 'material-ui/Slider';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import Tabs from 'muicss/lib/react/tabs';
// import Tab from 'muicss/lib/react/tab';

import BlockContent from '../BlockContent';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// Can extract as utility function.
const zip = (array1, array2) => {
  const arrayForIteration = (array1.length >= array2.length) ? array2 : array1;
  const zippedArray = arrayForIteration.map((a, index) => [array1[index], array2[index]]);

  return zippedArray;
};

const styles = {
  base: {
    width: '90%',
    margin: 'auto'
  },
  title: {
    color: '#555',
    fontSize: '250%',
    fontWeight: '700',
    margin: '2em 0 -0.2em'
  },
  subTitle: {
    color: '#888',
    fontSize: '150%',
    fontWeight: '500'
  },
  dateArea: {
    width: '8em',
    borderBottom: '1px solid #aaa',
    margin: '3em 0'
  },
  date: {
    color: '#aaa',
    fontWeight: '100',
    margin: '0.2em 0'
  },
  contentArea: {
    margin: '4em 0'
  }
};

const _ = inject(
  'appStore'
)(observer((props) => {
  // const dateToFormat = '2016-04-19T12:59-0500';
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
        const s = { height: v.height }
        return (
          <Cell
            key={d.id}
            width={v.width}
            smallWidth="1"
            style={s}
          >
            <BlockContent content={d.content} />
          </Cell>
        );
      });
    }

    return cells;
  };

  return(
    <div style={styles.base}>
      <h1 style={styles.title}>{article.title}</h1>
      <h2 style={styles.subTitle}>{article.subTitle}</h2>
      <div style={styles.dateArea}>
        <h3 style={styles.date}>
          <Moment format="MMM DD, YYYY">{article.date}</Moment>
        </h3>
      </div>

      <div>
      </div>

      <div style={styles.contentArea}>
        <Grid>
          {/*detail.map((d, index) => <Cell key={d.id}><div dangerouslySetInnerHTML={{ __html: md.render(d.content) }}></div></Cell>)*/}
          {corespondingViewData(articleId)}
        </Grid>
      </div>
    </div>
  );
}));


export default _;
