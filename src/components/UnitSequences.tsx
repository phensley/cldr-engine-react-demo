import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, Quantity, UnitFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

const OPTIONS: UnitFormatOptions[] = [
  { },
  { length: 'short' },
  { length: 'narrow' }
];

const QUANTITIES: Quantity[][] = [
  [
    { value: '4', unit: 'day' },
    { value: '6', unit: 'hour' },
    { value: '45', unit: 'minute' },
    { value: '39.9', unit: 'second' }
  ],
  [
    { value: '927', unit: 'degree' },
    { value: '49', unit: 'arc-minute' },
    { value: '17.2', unit: 'arc-second' }
  ],
  [
    { value: '15', unit: 'mile' },
    { value: '1', unit: 'foot' },
    { value: '9.3', unit: 'inch' }
  ],
  [
    { value: '102', unit: 'ton' },
    { value: '173', unit: 'pound' },
    { value: '8.17', unit: 'ounce' }
  ]
];

const formatOptions = (cldr: CLDR, qty: Quantity[], opts: UnitFormatOptions): JSX.Element => {
  const s = cldr.Units.formatQuantitySequence(qty, opts);
  return <span className='unit'><span>{s}</span></span>;
};

class UnitSequencesImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>{OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}</tr>
    );
  }

  unitSequences(): JSX.Element[] {
    const { cldr } = this.props;
    return QUANTITIES.map((q, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatOptions(cldr, q, o)}</td>)}
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Unit Sequences</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.unitSequences()}</tbody>
        </table>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const UnitSequences = connect(mapState, mapDispatch)(UnitSequencesImpl);
