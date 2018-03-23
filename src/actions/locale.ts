import { CLDR, Locale } from '@phensley/cldr';
import { ActionCreator } from 'redux';
import { ActionType } from './types';

export interface LocaleAction {
  type: ActionType;
  locale: Locale;
}

export interface Action<T> {
  type: string;
  payload: T;
}

// export const changeLocale: ActionCreator<LocaleAction> = (locale: Locale) =>
//   ({ type: ActionType.LOCALE_CHANGE, locale });

export const changeLocale = (language: string): Action<string> => (
  { type: ActionType.LOCALE_CHANGE, payload: language });

export const updateLocale = (cldr: CLDR): Action<CLDR> => (
  { type: ActionType.LOCALE_UPDATE, payload: cldr });
