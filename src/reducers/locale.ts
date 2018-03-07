import { Engine } from '@phensley/cldr';
import { Action } from '../actions';
import { English } from '../locale';
import { Reducer } from 'redux';
import * as icepick from 'icepick';

export interface LocaleState {
  engine: Engine;
}

export const initialLocaleState: LocaleState = icepick.freeze({
  engine: English
});

export const locale: Reducer<LocaleState> =
(state: LocaleState = initialLocaleState, action: Action<Engine>): LocaleState => {
  switch (action.type) {
  case 'locale/updateEngine':
    return icepick.set(state, 'engine', action.payload);
  }
  return state;
};
