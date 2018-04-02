import { combineReducers, Reducer } from 'redux';
import { initialLocaleState, locale, LocaleState } from './locale';
import { initialCalendarState, calendar, CalendarState } from './calendars';
import * as icepick from 'icepick';

export interface State {
  locale: LocaleState;
  calendar: CalendarState;
}

export const state: State = icepick.freeze({
  locale: initialLocaleState,
  calendar: initialCalendarState
});

export const reducer: Reducer<State> = combineReducers<State>({
  locale,
  calendar
});
