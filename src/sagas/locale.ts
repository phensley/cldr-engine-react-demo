import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from '../actions';
import { cldr } from '../locale';

const get = (language: string) => cldr.getAsync(language);

export function* changeLocale(action: Action<string>): IterableIterator<any> {
  const language = action.payload;
  try {
    const request = yield call(get, language);
    yield put({ type: 'locale/updateEngine', payload: request });
  } catch (e) {
    yield put({ type: 'locale/invalidLanguage', language });
  }
}

export function* localeSaga(): IterableIterator<any> {
  yield takeEvery('locale/change', changeLocale);
}
