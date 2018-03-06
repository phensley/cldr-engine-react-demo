import { all, fork, AllEffect } from 'redux-saga/effects';
import { initialSaga } from './initial';
import { localeSaga } from './locale';

export function* rootSaga(): IterableIterator<AllEffect> {
  yield all([
    fork(localeSaga),
    fork(initialSaga)
  ]);
}
