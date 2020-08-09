import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

// eslint-disable-next-line no-restricted-globals
if (process.env.NODE_ENV === 'development' || location.hostname.includes('nicen.pw')) {
  import('./carbon').then((carbonModule) => {
    carbonModule.injectCarbonTag();
  });
}
