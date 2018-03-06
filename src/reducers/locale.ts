import { Engine } from '@phensley/cldr';
import { Action } from '../actions';
import { English } from '../locale';
import { Reducer } from 'redux';
import * as icepick from 'icepick';

export interface LocaleState {
  engine: Engine;
}

export const localeState: LocaleState = icepick.freeze({
  engine: English
});

export const locale: Reducer<LocaleState> = (state: LocaleState, action: Action<Engine>): LocaleState => {
  switch (action.type) {
  case 'locale/updateEngine':
    return icepick.set(state, 'engine', action.payload);
  }
  return localeState;
};
