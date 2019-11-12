import { all, fork } from 'redux-saga/effects';
import { initialSaga } from './initial';
import { localeSaga } from './locale';

export function* rootSaga(): IterableIterator<any> {
  yield all([
    fork(localeSaga),
    fork(initialSaga)
  ]);
}
