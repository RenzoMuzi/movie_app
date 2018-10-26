import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App/App'
import '../src/css/index.css'
import reducer from './store/reducer'

// ========================================
const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);