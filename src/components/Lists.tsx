import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR } from '@phensley/cldr';
import { State } from '../reducers';

interface Props {
  cldr: CLDR;
}

const ITEMS = ['one', 'two', 'three', 'four', 'five'];
const TYPES = ['and', 'or', 'unit-long'];

class ListsImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {TYPES.map((t, i) => <td key={i}>{t}</td>)}
      </tr>
    );
  }

  items(): JSX.Element[] {
    const { cldr } = this.props;
    const res: JSX.Element[] = [];
    for (let i = 0; i < ITEMS.length; i++) {
      const items = ITEMS.slice(0, i + 1);
      // TODO: export ListPatternType and use a map
      const lists = [
        cldr.General.formatList(items, 'and'),
        cldr.General.formatList(items, 'or'),
        cldr.General.formatList(items, 'unit-long')
      ];
      const elems = lists.map((e, j) => (<td key={j}>{e}</td>));
      res.push(<tr key={i}>{elems}</tr>);
    }
    return res;
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Lists</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.items()}</tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<AnyAction>) => ({});

export const Lists = connect(mapState, mapDispatch)(ListsImpl);
