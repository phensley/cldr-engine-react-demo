import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine, ZonedDateTime, GregorianFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  engine: Engine;
}

const ZONES: string[] = [
  'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Pacific/Galapagos'
];

const OPTIONS: GregorianFormatOptions[] = [
  { datetime: 'medium' },
  { date: 'full' },
  { time: 'long' },
  { date: 'yMMMd', time: 'Hms' }
];

const formatDate = (engine: Engine, now: Date, zoneId: string, opts: GregorianFormatOptions): string => {
  const d = new ZonedDateTime(now, zoneId);
  return engine.Gregorian.format(d, opts);
};

class GregorianImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        <td>Format</td>
        {ZONES.map((z, i) => <td key={i}>{z}</td>)}
      </tr>
    );
  }

  dates(): JSX.Element[] {
    const { engine } = this.props;
    const now = new Date();
    return OPTIONS.map((o, i) => {
      return (
        <tr key={i}>
          <td>{renderOptions(o)}</td>
          {ZONES.map((z, j) => <td key={j}>{formatDate(engine, now, z, o)}</td>)}
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
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Gregorian = connect(mapState, mapDispatch)(GregorianImpl);
