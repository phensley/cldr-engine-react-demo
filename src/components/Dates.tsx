import * as React from 'react';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, DateFormatOptions } from '@phensley/cldr';
import { calendarChangeDateSkeleton } from '../actions';
import { State } from '../reducers';
import { renderOptions } from './utils';

const DEFAULT_SKELETON = 'yMMMMdjmsSSSVVVV';

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
  { skeleton: 'yMMMdjmsSSS' },
  { skeleton: 'yEMMMMBj' }
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
      o.context = 'standalone';
      return (
        <tr key={i}>
          <td>{renderOptions(o)}</td>
          {ZONES.map((z, j) => <td key={j}>{formatDate(cldr, now, z, o)}</td>)}
        </tr>
      );
    });

    // Dynamic skeleton field
    const context = 'standalone';
    const { skeleton } = this.props;
    const result = ZONES.map(z => formatDate(cldr, now, z, { skeleton, context }));
    res.push(
      <tr key={len}>
        <td><input type='text' placeholder={DEFAULT_SKELETON} onChange={this.onChange} /></td>
        {result.map((r, j) => <td key={j}>{r}</td>)}
      </tr>
    );
    return res;
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Dates</h1>
        <table className='table'>
          <thead>
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

const mapDispatch = (d: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({ calendarChangeDateSkeleton }, d)
});

export const Dates = connect(mapState, mapDispatch)(DatesImpl);
