import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Locale } from '@phensley/cldr';

import { changeLocale } from '../actions';
import { allLocales } from '../locale';
import { State } from '../reducers';
import { Info } from './Info';
import { Nav } from './Nav';
import { Matcher } from './Matcher';

const randomLocale = () => {
  const len = allLocales.length;
  const idx = Math.floor(Math.random() * len);
  return allLocales[idx];
};

class SwitcherImpl extends React.Component<any> {

  changeLocale = (): void => {
    const locale = this.props.cldr.General.locale();
    let next: Locale = locale;
    while (next.id === locale.id) {
      next = randomLocale();
    }
    this.props.actions.changeLocale({ locale: next, distance: 0 });
  }

  render(): JSX.Element {
    return (
      <div className='switcher'>
        <Nav />
        <div className='row'>
          <Matcher />
          <button className='btn btn-a btn-sm smooth' onClick={this.changeLocale}>
          Random Locale
          </button>
        </div>
        <div className='row'>
          <Info />
        </div>
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

export const Switcher = connect(mapState, mapDispatch)(SwitcherImpl);
