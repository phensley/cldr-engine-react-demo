import { Action } from 'redux';
import { put, PutEffect } from 'redux-saga/effects';

export interface FooAction extends Action {
  stuff: string;
}

export function* initialSaga(): IterableIterator<PutEffect<FooAction>> {
  yield put({ type: 'bar', stuff: 'foo' } as FooAction);
}
