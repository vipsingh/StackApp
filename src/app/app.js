import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import xApp from './reducers';
import App from './components/App';
import thunk from 'redux-thunk';

let store = createStore(xApp, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
);
//let AppRoutes = require('./routes/index');
render(

  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
