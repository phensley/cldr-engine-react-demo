import { CLDRFramework, LocaleMatcher } from '@phensley/cldr';

export const allLocales = CLDRFramework.availableLocales();

const supported = allLocales.sort(l => l.id === 'en' ? -1 : 1);

export const localeMatcher = new LocaleMatcher(supported, { resolve: false });
