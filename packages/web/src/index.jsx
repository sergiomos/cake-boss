import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserProvider from './context/UserProvider';

import GlobalStyles from './styles/globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyles />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
