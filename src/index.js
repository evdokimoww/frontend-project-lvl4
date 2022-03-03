// @ts-check
import ReactDOM from 'react-dom'
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.js';
import 'react-toastify/dist/ReactToastify.css';


// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const app = await init();

  ReactDOM.render(
    app,
    document.getElementById('chat')
  )

  return app;
};

runApp();
export default runApp;