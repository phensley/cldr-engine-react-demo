import * as icepick from "icepick";
import { AnyAction, Reducer } from "redux";

export interface CalendarState {
  dateSkeleton: string;
  intervalSkeleton: string;
}

export const initialCalendarState: CalendarState = icepick.freeze({
  dateSkeleton: "yMMMMdjmsSSSVVVV",
  intervalSkeleton: "yMMMMdjm",
});

export const calendar: Reducer<CalendarState> = (
  state: CalendarState = initialCalendarState,
  action: AnyAction
): CalendarState => {
  switch (action.type) {
    case "calendar/changeDateSkeleton":
      return icepick.set(state, "dateSkeleton", action.payload);
    case "calendar/changeIntervalSkeleton":
      return icepick.set(state, "intervalSkeleton", action.payload);
  }
  return state;
};
