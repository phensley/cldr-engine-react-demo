import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { CLDR, CurrencyType, CurrencyFormatOptions } from '@phensley/cldr';
import { State } from '../reducers';
import { renderOptions } from './utils';

interface Props {
  cldr: CLDR;
}

const NUMBERS = [
  '1',
  '0',
  '.098765',
  '1.07',
  '-12345.678',
  '999999.987'
];

const CURRENCIES: CurrencyType[] = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'RUB'
];

const OPTIONS: (CurrencyFormatOptions | undefined)[] = [
  undefined,
  { group: true },
  { style: 'code' },
  { group: true, style: 'name' },
  { group: true , style: 'short' },
  { group: true, style: 'accounting' },
  { group: true, style: 'code' }
];

const formatAmount = (cldr: CLDR, n: string, opts?: CurrencyFormatOptions): JSX.Element => {
  if (opts === undefined) {
    return <span className='currency'>{n.toString()}</span>;
  }

  const elems: JSX.Element[] = [];
  CURRENCIES.forEach((c, i) => {
    const s = cldr.Numbers.formatCurrency(n, c, opts);
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
    const { cldr } = this.props;
    return NUMBERS.map((n, i) => {
      return (
        <tr key={i}>
          {OPTIONS.map((o, j) => <td key={j}>{formatAmount(cldr, n, o)}</td>)}
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
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<AnyAction>) => ({});

export const Currencies = connect(mapState, mapDispatch)(CurrenciesImpl);
