import { CLDR, Locale } from '@phensley/cldr';
import { Action } from './types';

export interface LocaleChangeAction extends Action<Locale> {
  type: 'locale/change';
  payload: Locale;
}

export interface LocaleUpdateAction extends Action<CLDR> {
  type: 'locale/update';
  payload: CLDR;
}

export type LocaleAction =
  LocaleChangeAction | LocaleUpdateAction;

export const changeLocale = (language: Locale): LocaleAction =>
  ({ type: 'locale/change', payload: language });

export const updateLocale = (cldr: CLDR): LocaleAction =>
  ({ type: 'locale/update', payload: cldr });
