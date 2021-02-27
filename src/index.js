import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';

import 'semantic-ui-css/semantic.min.css';
import './app/layout/App.css';

const store = configureStore();

// Whenever there is a change in the page,
// it won't perform a full refresh per each change
const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();
