import { ActionCreator } from 'redux';
import { ActionType } from './types';

export interface LocaleAction {
  type: ActionType;
  language: string;
}

export const changeLocale: ActionCreator<LocaleAction> = (language: string) =>
  ({ type: ActionType.LOCALE_CHANGE, language });
