import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Locale } from '@phensley/cldr';

import { changeLocale } from '../actions';
import { allLocales } from '../locale';
import { State } from '../reducers';

const randomLocale = () => {
  const len = allLocales.length;
  const idx = Math.floor(Math.random() * len);
  return allLocales[idx];
};

class SwitcherImpl extends React.Component<any> {

  changeLocale = (): void => {
    const locale = this.props.cldr.Locales.current();
    let next: Locale = locale;
    while (next.id === locale.id) {
      next = randomLocale();
    }
    this.props.actions.changeLocale(next);
  }

  render(): JSX.Element {
    return (
      <button className='btn btn-a btn-sm smooth switcher' onClick={this.changeLocale}>
      Random Locale
      </button>
    );
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ changeLocale }, d)
});

export const Switcher = connect(mapState, mapDispatch)(SwitcherImpl);
