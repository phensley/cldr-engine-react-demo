import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { changeLocale } from '../actions';
import { localeMatcher } from '../locale';
import { State } from '../reducers';

class MatcherImpl extends React.Component<any> {

  last: any | undefined = undefined;

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const match = localeMatcher.match(e.currentTarget.value);
    this.last = match;
    this.props.actions.changeLocale(match.locale);
  }

  distance = (): string => {
    return this.last !== undefined ? `distance: ${this.last.distance}` : '';
  }

  placeholder = (): string => {
    const { locale } = this.props.engine;
    return `Tag (e.g. ${locale.tag.compact()})`;
  }

  render(): JSX.Element {
    return (
      <span className='entry'>
        <input type='text' className='smooth' placeholder={this.placeholder()} onChange={this.onChange} />
        <span>{this.distance()}</span>
      </span>
    );
  }

}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ changeLocale }, d)
});

export const Matcher = connect(mapState, mapDispatch)(MatcherImpl);
