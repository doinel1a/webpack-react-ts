import './css/global.css';
import './scss/global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
