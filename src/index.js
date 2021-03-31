import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/layout/App'
import { Provider } from 'react-redux'
import configureStore, { history } from './app/store/configureStore'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import './app/layout/App.css'
import ScrollToTop from './app/layout/ScrollToTop'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore()

// Whenever there is a change in the page,
// it won't perform a full refresh per each change
const rootEl = document.getElementById('root')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <App />
      </ConnectedRouter>
    </Provider>,
    rootEl
  )
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render()
