import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, LanguageIdType, RegionIdType, ScriptIdType } from '@phensley/cldr';
import { English } from '../locale';
import { State } from '../reducers';

interface Props {
  cldr: CLDR;
}

const langName = (cldr: CLDR, id: string): string => cldr.General.getLanguageDisplayName(id as LanguageIdType);
const scriptName = (cldr: CLDR, id: string): string => cldr.General.getScriptDisplayName(id as ScriptIdType);
const regionName = (cldr: CLDR, id: string): string => cldr.General.getRegionDisplayName(id as RegionIdType);

class InfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { cldr } = this.props;
    const { id, tag } = cldr.Locales.current();

    const langID = tag.language();
    const localLang = langName(cldr, langID);
    const englishLang = langName(English, langID);

    const scriptID = tag.script();
    const localScript = scriptName(cldr, scriptID);
    const englishScript = scriptName(English, scriptID);

    const regionID = tag.region();
    const localRegion = regionName(cldr, regionID);
    const englishRegion = regionName(English, regionID);

    const currency = cldr.Numbers.getCurrencyForRegion(regionID);
    const localCurrency = cldr.Numbers.getCurrencyDisplayName(currency);
    const englishCurrency = English.Numbers.getCurrencyDisplayName(currency);

    return (
      <div>
        <h1>Locale</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Language Tag</th>
              <th>Language</th>
              <th>Script</th>
              <th>Region</th>
              <th>Region Currency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{tag.toString()}</td>
              <td>
                {localLang}
                <br/>{localLang !== englishLang ? `(${englishLang})` : ''}
              </td>
              <td>
                {localScript}
                <br/>{localScript !== englishScript ? `(${englishScript})` : ''}
              </td>
              <td>
                {localRegion}
                <br/>{localRegion !== englishRegion ? `(${englishRegion})` : ''}
              </td>
              <td>
                {currency} - {localCurrency}
                <br/>{localCurrency !== englishCurrency ? `(${englishCurrency})` : ''}
              </td>
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
