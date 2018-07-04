import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, DateFormatOptions } from '@phensley/cldr';
import { calendarChangeDateSkeleton } from '../actions';
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

const formatDate = (cldr: CLDR, date: Date, zoneId: string, opts: DateFormatOptions): string =>
  cldr.Calendars.formatDate({ date, zoneId }, opts);

class DatesImpl extends React.Component<any> {

  headings(): JSX.Element {
    return (
      <tr>
        <td>Format</td>
        {ZONES.map((z, i) => <td key={i}>{z}</td>)}
      </tr>
    );
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.props.actions.calendarChangeDateSkeleton(value || DEFAULT_SKELETON);
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
        <h1>Dates</h1>
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
  skeleton: s.calendar.dateSkeleton
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ calendarChangeDateSkeleton }, d)
});

export const Dates = connect(mapState, mapDispatch)(DatesImpl);
