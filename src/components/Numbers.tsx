import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, DecimalFormatOptions, DecimalArg } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

const NUMBERS = [
  '.098765',
  '1.07',
  '12345.678',
  '999999.987',
  String(Number.MAX_SAFE_INTEGER),
  Infinity,
  NaN
];

const OPTIONS: (DecimalFormatOptions | undefined)[] = [
  undefined,
  { group: true },
  { group: true, maximumFractionDigits: 1 },
  { group: true, maximumFractionDigits: 0, round: 'floor' },
  { style: 'short', maximumFractionDigits: 1, group: true },
  { style: 'long', group: true }
];

const formatDecimal = (cldr: CLDR, n: DecimalArg, opts?: DecimalFormatOptions) => {
  if (opts === undefined) {
    return n.toString();
  }
  return cldr.Numbers.formatDecimal(n, opts);
};

class NumbersImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}
      </tr>
    );
  }

  numbers(): JSX.Element[] {
    const { cldr } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatDecimal(cldr, n, o)}</td>)}
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Numbers</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.numbers()}</tbody>
        </table>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Numbers = connect(mapState, mapDispatch)(NumbersImpl);
