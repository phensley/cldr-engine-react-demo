const start = +(new Date());

import wretch from 'wretch';
import { CLDR, CLDROptions } from '@phensley/cldr';
import Package from '../../package.json';

const version = Package.dependencies['@phensley/cldr'];

// Import default language directly so it's always available
import EnglishPack from '@phensley/cldr/packs/en.json';

/**
 * English is default for this application.
 */
const loader = (language: string): any => EnglishPack;

/**
 * Other languages are loaded asynchronously at runtime.
 */
const asyncLoader = (language: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    wretch(`${process.env.PUBLIC_URL}/packs/${language}.json?v=${version}`)
      .get()
      .json(resolve)
      .catch(reject);
  });
};

const options: CLDROptions = {
  loader,
  asyncLoader,
  packCacheSize: 3,
  patternCacheSize: 50
};

// Global instance of cldr configured for our app
export const cldr = new CLDR(options);

// Default cldr engine to be set in the locale store.
export const English = cldr.get('en');

const elapsed = +(new Date()) - start;
console.warn(`cldr static init: ${elapsed} ms`);
