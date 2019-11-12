import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR } from '@phensley/cldr';
import { LocaleInfo } from '../actions';
import { English } from '../locale';
import { State } from '../reducers';
import { languageName, scriptName, regionName } from './utils';

interface Props {
  cldr: CLDR;
  info: LocaleInfo | undefined;
}

class InfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { cldr, info } = this.props;
    const { id, tag } = cldr.General.locale();

    const langID = tag.language();
    const localLang = languageName(cldr, langID);
    const englishLang = languageName(English, langID);

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
        <table className='table'>
          <thead>
            <tr>
              <th>Distance</th>
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
              <td>{info ? info.distance : 0}<br/>&nbsp;</td>
              <td>{id}<br/>&nbsp;</td>
              <td>{tag.toString()}<br/>&nbsp;</td>
              <td>
                {localLang}
                <br/>{localLang !== englishLang ? `(${englishLang})` : '\u00a0'}
              </td>
              <td>
                {localScript}
                <br/>{localScript !== englishScript ? `(${englishScript})` : '\u00a0'}
              </td>
              <td>
                {localRegion}
                <br/>{localRegion !== englishRegion ? `(${englishRegion})` : '\u00a0'}
              </td>
              <td>
                {currency} - {localCurrency}
                <br/>{localCurrency !== englishCurrency ? `(${englishCurrency})` : '\u00a0'}
              </td>
            </tr>
          </tbody>
        </table>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr,
  info: s.locale.info
});

const mapDispatch = (d: Dispatch<AnyAction>) => ({});

export const Info = connect(mapState, mapDispatch)(InfoImpl);
