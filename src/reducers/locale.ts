import { CLDR } from '@phensley/cldr';
import { LocaleAction, LocaleInfo } from '../actions';
import { English } from '../locale';
import { Reducer } from 'redux';
import * as icepick from 'icepick';

export interface LocaleState {
  cldr: CLDR;
  info?: LocaleInfo;
}

export const initialLocaleState: LocaleState = icepick.freeze({
  cldr: English,
  info: undefined
});

export const locale: Reducer<LocaleState> =
  (state: LocaleState = initialLocaleState, action: LocaleAction): LocaleState => {

  switch (action.type) {
  case 'locale/change':
    return icepick.set(state, 'info', action.payload);
  case 'locale/update':
    return icepick.set(state, 'cldr', action.payload);
  }
  return state;
};
