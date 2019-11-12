import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR } from '@phensley/cldr';
import { LocaleInfo } from '../actions';
import { English } from '../locale';
import { State } from '../reducers';
import { languageName, regionName, scriptName } from './utils';

interface Props {
  cldr: CLDR;
  info: LocaleInfo | undefined;
}

class InputInfoImpl extends React.Component<Props> {

  render(): JSX.Element {
    const { info } = this.props;
    if (info) {
      const { input, locale } = info;
      if (input && locale) {
        const lang = languageName(English, input.language());
        const script = scriptName(English, input.script());
        const region = regionName(English, input.region());
        return (
          <table>
            <tbody>
              <tr>
                <td className='userinput'>{input.expanded()}</td>
                <td className='arrow'>{'\u27ad'}</td>
                <td className='identity'>{lang}</td>
                <td className='identity'>{script}</td>
                <td className='identity'>{region}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    }
    return <table />;
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr,
  info: s.locale.info
});

const mapDispatch = (d: Dispatch<AnyAction>) => ({});

export const InputInfo = connect(mapState, mapDispatch)(InputInfoImpl);
