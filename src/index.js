import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import './styles/generic-components.scss';
import './styles/print.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { detectBrowser } from './utils/browserDetector';
import UnsupportedBrowserPage from './views/UnsupportedBrowser';

const isSupportedBrowser = detectBrowser();

if (isSupportedBrowser) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  ReactDOM.render(<UnsupportedBrowserPage />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
require('dotenv').config();
serviceWorker.unregister();
