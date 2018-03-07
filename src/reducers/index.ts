import { combineReducers, Reducer } from 'redux';
import { initialLocaleState, locale, LocaleState } from './locale';
import * as icepick from 'icepick';

export interface State {
  locale: LocaleState;
}

export const state: State = icepick.freeze({
  locale: initialLocaleState
});

export const reducer: Reducer<State> = combineReducers<State>({
  locale
});
