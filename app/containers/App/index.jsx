import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';

import routes from '../../routes';

const _ = (props) => {
  const { appStore, history } = props;

  const onEnterArticle = (nextState) => {
    const id = nextState.params.articleId;
    console.log(id);
    // No props here for store
    // const article = _.find(blogDataStore.articles, a => a.id === articleId);
    appStore.loadArticleContent(id);
  };

  return (
    <Provider appStore={appStore}>
      <Router history={history} routes={routes(onEnterArticle)} />
    </Provider>
  );
};

export default _;
