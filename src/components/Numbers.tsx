import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine } from '@phensley/cldr';
import { English } from '../locale';
import { State } from '../reducers';

interface Props {
  engine: Engine;
}

class NumbersImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { engine } = this.props;

    const n1 = '12345.678';
    const o1 = { group: true };
    const o2 = { group: true, maximumFractionDigits: 1 };

    return (
      <table className='pure-table pure-table-horizontal'>
        <thead>
          <tr>
            <th>Number</th>
            <th>Options</th>
            <th>English</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{n1}</td>
            <td/>
            <td>{English.Numbers.formatDecimal(n1, {})}</td>
            <td>{engine.Numbers.formatDecimal(n1, {})}</td>
          </tr>
          <tr>
            <td>{n1}</td>
            <td>group: true</td>
            <td>{English.Numbers.formatDecimal(n1, o1)}</td>
            <td>{engine.Numbers.formatDecimal(n1, o1)}</td>
          </tr>
          <tr>
            <td>{n1}</td>
            <td>group: true<br />maximumFractionDigits: 1</td>
            <td>{English.Numbers.formatDecimal(n1, o2)}</td>
            <td>{engine.Numbers.formatDecimal(n1, o2)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Numbers = connect(mapState, mapDispatch)(NumbersImpl);
