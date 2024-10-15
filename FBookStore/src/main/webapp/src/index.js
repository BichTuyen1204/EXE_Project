import React from 'react';
import App from './App.js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './admin/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

