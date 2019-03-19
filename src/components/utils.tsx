import * as React from 'react';

export const renderOptions = (opts: any): JSX.Element => {
  if (opts === undefined) {
    return <div>(input)</div>;
  }

  const elems: JSX.Element[] = [];
  const keys = Object.keys(opts);
  if (keys.length === 0) {
    elems.push(<span key={0}>{'<default>'}</span>);
  } else {
    keys.sort().forEach((k, i) => {
      elems.push(<span key={i}>{i > 0 ? <br /> : ''}{`${k}: ${opts[k]}`}</span>);
    });
  }
  return <div>{elems}</div>;
};
