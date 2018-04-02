import { Locale } from '@phensley/cldr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from '../actions';
import { framework } from '../locale';

const get = (locale: Locale) => framework.getAsync(locale);

export function* changeLocale(action: Action<Locale>): IterableIterator<any> {
  const locale = action.payload;
  try {
    const request = yield call(get, locale);
    yield put({ type: 'locale/update', payload: request });
  } catch (e) {
    yield call(console.warn, e);
    yield put({ type: 'locale/invalid', locale });
  }
}

export function* localeSaga(): IterableIterator<any> {
  yield takeEvery('locale/change', changeLocale);
}
