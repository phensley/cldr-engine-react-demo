import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine, DecimalFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  engine: Engine;
}

const NUMBERS = [
  '.098765',
  '1.07',
  '12345.678',
  '999999.987',
  String(Number.MAX_SAFE_INTEGER)
];

const OPTIONS: DecimalFormatOptions[] = [
  {},
  { group: true },
  { group: true, maximumFractionDigits: 1 },
  { group: true, maximumFractionDigits: 0, round: 'floor' },
  { style: 'short', maximumFractionDigits: 1, group: true },
  { style: 'long', group: true }
];

class NumbersImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}
      </tr>
    );
  }

  numbers(): JSX.Element[] {
    const { engine } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{engine.Numbers.formatDecimal(n, o)}</td>)}
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
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Numbers = connect(mapState, mapDispatch)(NumbersImpl);
