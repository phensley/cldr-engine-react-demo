import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Engine, CurrencyType, CurrencyFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  engine: Engine;
}

const NUMBERS = [
  '.098765',
  '1.07',
  '-12345.678',
  '999999.987'
];

const CURRENCIES: CurrencyType[] = [
  'USD', 'EUR', 'GBP', 'JPY'
];

const OPTIONS: CurrencyFormatOptions[] = [
  { group: true, style: 'name' },
  { group: true , style: 'short' },
  { group: true, style: 'accounting' },
];

const formatAmount = (engine: Engine, n: string, opts: CurrencyFormatOptions): JSX.Element => {
  const elems: JSX.Element[] = [];
  CURRENCIES.forEach((c, i) => {
    const s = engine.Numbers.formatCurrency(n, c, opts);
    elems.push(<span key={i}>{i > 0 ? <br /> : ''}{s}</span>);
  });
  return <span className='currency'>{elems}</span>;
};

class CurrenciesImpl extends React.Component<Props> {

  headings(): JSX.Element {
    return (
      <tr>
        {OPTIONS.map((o, i) => <td key={i}>{renderOptions(o)}</td>)}
      </tr>
    );
  }

  currencies(): JSX.Element[] {
    const { engine } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatAmount(engine, n, o)}</td>)}
        </tr>
      );
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Currencies</h1>
        <table className='table'>
          <thead className='options'>{this.headings()}</thead>
          <tbody>{this.currencies()}</tbody>
        </table>
      </div>
    );
  }

}

const mapState = (s: State) => ({
  engine: s.locale.engine
});

const mapDispatch = (d: Dispatch<State>) => ({});

export const Currencies = connect(mapState, mapDispatch)(CurrenciesImpl);
