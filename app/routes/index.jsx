import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router';

//
import About from '../containers/About';
import AppLayout from '../containers/AppLayout';
import Article from '../containers/Article';
import Overview from '../containers/Overview';

export default (
  onEnterArticle
) => {
  return (
    <Route path="/" component={AppLayout}>
      <IndexRoute
        component={Overview}
      />
      <Route
        path="articles/:articleId"
        component={Article}
        onEnter={onEnterArticle}
      />
      <Route
        path="about"
        component={About}
      />
    </Route>
  );
};
