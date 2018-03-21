import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine } from '@phensley/cldr';
import { English } from '../locale';
import { State } from '../reducers';

interface Props {
  engine: Engine;
}

const regionName = (engine: Engine, id: string): string => engine.General.getTerritoryDisplayName(id);

class InfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { engine } = this.props;
    const { id, tag } = engine.locale;

    const regionID = tag.region();
    const localRegion = regionName(engine, regionID);
    const englishRegion = regionName(English, regionID);

    return (
      <div>
        <h1>Locale</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Language Tag</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{tag.toString()}</td>
              <td>{localRegion} {localRegion !== englishRegion ? `(${englishRegion})` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Info = connect(mapState, mapDispatch)(InfoImpl);
