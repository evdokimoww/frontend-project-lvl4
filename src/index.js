// @ts-check
import React from 'react';
import ReactDOM from 'react-dom'
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.js';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App.js';
import { I18nextProvider } from 'react-i18next';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const { socket, i18nextInstance } = await init();

  ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App socket={socket}/>
      </I18nextProvider>
    </Provider>,
    document.getElementById('chat')
  )
};

runApp();