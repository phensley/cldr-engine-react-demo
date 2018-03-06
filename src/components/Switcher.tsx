import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { changeLocale } from '../actions';
import { cldr } from '../locale';
import { State } from '../reducers';

const AVAILABLE_LOCALES = cldr.availableLocales();

const randomLocale = () => {
  const len = AVAILABLE_LOCALES.length;
  const idx = Math.floor(Math.random() * len);
  return AVAILABLE_LOCALES[idx];
};

class SwitcherImpl extends React.Component<any> {

  changeLocale = (): void => {
    const { locale } = this.props.engine;
    let next: string = locale.id;
    while (next === locale.id) {
      next = randomLocale().id;
    }
    this.props.actions.changeLocale(next);
  }

  render(): JSX.Element {
    return <a href='#' onClick={this.changeLocale}>Random locale</a>;
  }
}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ changeLocale }, d)
});

export const Switcher = connect(mapState, mapDispatch)(SwitcherImpl);
