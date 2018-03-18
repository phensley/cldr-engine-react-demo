import { Locale } from '@phensley/cldr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from '../actions';
import { cldr } from '../locale';

const get = (locale: Locale) => cldr.getAsync(locale);

export function* changeLocale(action: Action<Locale>): IterableIterator<any> {
  const locale = action.payload;
  try {
    const request = yield call(get, locale);
    yield put({ type: 'locale/updateEngine', payload: request });
  } catch (e) {
    yield put({ type: 'locale/invalidLanguage', locale });
  }
}

export function* localeSaga(): IterableIterator<any> {
  yield takeEvery('locale/change', changeLocale);
}
