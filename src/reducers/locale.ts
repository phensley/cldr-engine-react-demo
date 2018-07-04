import { CLDR } from '@phensley/cldr';
import { LocaleAction } from '../actions';
import { English } from '../locale';
import { Reducer } from 'redux';
import * as icepick from 'icepick';

export interface LocaleState {
  cldr: CLDR;
}

export const initialLocaleState: LocaleState = icepick.freeze({
  cldr: English
});

export const locale: Reducer<LocaleState> =
  (state: LocaleState = initialLocaleState, action: LocaleAction): LocaleState => {

  switch (action.type) {
  case 'locale/update':
    return icepick.set(state, 'cldr', action.payload);
  }
  return state;
};
