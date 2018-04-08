import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
