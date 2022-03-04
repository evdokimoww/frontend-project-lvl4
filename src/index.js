// @ts-check
import ReactDOM from 'react-dom'
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import init from './init.js';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';


// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const socket = io();
  const app = await init(socket);

  ReactDOM.render(
    app,
    document.getElementById('chat')
  )

  return app;
};

runApp();