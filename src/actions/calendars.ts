import { Action } from './types';

export interface CalendarChangeDateSkeleton extends Action<string> {
  type: 'calendar/changeDateSkeleton';
  payload: string;
}

export interface CalendarChangeIntervalSkeleton extends Action<string> {
  type: 'calendar/changeIntervalSkeleton';
  payload: string;
}

export type CalendarAction =
  CalendarChangeDateSkeleton | CalendarChangeIntervalSkeleton;

export const calendarChangeDateSkeleton = (skeleton: string): CalendarAction =>
  ({ type: 'calendar/changeDateSkeleton', payload: skeleton });

  export const calendarChangeIntervalSkeleton = (skeleton: string): CalendarAction =>
  ({ type: 'calendar/changeIntervalSkeleton', payload: skeleton });
