import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, UnitFormatOptions, UnitType } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

const UNITS: UnitType[] = [
  'foot', 'kilogram', 'light-year', 'mile', 'cubic-meter'
];

const OPTIONS: UnitFormatOptions[] = [
  { group: true },
  { group: true, minimumFractionDigits: 1 },
  { length: 'narrow' },
  { maximumSignificantDigits: 3 }
];

const NUMBERS: string[] = [
  '.9997',
  '12345.6789',
  '100599.39'
];

const formatQuanties = (engcldrne: CLDR, value: string, opts: UnitFormatOptions): JSX.Element => {
  const elems: JSX.Element[] = [];
  UNITS.forEach((unit, i) => {
    const s = engcldrne.Units.formatQuantity({ value, unit }, opts);
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
    const { cldr } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatQuanties(cldr, n, o)}</td>)}
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
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Units = connect(mapState, mapDispatch)(UnitsImpl);
