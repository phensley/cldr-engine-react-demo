import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { state } from './reducers';
import { setupStore } from './store';
import { rootSaga } from './sagas';

import { App } from './components/App';
import './index.css';

const store = setupStore(state);
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
