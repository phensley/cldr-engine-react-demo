import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { state } from './reducers';
import { setupStore } from './store';
import { rootSaga } from './sagas';

import { App } from './components/App';
import './index.css';

const store = setupStore(state);
store.runSaga(rootSaga);

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
