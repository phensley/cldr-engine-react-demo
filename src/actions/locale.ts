import { CLDR, LocaleMatch, LanguageTag } from '@phensley/cldr';
import { Action } from './types';

export interface LocaleInfo extends LocaleMatch {
  input: LanguageTag;
}

export interface LocaleChangeAction extends Action<LocaleInfo> {
  type: 'locale/change';
  payload: LocaleInfo;
}

export interface LocaleUpdateAction extends Action<CLDR> {
  type: 'locale/update';
  payload: CLDR;
}

export type LocaleAction =
  LocaleChangeAction | LocaleUpdateAction;

export const changeLocale = (info: LocaleInfo): LocaleAction =>
  ({ type: 'locale/change', payload: info });

export const updateLocale = (cldr: CLDR): LocaleAction =>
  ({ type: 'locale/update', payload: cldr });
