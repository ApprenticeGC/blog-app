import React from 'react';
import ReactDOM, { render } from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {Tabs, Tab} from 'material-ui/Tabs';
// import Slider from 'material-ui/Slider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import { AppContainer } from 'react-hot-loader';
//
import { Router, Route, browserHistory, hashHistory } from 'react-router'
//
import { App as AppStore } from './stores'
import App from './containers/App'

//
const container = document.createElement('container');
container.id = 'container';
document.body.appendChild(container);

const appStore = new AppStore();
// const overviewCollectionStore = new OverviewCollectionStore();
// const detailCollectionStore = new DetailCollectionStore();

//
// appStore={appStore}
// overviewCollectionStore={overviewCollectionStore}
// detailCollectionStore={detailCollectionStore}
// const renderApp = () => {
//   render(
//     <AppContainer>
//       <App
//         appStore={appStore}
//         history={hashHistory}
//       />
//     </AppContainer>,
//     container
//   );
// }

const renderApp = () => {
  render(
    <AppContainer>
      <App
        appStore={appStore}
        history={hashHistory}
      />
    </AppContainer>,
    container
  );
}

renderApp();
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    require('./containers/App').default;
    renderApp();
  });
}
