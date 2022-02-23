// @ts-check
import React from 'react';
import ReactDOM from 'react-dom'
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import App from './components/App.js';
import store from './slices/index.js'
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const socket = io();

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
document.getElementById('chat')
)
;