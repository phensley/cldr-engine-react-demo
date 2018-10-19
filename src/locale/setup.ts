const start = +(new Date());

import { CLDRFramework, CLDROptions } from '@phensley/cldr';

// Import default language directly so it's always available
import EnglishPack from '@phensley/cldr/packs/en.json';

// Load English synchronously (see below)
const loader = (language: string): any => EnglishPack;

// All other languages are loaded asynchronously at runtime
const asyncLoader = (language: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    if (language === 'en') {
      resolve(EnglishPack);
    }
    import(/* webpackChunkName: "cldr-pack-" */ `@phensley/cldr/packs/${language}.json`)
      .then(resolve)
      .catch(reject);
  });
};

const options: CLDROptions = {
  // Sync blocking loader function
  loader,

  // Promise-based loader function
  asyncLoader,

  // Keep up to 8 languages loaded at a time.
  packCacheSize: 8,

  // Patterns are parsed and cached on demand. This will keep up to
  // 50 patterns in cache with least-recently-used eviction.
  patternCacheSize: 50
};

// Global instance of cldr configured for our app
export const framework = new CLDRFramework(options);

// Default cldr engine to be set in the locale store.
export const English = framework.get('en');

const elapsed = +(new Date()) - start;
console.warn(`cldr static init: ${elapsed} ms`);
