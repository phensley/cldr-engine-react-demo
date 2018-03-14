import * as React from 'react';

import { Decimal } from '@phensley/cldr';

type Pair = [string, string];

const NUMBERS: Pair[] = [
  ['-10', '-6'],
  ['7.365', '0'],
  ['-5', '17.311'],
  ['3.1415926535897932384', '15.7e30']
];

const calculate = (as: string, bs: string, scale: number): JSX.Element => {
  const a = new Decimal(as);
  const b = new Decimal(bs);
  const ctx = { scale };
  let i = 0;
  const elems: JSX.Element[] = [];
  const emit = (op: string, d: Decimal) =>
    elems.push(<span key={i++}>A{op}B&nbsp;=&nbsp;{d.setScale(scale).toString()}<br/></span>);

  emit('+', a.add(b));
  emit('-', a.subtract(b));
  emit('*', a.multiply(b, ctx));
  try {
    const r = a.divide(b, ctx);
    emit('/', r);
  } catch (error) {
    elems.push(<span key={i++}>{error.toString()}</span>);
  }
  return <code>{elems}</code>;
};

export class DecimalMath extends React.Component<any> {

  headings(): JSX.Element {
    return (
        <tr>
        <td>A</td>
        <td>B</td>
        <td>scale=3</td>
        <td>scale=25</td>
      </tr>
    );
  }

  operations(): JSX.Element[] {
    return NUMBERS.map((pair, i) => {
      const [a, b] = pair;
      return (
        <tr key={i}>
          <td>{a}</td>
          <td>{b}</td>
          <td>{calculate(a, b, 3)}</td>
          <td>{calculate(a, b, 30)}</td>
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Arbitrary-precision math</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody className='math'>{this.operations()}</tbody>
        </table>
      </div>
    );
  }
}
