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
  { length: 'short' },
  { length: 'narrow' },
  { style: 'short', length: 'short', minimumSignificantDigits: 3 },
];

const NUMBERS: string[] = [
  '.9997',
  '12345.6789',
  '1200599.3999'
];

const formatQuanties = (cldr: CLDR, unit: UnitType, opts: UnitFormatOptions): JSX.Element => {
  const elems: JSX.Element[] = [];
  NUMBERS.forEach((value, i) => {
    const s1 = cldr.Units.formatQuantity({ value, unit }, opts);
    const s2 = cldr.Units.formatQuantity({ value, unit, per: 'second' }, opts);
    elems.push(
      (
      <>{i > 0 ? <br/> : ''}
        <span key={i}>{s1}<br/>{s2}</span>
      </>
      ));
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
    return UNITS.map((u, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatQuanties(cldr, u, o)}</td>)}
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
