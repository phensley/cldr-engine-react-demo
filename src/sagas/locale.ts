import { Locale } from '@phensley/cldr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Action, ActionType } from '../actions';
import { framework } from '../locale';

const get = (locale: Locale) => framework.getAsync(locale);

export function* changeLocale(action: Action<Locale>): IterableIterator<any> {
  const locale = action.payload;
  try {
    const request = yield call(get, locale);
    yield put({ type: ActionType.LOCALE_UPDATE, payload: request });
  } catch (e) {
    yield call(console.warn, e);
    yield put({ type: ActionType.LOCALE_INVALID, locale });
  }
}

export function* localeSaga(): IterableIterator<any> {
  yield takeEvery(ActionType.LOCALE_CHANGE, changeLocale);
}
