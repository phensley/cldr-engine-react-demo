import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, Quantity, UnitFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

const NUMBERS: string[] = [
  '.9997',
  '12345.6789',
  '1200599.3999'
];

const QUANTITY: Quantity[] = [];

NUMBERS.forEach(value => {
  QUANTITY.push({ value, unit: 'foot' });
  QUANTITY.push({ value, unit: 'kilogram' });
  QUANTITY.push({ value, unit: 'pound', per: 'square-inch' });
  QUANTITY.push({ value, unit: 'gigabyte', per: 'second' });
  QUANTITY.push({ value, unit: 'light-year' });
  QUANTITY.push({ value, unit: 'newton', times: 'meter' });
  QUANTITY.push({ value, unit: 'foot', times: 'pound' });
});

const OPTIONS: UnitFormatOptions[] = [
  { group: true },
  { style: 'long', length: 'short' },
  { length: 'narrow' },
  { length: 'short' },
  { style: 'short', length: 'short', minimumSignificantDigits: 3 },
];

const formatQuanties = (cldr: CLDR, qty: Quantity, opts: UnitFormatOptions): JSX.Element => {
  const s = cldr.Units.formatQuantity(qty, opts);
  return <span className='unit'>{s}</span>;
};

class UnitsImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>{OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}</tr>
    );
  }

  units(): JSX.Element[] {
    const { cldr } = this.props;
    return QUANTITY.map((qty, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatQuanties(cldr, qty, o)}</td>)}
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

const mapDispatch = (d: Dispatch<AnyAction>) => ({});

export const Units = connect(mapState, mapDispatch)(UnitsImpl);
