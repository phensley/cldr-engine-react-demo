import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';

import './App.css';
import { Info } from './Info';
import { Nav } from './Nav';
import { Switcher } from './Switcher';
import { Currencies } from './Currencies';
import { DecimalMath } from './DecimalMath';
import { Numbers } from './Numbers';
import { Gregorian } from './Gregorian';
import { RelativeTime } from './RelativeTime';
import { Units } from './Units';

class AppImpl extends React.Component<any> {

  showReport = () => window.location.href = `${process.env.PUBLIC_URL}/report.html`;

  render(): JSX.Element {
    return (
      <div>
        <Nav />
        <div className='wrapper'>
          <Switcher />
          <Info />
          <Numbers />
          <Currencies />
          <Gregorian />
          <RelativeTime />
          <Units />
          <DecimalMath />
        </div>
      </div>
    );
  }
}

const mapState = (s: State) => ({ });
const mapDispatch = (d: Dispatch<State>) => ({ });

export const App = connect(mapState, mapDispatch)(AppImpl);
