import * as React from 'react';

export class Nav extends React.Component<any> {

  render(): JSX.Element {
    return (
      <nav className='nav'>
        <div className='container'>
          <a href='https://github.com/phensley/cldr-engine' className='pagename'>@phensley/cldr</a>
          <a href='https://github.com/phensley/cldr-engine-react-demo'>Github</a>
        </div>
      </nav>
    );
  }

}
