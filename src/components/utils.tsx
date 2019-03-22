import * as React from 'react';
import { CLDR, LanguageIdType, RegionIdType, ScriptIdType } from '@phensley/cldr';

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

export const languageName = (cldr: CLDR, id: string): string =>
  cldr.General.getLanguageDisplayName(id as LanguageIdType) ||
  cldr.General.getLanguageDisplayName('und');

export const scriptName = (cldr: CLDR, id: string): string =>   cldr.General.getScriptDisplayName(id as ScriptIdType);

export const regionName = (cldr: CLDR, id: string): string =>   cldr.General.getRegionDisplayName(id as RegionIdType);
