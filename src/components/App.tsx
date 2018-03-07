import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';

import './App.css';
import { Info } from './Info';
import { Numbers } from './Numbers';
import { Switcher } from './Switcher';

class AppImpl extends React.Component<any> {

  showReport = () => window.location.href = `${process.env.PUBLIC_URL}/report.html`;

  render(): JSX.Element {
    return (
      <div className='App'>
        <p>Work in progress..</p>
        <p><a href='#' onClick={this.showReport}>Uncompressed bundle report</a></p>
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
