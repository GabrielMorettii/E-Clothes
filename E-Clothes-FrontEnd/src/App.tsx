import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import { TransactionProvider } from './hooks/TransactionContext';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <TransactionProvider>
          <Routes />
        </TransactionProvider>
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
};

export default App;
