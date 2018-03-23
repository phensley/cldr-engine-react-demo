import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, RegionIdType, ScriptIdType } from '@phensley/cldr';
import { English } from '../locale';
import { State } from '../reducers';

interface Props {
  cldr: CLDR;
}

const scriptName = (cldr: CLDR, id: string): string => cldr.General.getScriptDisplayName(id as ScriptIdType);
const regionName = (cldr: CLDR, id: string): string => cldr.General.getRegionDisplayName(id as RegionIdType);

class InfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { cldr } = this.props;
    const { id, tag } = cldr.Locales.current();

    const scriptID = tag.script();
    const localScript = scriptName(cldr, scriptID);
    const englishScript = scriptName(English, scriptID);

    const regionID = tag.region();
    const localRegion = regionName(cldr, regionID);
    const englishRegion = regionName(English, regionID);

    return (
      <div>
        <h1>Locale</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Language Tag</th>
              <th>Script</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{tag.toString()}</td>
              <td>{localScript} {localScript !== englishScript ? `(${englishScript})` : ''}</td>
              <td>{localRegion} {localRegion !== englishRegion ? `(${englishRegion})` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Info = connect(mapState, mapDispatch)(InfoImpl);
