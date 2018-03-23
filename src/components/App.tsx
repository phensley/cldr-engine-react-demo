import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';

import './App.css';
import { Info } from './Info';
import { Nav } from './Nav';
import { Calendars } from './Calendars';
import { Currencies } from './Currencies';
import { DecimalMath } from './DecimalMath';
import { Matcher } from './Matcher';
import { Numbers } from './Numbers';
import { RelativeTime } from './RelativeTime';
import { Switcher } from './Switcher';
import { Units } from './Units';

class AppImpl extends React.Component<any> {

  showReport = () => window.location.href = `${process.env.PUBLIC_URL}/report.html`;

  render(): JSX.Element {
    const { cldr } = this.props;
    const dir = cldr.General.characterOrder();
    return (
      <div>
        <Nav />
        <Switcher />
        <div className='wrapper'>
          <Matcher />
        </div>
        <div className='wrapper' dir={dir}>
          <Info />
          <Numbers />
          <Currencies />
          <Calendars />
          <RelativeTime />
          <Units />
          <DecimalMath />
        </div>
      </div>
    );
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});
const mapDispatch = (d: Dispatch<State>) => ({ });

export const App = connect(mapState, mapDispatch)(AppImpl);
