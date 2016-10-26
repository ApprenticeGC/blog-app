import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';

import routes from '../../routes';

const _ = (props) => {
  const { appStore, history } = props;

  return (
    <Provider appStore={appStore}>
      <Router history={history} routes={routes()} />
    </Provider>
  );
};

export default _;
