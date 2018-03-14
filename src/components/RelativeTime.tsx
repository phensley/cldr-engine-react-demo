import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine, DateFieldType, RelativeTimeFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';

interface Props {
  engine: Engine;
}

const QUANTITIES = [
  -5, -1, 0, 1, 7
];

const FIELDS: DateFieldType[] = [
  'second', 'hour', 'day', 'week', 'month', 'tue', 'year'
];

const renderRow = (engine: Engine, i: number, q: number, opts: RelativeTimeFormatOptions): JSX.Element => (
  <tr key={i}>
    {FIELDS.map((f, j) => <td key={j}>{engine.DateFields.formatRelativeTime(q, f, opts)}</td>)}
  </tr>
);

class RelativeTimeImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {FIELDS.map((f, i) => <td key={i}>{f}</td>)}
      </tr>
    );
  }

  times(): JSX.Element[] {
    const { engine } = this.props;
    const elems: JSX.Element[] = [];
    let i = 0;
    QUANTITIES.forEach(q => {
      elems.push(renderRow(engine, i++, q, {}));
      elems.push(renderRow(engine, i++, q, { width: 'narrow' }));
    });
    return elems;
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Relative times</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.times()}</tbody>
        </table>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const RelativeTime = connect(mapState, mapDispatch)(RelativeTimeImpl);
