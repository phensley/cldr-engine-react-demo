import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, ZonedDateTime, DateFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

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
  { skeleton: 'yMMMdHms' },
  { skeleton: 'yEMMMMBh' }
];

const formatDate = (cldr: CLDR, now: Date, zoneId: string, opts: DateFormatOptions): string => {
  const d = new ZonedDateTime(now, zoneId);
  return cldr.Calendars.formatDate(d, opts);
};

class CalendarsImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        <td>Format</td>
        {ZONES.map((z, i) => <td key={i}>{z}</td>)}
      </tr>
    );
  }

  dates(): JSX.Element[] {
    const { cldr } = this.props;
    const now = new Date();
    return OPTIONS.map((o, i) => {
      return (
        <tr key={i}>
          <td>{renderOptions(o)}</td>
          {ZONES.map((z, j) => <td key={j}>{formatDate(cldr, now, z, o)}</td>)}
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Gregorian calendar</h1>
        <table className='table'>
          <thead className='options'>
            {this.headings()}
          </thead>
          <tbody>{this.dates()}</tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Calendars = connect(mapState, mapDispatch)(CalendarsImpl);
