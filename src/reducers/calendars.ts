import * as icepick from 'icepick';
import { Reducer } from 'redux';
import { CalendarAction } from '../actions/calendars';

export interface CalendarState {
  skeleton: string;
}

export const initialCalendarState: CalendarState = icepick.freeze({
  skeleton: 'yMMMMdhmsSSSVVVV'
});

export const calendar: Reducer<CalendarState> =
  (state: CalendarState = initialCalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
  case 'calendar/changeSkeleton':
    return icepick.set(state, 'skeleton', action.payload);
  }
  return state;
};
