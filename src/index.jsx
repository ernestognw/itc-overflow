import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.less';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '@providers/user';
import { LayoutProvider } from '@providers/layout';
import { ThemeProvider } from 'styled-components';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import theme from '@config/theme';
import App from './App';

const queryCache = new QueryCache();

ReactDOM.render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <UserProvider>
      <LayoutProvider>
        <ThemeProvider theme={theme}>
          <Router basename="/">
            <App />
          </Router>
        </ThemeProvider>
      </LayoutProvider>
    </UserProvider>
  </ReactQueryCacheProvider>,
  document.getElementById('root')
);
