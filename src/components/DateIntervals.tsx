import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, UnixEpochTime } from '@phensley/cldr';
import { calendarChangeIntervalSkeleton } from '../actions';
import { State } from '../reducers';
import { renderOptions } from './utils';

const NEW_YORK = 'America/New_York';
const DEFAULT_SKELETON = 'yMMMMd';

const OPTIONS: any[] = [
  { skeleton: 'Bh' },
  { skeleton: 'hmsa' },
  { skeleton: 'yMMMMd' },
  { skeleton: 'yMMMdhms' }
];

const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;

type Delta = [string, number];

const DELTAS: Delta[] = [
  ['17 minutes', MINUTE * 17],
  ['2.3 hours', HOUR * 2.3],
  ['19 days', DAY * 19],
  ['289 days', DAY * 289]
];

const formatInterval = (cldr: CLDR, start: UnixEpochTime, delta: number, opts: any): string => {
  const { epoch, zoneId } = start;
  return cldr.Calendars.formatDateInterval(start, { epoch: +epoch + delta, zoneId }, opts);
};

class DateIntervalsImpl extends React.Component<any> {

  headings(): JSX.Element {
    return (
      <tr>
        <td />
        {DELTAS.map((d, j) => <td key={j}>{d[0]}</td>)}
      </tr>
    );
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.props.actions.calendarChangeIntervalSkeleton(value || DEFAULT_SKELETON);
  }

  intervals(): JSX.Element[] {
    const { cldr, skeleton } = this.props;
    const start: UnixEpochTime = { epoch: new Date(), zoneId: NEW_YORK };
    const len = OPTIONS.length;
    const res = OPTIONS.map((o, i) => {
      return (
        <tr key={i}>
          <td>{renderOptions(o)}</td>
          {DELTAS.map((d, j) => <td key={j}>{formatInterval(cldr, start, d[1], o)}</td>)}
        </tr>
      );
    });

    res.push(
      <tr key={len}>
        <td><input type='text' placeholder={DEFAULT_SKELETON} onChange={this.onChange} /></td>
        {DELTAS.map((d, j) => <td key={j}>{formatInterval(cldr, start, d[1], { skeleton })}</td>)}
      </tr>
    );

    return res;
  }

  render(): JSX.Element {
    return (
      <div>
          <h1>Date Intervals</h1>
          <table className='table'>
            <thead className='options'>
              {this.headings()}
            </thead>
            <tbody>
              {this.intervals()}
            </tbody>
          </table>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr,
  skeleton: s.calendar.intervalSkeleton
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ calendarChangeIntervalSkeleton }, d)
});

export const DateIntervals = connect(mapState, mapDispatch)(DateIntervalsImpl);
