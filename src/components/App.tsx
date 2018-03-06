import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';

import './App.css';
import { Info } from './Info';
import { Numbers } from './Numbers';
import { Switcher } from './Switcher';

class AppImpl extends React.Component<any> {

  render(): JSX.Element {
    return (
      <div className='App'>
        <p>Work in progress..</p>
        <Info />
        <Numbers />
        <Switcher />
      </div>
    );
  }
}

const mapState = (s: State) => ({ });
const mapDispatch = (d: Dispatch<State>) => ({ });

export const App = connect(mapState, mapDispatch)(AppImpl);
