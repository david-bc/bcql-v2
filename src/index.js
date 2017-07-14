import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import './index.css';
import 'react-select/dist/react-select.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

store.dispatch({ type: 'SEARCH_FETCH_REQUESTED', rawQuery: '', contextSlug: 'assets' });
store.dispatch({ type: 'CONFIGS_FETCH_REQUESTED' });
