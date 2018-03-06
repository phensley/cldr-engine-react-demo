import { combineReducers, Reducer } from 'redux';
import { locale, LocaleState, localeState } from './locale';
import * as icepick from 'icepick';

export interface State {
  locale: LocaleState;
}

export const state: State = icepick.freeze({
  locale: localeState
});

export const reducer: Reducer<State> = combineReducers<State>({
  locale
});
