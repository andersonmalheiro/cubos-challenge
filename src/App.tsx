import React from 'react';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
