import * as React from 'react';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Decimal, DecimalConstants } from '@phensley/cldr';

import { State } from '../reducers';
import { mathChangeA, mathChangeB } from '../actions';

const SCALE_1 = 3;
const SCALE_2 = 20;

const DEFAULT_A = '123.45';
const DEFAULT_B = '0.0009';

type Pair = [string, string];

const NUMBERS: Pair[] = [
  ['-10', '-6'],
  ['7.365', '0'],
  ['-5', '17.311'],
  ['15.7e20', '3.1415926535897932384']
];

const calculate = (as: string, bs: string, scale: number): JSX.Element => {
  let i = 0;
  const elems: JSX.Element[] = [];
  let a: Decimal = DecimalConstants.ONE;
  let b: Decimal = DecimalConstants.ONE;
  try {
    a = new Decimal(as);
    b = new Decimal(bs);
  } catch (error) {
    elems.push(<span key={i++}>{error.toString()}</span>);
    return <code>{elems}</code>;
  }

  // precision for math operations
  const ctx = { precision: 100 };
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

export class DecimalMathImpl extends React.Component<any> {

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { id, value } = e.currentTarget;
    if (id === 'userA') {
      this.props.actions.mathChangeA(value || DEFAULT_A);
    } else {
      this.props.actions.mathChangeB(value || DEFAULT_B);
    }
  }

  headings(): JSX.Element {
    return (
        <tr>
        <td>A</td>
        <td>B</td>
        <td>scale={SCALE_1}</td>
        <td>scale={SCALE_2}</td>
      </tr>
    );
  }

  operations(): JSX.Element[] {
    const { userA, userB } = this.props;
    const max = NUMBERS.length;
    const res = NUMBERS.map((pair, i) => {
      const [a, b] = pair;
      return (
        <tr key={i}>
          <td>{a}</td>
          <td>{b}</td>
          <td>{calculate(a, b, SCALE_1)}</td>
          <td>{calculate(a, b, SCALE_2)}</td>
        </tr>
      );
    });
    res.push((
      <tr key={max}>
        <td><input type='text' id='userA' placeholder={DEFAULT_A} onChange={this.onChange} /></td>
        <td><input type='text' id='userB' placeholder={DEFAULT_B} onChange={this.onChange} /></td>
        <td>{calculate(userA, userB, SCALE_1)}</td>
        <td>{calculate(userA, userB, SCALE_2)}</td>
      </tr>
    ));
    return res;
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

const mapState = (s: State) => ({
  userA: s.math.userA,
  userB: s.math.userB
});

const mapDispatch = (d: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({ mathChangeA, mathChangeB }, d)
});

export const DecimalMath = connect(mapState, mapDispatch)(DecimalMathImpl);
