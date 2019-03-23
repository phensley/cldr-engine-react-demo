import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';

import './App.css';
import { Currencies } from './Currencies';
import { Dates } from './Dates';
import { DateIntervals } from './DateIntervals';
import { DecimalMath } from './DecimalMath';
import { Lists } from './Lists';
import { Numbers } from './Numbers';
import { RelativeTime } from './RelativeTime';
import { Switcher } from './Switcher';
import { Units } from './Units';
import { UnitSequences } from './UnitSequences';

class AppImpl extends React.Component<any> {

  showReport = () => window.location.href = `${process.env.PUBLIC_URL}/report.html`;

  render(): JSX.Element {
    const { cldr } = this.props;
    const dir = cldr.General.characterOrder();
    return (
      <div>
        <Switcher />
        <div className='spacer'>&nbsp;</div>
        <div className='wrapper' dir={dir}>
          <Numbers />
          <Currencies />
          <Dates />
          <DateIntervals />
          <RelativeTime />
          <Units />
          <UnitSequences />
          <DecimalMath />
          <Lists />
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
