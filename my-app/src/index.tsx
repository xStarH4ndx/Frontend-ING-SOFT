import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeConfig } from './config/theme.config';
import { ApolloProvider } from '@apollo/client';
import client from './Apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
