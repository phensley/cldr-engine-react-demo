import { Locale } from '@phensley/cldr';
import { ActionCreator } from 'redux';
import { ActionType } from './types';

export interface LocaleAction {
  type: ActionType;
  locale: Locale;
}

export const changeLocale: ActionCreator<LocaleAction> = (locale: Locale) =>
  ({ type: ActionType.LOCALE_CHANGE, locale });
