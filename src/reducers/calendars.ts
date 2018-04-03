import * as icepick from 'icepick';
import { Reducer } from 'redux';
import { CalendarAction } from '../actions/calendars';

export interface CalendarState {
  dateSkeleton: string;
  intervalSkeleton: string;
}

export const initialCalendarState: CalendarState = icepick.freeze({
  dateSkeleton: 'yMMMMdhmsSSSVVVV',
  intervalSkeleton: 'yMMMMd'
});

export const calendar: Reducer<CalendarState> =
  (state: CalendarState = initialCalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
  case 'calendar/changeDateSkeleton':
    return icepick.set(state, 'dateSkeleton', action.payload);
  case 'calendar/changeIntervalSkeleton':
    return icepick.set(state, 'intervalSkeleton', action.payload);
  }
  return state;
};
