import { Action } from './types';

export interface MathChangeA extends Action<string> {
  type: 'math/changeA';
  payload: string;
}

export interface MathChangeB extends Action<string> {
  type: 'math/changeB';
  payload: string;
}

export type MathAction =
  MathChangeA | MathChangeB;

export const mathChangeA = (value: string): MathAction =>
  ({ type: 'math/changeA', payload: value });

export const mathChangeB = (value: string): MathAction =>
  ({ type: 'math/changeB', payload: value });
