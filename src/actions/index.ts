import { Engine } from '@phensley/cldr';

export interface Action<T> {
  type: string;
  payload: T;
}

export const changeLocale = (language: string): Action<string> => (
  { type: 'locale/change', payload: language });

export const updateLocaleEngine = (engine: Engine): Action<Engine> => (
  { type: 'locale/updateEngine', payload: engine });
