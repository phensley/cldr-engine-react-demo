import { TimePeriod } from '@phensley/cldr';
import { Action } from './types';

export interface CalendarChangeDateSkeleton extends Action<string> {
  type: 'calendar/changeDateSkeleton';
  payload: string;
}

export interface CalendarChangeIntervalSkeleton extends Action<string> {
  type: 'calendar/changeIntervalSkeleton';
  payload: string;
}

export interface CalendarChangeTimePeriod extends Action<TimePeriod> {
  type: 'calendar/changeTimePeriod';
  payload: TimePeriod;
}

export type CalendarAction =
  CalendarChangeDateSkeleton |
  CalendarChangeIntervalSkeleton |
  CalendarChangeTimePeriod;

export const calendarChangeDateSkeleton = (skeleton: string): CalendarAction =>
  ({ type: 'calendar/changeDateSkeleton', payload: skeleton });

export const calendarChangeIntervalSkeleton = (skeleton: string): CalendarAction =>
  ({ type: 'calendar/changeIntervalSkeleton', payload: skeleton });

export const calendarChangeTimePeriod = (period: TimePeriod): CalendarAction =>
  ({ type: 'calendar/changeTimePeriod', payload: period });
