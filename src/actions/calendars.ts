import { Action } from './types';

export interface CalendarChangeSkeleton extends Action<string> {
  type: 'calendar/changeSkeleton';
  payload: string;
}

export type CalendarAction =
  CalendarChangeSkeleton;

export const calendarChangeSkeleton = (skeleton: string): CalendarAction =>
  ({ type: 'calendar/changeSkeleton', payload: skeleton });
