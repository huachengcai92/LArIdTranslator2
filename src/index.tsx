import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import * as Sentry from '@sentry/browser';

import App from './App';

const app = <App />

ReactDOM.render(app, document.getElementById('root'));

