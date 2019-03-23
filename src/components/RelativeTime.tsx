import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, DateFieldType, RelativeTimeFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';

interface Props {
  cldr: CLDR;
}

const QUANTITIES = [
  -5, -1, 0, 1, 7
];

const FIELDS: DateFieldType[] = [
  'second', 'hour', 'day', 'week', 'month', 'tue', 'year'
];

const renderRow = (cldr: CLDR, i: number, q: number, opts: RelativeTimeFormatOptions): JSX.Element => {
  opts.context = 'standalone';
  const result = FIELDS.map(f => cldr.Calendars.formatRelativeTimeField(q, f, opts));
  return (
    <tr key={i}>
      {result.map((r, j) => <td key={j}>{r}</td>)}
    </tr>
  );
};

class RelativeTimeImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {FIELDS.map((f, i) => <td key={i}>{f}</td>)}
      </tr>
    );
  }

  times(): JSX.Element[] {
    const { cldr } = this.props;
    const elems: JSX.Element[] = [];
    let i = 0;
    QUANTITIES.forEach(q => {
      elems.push(renderRow(cldr, i++, q, {}));
      elems.push(renderRow(cldr, i++, q, { width: 'narrow' }));
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
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const RelativeTime = connect(mapState, mapDispatch)(RelativeTimeImpl);
