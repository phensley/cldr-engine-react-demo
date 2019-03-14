import * as React from 'react';
import { CLDRFramework } from '@phensley/cldr';

export class Nav extends React.Component<any> {

  render(): JSX.Element {
    const version = CLDRFramework.version();
    return (
      <nav className='nav'>
        <div className='container'>
          <a href='https://github.com/phensley/cldr-engine' className='pagename'>@phensley/cldr {version}</a>
          <a href='https://github.com/phensley/cldr-engine-react-demo'>Demo Github</a>
        </div>
      </nav>
    );
  }

}
