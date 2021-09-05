import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './initMicroApps';
import './index.css';
import { store } from './app/store';
import routes from './config/routes';
import AppRouter from './utils/AppRouter';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter routes={routes} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
