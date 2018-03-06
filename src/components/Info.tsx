import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine } from '@phensley/cldr';
import { English } from '../locale';
import { State } from '../reducers';

interface Props {
  engine: Engine;
}

class InfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { engine } = this.props;
    const { tag } = engine.locale;
    const region = tag.region();

    return (
      <table className='pure-table pure-table-horizontal'>
        <thead>
          <tr>
            <th>Key</th>
            <th>English</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Locale</td>
            <td>{tag.toString()}</td>
            <td>{tag.toString()}</td>
          </tr>
          <tr>
            <td>Language ID</td>
            <td>{tag.language()}</td>
            <td>{tag.language()}</td>
          </tr>
          <tr>
            <td>Region name</td>
            <td>{English.Names.getTerritoryDisplayName(region)}</td>
            <td>{engine.Names.getTerritoryDisplayName(region)}</td>
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

export const Info = connect(mapState, mapDispatch)(InfoImpl);
