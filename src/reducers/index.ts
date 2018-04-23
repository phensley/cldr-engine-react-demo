import { combineReducers, Reducer } from 'redux';
import { initialLocaleState, locale, LocaleState } from './locale';
import { initialCalendarState, calendar, CalendarState } from './calendars';
import { initialMathState, math, MathState } from './math';

import * as icepick from 'icepick';

export interface State {
  locale: LocaleState;
  calendar: CalendarState;
  math: MathState;
}

export const state: State = icepick.freeze({
  locale: initialLocaleState,
  calendar: initialCalendarState,
  math: initialMathState
});

export const reducer: Reducer<State> = combineReducers<State>({
  locale,
  calendar,
  math
});
