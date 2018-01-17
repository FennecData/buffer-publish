import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';


const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

const renderApp = (AppComponent) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <AppComponent />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp(App);

/**
 * We're using HMR (Hot Module Reloading) here to ensure that the components update
 * and you don't need to reload the page manually.
 *
 * Because of the way we have packages setup (suing lerna), we need to specifically
 * include them in the call to `module.hot.accept()`.
 */
if (module.hot) {
  module.hot.accept([
    './components/App',
    '../app-sidebar/index.js',
    '../async-data-fetch/index.js',
    '../environment/index.js',
    '../example/index.js',
    '../i18n/index.js',
    '../notifications/index.js',
    '../profile-page/index.js',
    '../profile-sidebar/index.js',
    '../pusher-sync/index.js',
    '../queue/index.js',
    '../routes/index.js',
    '../sent/index.js',
    '../settings/index.js',
    '../shared-components/index.js',
    '../store/index.js',
    '../store/reducers.js',
    '../tabs/index.js',
    '../unauthorized-redirect/index.js',
    '../utils/index.js',
  ], () => {
    const newApp = require('./components/App').default; // eslint-disable-line global-require
    const newReducers = require('../store/reducers').default; // eslint-disable-line global-require
    store.replaceReducer(newReducers);
    renderApp(newApp);
  });
}
