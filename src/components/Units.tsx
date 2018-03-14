import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine, UnitFormatOptions, UnitType } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  engine: Engine;
}

const UNITS: UnitType[] = [
  'foot', 'kilogram', 'light-year', 'mile', 'cubic-meter'
];

const OPTIONS: UnitFormatOptions[] = [
  { group: true },
  { group: true, minimumFractionDigits: 4 },
  { length: 'narrow' },
  { maximumSignificantDigits: 3 }
];

const NUMBERS: string[] = [
  '.9997',
  '12345.6789',
  '100599.39'
];

const formatQuanties = (engine: Engine, value: string, opts: UnitFormatOptions): JSX.Element => {
  const elems: JSX.Element[] = [];
  UNITS.forEach((unit, i) => {
    const s = engine.Units.format({ value, unit }, opts);
    elems.push(<span key={i}>{i > 0 ? <br /> : ''}{s}</span>);
  });
  return <span className='unit'>{elems}</span>;
};

class UnitsImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>{OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}</tr>
    );
  }

  units(): JSX.Element[] {
    const { engine } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatQuanties(engine, n, o)}</td>)}
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Units</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.units()}</tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Units = connect(mapState, mapDispatch)(UnitsImpl);
