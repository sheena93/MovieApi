import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import loadLocalUser from './loadLocalUser.js';

ReactDOM.render(<App />, document.getElementById('root'));
loadLocalUser(document);

registerServiceWorker();
