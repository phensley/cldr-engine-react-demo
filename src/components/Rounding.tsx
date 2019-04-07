import * as React from 'react';

import { Decimal, RoundingModeType } from '@phensley/cldr';

const MODES: string[] = [
  'ceiling', 'floor', '', 'down', 'up',
  '', 'half-even', 'half-down', 'half-up',
  '', '05up'
];

const COLORS: string[] = [
  '#cceecc',
  '#cceeee',
  '#eeeecc',
  '#ddddee',
  '#ffffff'
];

interface Entry {
  value: string;
  color: string;
  cls: string;
}

const WHITE = '#ffffff';
const NUM = { value: '#', color: WHITE, cls: '' };

const buildHeadings = (): Entry[] => {
  const row: Entry[] = [NUM];
  for (let i = 0; i < MODES.length; i++) {
    const mode = MODES[i];
    row.push({ value: mode, color: WHITE, cls: '' });
  }
  row.push(NUM);
  return row;
};

const buildRoundingTable = (): Entry[][] => {
  // Color indices
  const idx: number[] = MODES.map(m => 0);

  const rows: Entry[][] = [];
  let prev: Entry[] | undefined;

  let n = new Decimal('-2.1');

  for (let i = 0; i < 41; i++) {
    n = n.add('0.1');

    const row: Entry[] = [];
    row.push({ value: n.toString(), color: WHITE, cls: '' });

    for (let j = 0; j < MODES.length; j++) {
      const mode = MODES[j];
      let value = ' ';
      let cls = 'spacer';
      let color = WHITE;
      if (mode) {
        value = n.setScale(0, mode as RoundingModeType).toString();
        cls = `mode-${mode}`;
        if (prev && prev[j + 1].value !== value) {
          idx[j]++;
        }
        color = COLORS[idx[j]];
      }
      row.push({ value, color, cls });
    }

    row.push({ value: n.toString(), color: WHITE, cls: '' });
    prev = row;
    rows.push(row);
  }
  return rows;
};

const HEADINGS = buildHeadings();
const ROWS = buildRoundingTable();

class RoundingImpl extends React.Component<any> {

  headings():  JSX.Element {
    return (
      <tr>
        {HEADINGS.map((e, i) => <th key={i} className={e.cls}><pre>{e.value}</pre></th>)}
      </tr>
    );
  }

  row(row: Entry[], i: number): JSX.Element {
    return (
      <tr key={i}>
        {row.map((e, j) => <td style={{backgroundColor: e.color }} className={e.cls} key={j}>{e.value}</td>)}
      </tr>
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Rounding Modes</h1>
        <table className='rounding'>
          <thead>
            {this.headings()}
          </thead>
          <tbody>
            {ROWS.map((row, i) => this.row(row, i))}
          </tbody>
        </table>
      </div>
    );
  }
}

export const Rounding = RoundingImpl;
