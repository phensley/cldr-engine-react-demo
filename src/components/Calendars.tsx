import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, ZonedDateTime, DateFormatOptions } from '@phensley/cldr';
import { calendarChangeSkeleton } from '../actions';
import { State } from '../reducers';
import { renderOptions } from './utils';

const DEFAULT_SKELETON = 'yMMMMdhmsSSSVVVV';

const ZONES: string[] = [
  'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Pacific/Galapagos'
];

const OPTIONS: DateFormatOptions[] = [
  { datetime: 'medium' },
  { date: 'full' },
  { date: 'long' },
  { date: 'short' },
  { time: 'full' },
  { time: 'long' },
  { time: 'short' },
  { skeleton: 'yMMMdHmsSSS' },
  { skeleton: 'yEMMMMBh' }
];

const formatDate = (cldr: CLDR, now: Date, zoneId: string, opts: DateFormatOptions): string => {
  const d = new ZonedDateTime(now, zoneId);
  return cldr.Calendars.formatDate(d, opts);
};

class CalendarsImpl extends React.Component<any> {

  headings(): JSX.Element {
    return (
      <tr>
        <td>Format</td>
        {ZONES.map((z, i) => <td key={i}>{z}</td>)}
      </tr>
    );
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let { value } = e.currentTarget;
    value = value === '' ? DEFAULT_SKELETON : value;
    this.props.actions.calendarChangeSkeleton(value);
  }

  dates(): JSX.Element[] {
    const { cldr } = this.props;
    const now = new Date();
    const len = OPTIONS.length;
    const res = OPTIONS.map((o, i) => {
      return (
        <tr key={i}>
          <td>{renderOptions(o)}</td>
          {ZONES.map((z, j) => <td key={j}>{formatDate(cldr, now, z, o)}</td>)}
        </tr>
      );
    });

    // Dynamic skeleton field
    res.push(
      <tr key={len}>
        <td><input type='text' placeholder={DEFAULT_SKELETON} onChange={this.onChange} /></td>
        {ZONES.map((z, j) => <td key={j}>{formatDate(cldr, now, z, { skeleton: this.props.skeleton })}</td>)}
      </tr>
    );
    return res;
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Gregorian calendar</h1>
        <table className='table'>
          <thead className='options'>
            {this.headings()}
          </thead>
          <tbody>
            {this.dates()}
          </tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr,
  skeleton: s.calendar.skeleton
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ calendarChangeSkeleton }, d)
});

export const Calendars = connect(mapState, mapDispatch)(CalendarsImpl);
