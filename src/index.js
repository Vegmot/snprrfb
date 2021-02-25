import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';

import 'semantic-ui-css/semantic.min.css';
import './app/layout/App.css';

// Whenever there is a change in the page,
// it won't perform a full refresh per each change
const rootEl = document.getElementById('root');

const render = () => {
	ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
	module.hot.accept('./app/layout/App', () => {
		setTimeout(render);
	});
}

render();
