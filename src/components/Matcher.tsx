import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, CLDRFramework } from '@phensley/cldr';
import { InputInfo } from './InputInfo';
import { changeLocale, LocaleInfo } from '../actions';
import { localeMatcher } from '../locale';
import { State } from '../reducers';

const { parseLanguageTag } = CLDRFramework;

interface Props {
  cldr: CLDR;
  actions: any;
}

class MatcherImpl extends React.Component<Props> {

  last?: LocaleInfo;

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    if (value === '') {
      value = 'und';
    }
    const input = parseLanguageTag(value);
    const match = localeMatcher.match(value);
    this.last = { ...match, input };
    this.props.actions.changeLocale(this.last);
  }

  placeholder = (): string => {
    const locale = this.props.cldr.General.locale();
    return `Tag (e.g. ${locale.tag.compact()})`;
  }

  render(): JSX.Element {
    return (
      <div className='matcher'>
        <div>
          <input type='text' className='smooth' placeholder={this.placeholder()} onChange={this.onChange} />
        </div>
        <InputInfo />
      </div>
    );
  }

}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ changeLocale }, d)
});

export const Matcher = connect(mapState, mapDispatch)(MatcherImpl);
